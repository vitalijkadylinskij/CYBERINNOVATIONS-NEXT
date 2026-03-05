import express from 'express';
import crypto from 'crypto';
import axios from 'axios';

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' })); // лимит payload

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const BOT_TOKEN = requireEnv('TELEGRAM_BOT_TOKEN');
const HMAC_SECRET = requireEnv('INTERNAL_HMAC_SECRET');
const RECIPIENT_USER_IDS = requireEnv('RECIPIENT_USER_IDS')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);
const ENABLE_DEBUG_ENDPOINTS = process.env.ENABLE_DEBUG_ENDPOINTS === 'true';

// In-memory LRU cache для idempotency ключей
const idempotencyKeys = new Map<string, number>();
const IDEMPOTENCY_WINDOW = 5 * 60 * 1000; // 5 минут

// Очистка старых ключей каждые 2 минуты
const cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of idempotencyKeys.entries()) {
    if (now - timestamp > IDEMPOTENCY_WINDOW) {
      idempotencyKeys.delete(key);
    }
  }
}, 2 * 60 * 1000);
cleanupInterval.unref();

// Верификация подписи HMAC
function verifySignature(body: string, timestamp: string, signature: string): boolean {
  if (!/^[a-f0-9]{64}$/i.test(signature)) return false;

  const expected = crypto
    .createHmac('sha256', HMAC_SECRET)
    .update(body + '.' + timestamp)
    .digest();

  const provided = Buffer.from(signature, 'hex');
  if (provided.length !== expected.length) return false;
  return crypto.timingSafeEqual(expected, provided);
}

// Функция отправки сообщения в Telegram с retry
async function sendToTelegram(message: string): Promise<boolean> {
  const MAX_RETRIES = 3;
  const BASE_DELAY = 1000; // 1 секунда
  let deliveredCount = 0;

  for (const userId of RECIPIENT_USER_IDS) {
    let sent = false;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        await axios.post(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            chat_id: userId,
            text: message,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
            protect_content: true,
          },
          { timeout: 10000 }
        );

        sent = true;
        deliveredCount++;
        break;
      } catch (error: any) {
        const errorText =
          error?.response?.data?.description ||
          error?.message ||
          'Unknown error';

        console.error(`Recipient ${userId}, attempt ${attempt} failed:`, errorText);

        if (attempt < MAX_RETRIES) {
          const delay = BASE_DELAY * Math.pow(2, attempt - 1);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    if (!sent) {
      console.warn(`Recipient ${userId} skipped after ${MAX_RETRIES} attempts`);
    }
  }

  return deliveredCount > 0;
}

// Функция удаления webhook при старте
async function deleteWebhookOnStartup(): Promise<void> {
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/deleteWebhook`, {
      drop_pending_updates: true,
    });
    console.log('Webhook deleted successfully');
  } catch (error) {
    console.error('Failed to delete webhook:', error);
  }
}

// Вызываем удаление webhook при запуске
deleteWebhookOnStartup();

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

if (ENABLE_DEBUG_ENDPOINTS) {
  // Debug endpoint для получения chat_id
  app.get('/debug/chat-id/:token', async (req, res) => {
    const { token } = req.params;

    // Простой механизм защиты
    if (token !== BOT_TOKEN.slice(0, 10)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // Получаем обновления
      const response = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
      const updates = response.data.result;

      if (updates.length === 0) {
        return res.json({
          message: 'No updates found. Send /start to your bot first!',
          instructions: '1. Open your bot in Telegram\n2. Send /start\n3. Wait a few seconds\n4. Refresh this page'
        });
      }

      // Берем последние update
      const lastUpdate = updates[updates.length - 1];
      const chat = lastUpdate.message?.chat || lastUpdate.my_chat_member?.chat;

      res.json({
        chat_id: chat.id,
        username: chat.username,
        first_name: chat.first_name,
        last_update: lastUpdate
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}

// Основной endpoint для отправки
app.post('/internal/send', async (req, res) => {
  const timestamp = req.headers['x-timestamp'] as string;
  const signature = req.headers['x-signature'] as string;
  const idempotencyKey = req.headers['x-idempotency-key'] as string;

  // Проверка обязательных заголовков
  if (!timestamp || !signature) {
    return res.status(401).json({ error: 'Missing required headers' });
  }

  // Проверка timestamp (окно ±60 секунд)
  const tsNum = Number.parseInt(timestamp, 10);
  if (Number.isNaN(tsNum) || Math.abs(Date.now() - tsNum) > 60_000) {
    return res.status(401).json({ error: 'Timestamp out of window' });
  }

  // Проверка HMAC подписи
  const bodyString = JSON.stringify(req.body);
  if (!verifySignature(bodyString, timestamp, signature)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Проверка idempotency ключа
  if (idempotencyKey) {
    if (idempotencyKeys.has(idempotencyKey)) {
      // Запрос уже был обработан
      return res.status(200).json({ ok: true, idempotent: true });
    }
    idempotencyKeys.set(idempotencyKey, Date.now());
  }

  // Валидация данных
  const { company, name, email, phone, role, message } = req.body;

  if (!company || !name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Формирование сообщения
  const telegramMessage = `📝 <b>Новая заявка</b>\n\n` +
    `🏢 Компания: ${escapeHtml(company)}\n` +
    `👤 Контакт: ${escapeHtml(name)}\n` +
    `📧 Email: ${escapeHtml(email)}\n` +
    `📱 Телефон: ${escapeHtml(phone)}\n` +
    `💼 Роль: ${escapeHtml(role || 'не указана')}\n` +
    `💬 Сообщение: ${escapeHtml(message || 'нет')}`;

  try {
    const success = await sendToTelegram(telegramMessage);

    if (success) {
      return res.status(200).json({ ok: true });
    } else {
      return res.status(503).json({ ok: false, error: 'Failed to send to Telegram' });
    }
  } catch (error: any) {
    console.error('Telegram error:', error.message);
    return res.status(503).json({ ok: false, error: error.message });
  }
});

// Вспомогательная функция для экранирования HTML
function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`bot-sender running on port ${PORT}`);
});
