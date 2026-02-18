import express from 'express';
import crypto from 'crypto';
import axios from 'axios';

const app = express();
app.use(express.json({ limit: '10kb' })); // лимит payload

// Читаем секреты из файлов
const TELEGRAM_BOT_TOKEN = require('fs').readFileSync('/run/secrets/telegram_bot_token', 'utf-8').trim();
const INTERNAL_HMAC_SECRET = require('fs').readFileSync('/run/secrets/internal_hmac_secret', 'utf-8').trim();

// Список Telegram ID получателей (allowlist)
const RECIPIENT_USER_IDS = process.env.RECIPIENT_USER_IDS?.split(',') || ['vitalikadylinskiy'];

// In-memory LRU cache для idempotency ключей
const idempotencyKeys = new Map<string, number>();
const IDEMPOTENCY_WINDOW = 5 * 60 * 1000; // 5 минут

// Очистка старых ключей каждые 2 минуты
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of idempotencyKeys.entries()) {
    if (now - timestamp > IDEMPOTENCY_WINDOW) {
      idempotencyKeys.delete(key);
    }
  }
}, 2 * 60 * 1000);

// Фрификации подписи HMAC
function verifySignature(body: string, timestamp: string, signature: string): boolean {
  const expected = crypto
    .createHmac('sha256', INTERNAL_HMAC_SECRET)
    .update(body + '.' + timestamp)
    .digest('hex');
  return expected === signature;
}

// Функция отправки сообщения в Telegram с retry
async function sendToTelegram(message: string): Promise<boolean> {
  const MAX_RETRIES = 3;
  const BASE_DELAY = 1000; // 1 секунда

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      for (const userId of RECIPIENT_USER_IDS) {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          chat_id: userId.trim(),
          text: message,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
          protect_content: true,
        }, {
          timeout: 10000,
        });
      }
      return true;
    } catch (error: any) {
      console.error(`Attempt ${attempt} failed:`, error.message);
      
      // Если это последняя попытка - выходим с ошибкой
      if (attempt === MAX_RETRIES) {
        throw error;
      }
      
      // Экспоненциальный backoff
      const delay = BASE_DELAY * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return false;
}

// Функция удаления webhook при старте
async function deleteWebhookOnStartup(): Promise<void> {
  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/deleteWebhook`, {
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
  const tsNum = parseInt(timestamp, 10);
  if (isNaN(tsNum) || Math.abs(Date.now() - tsNum) > 60_000) {
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
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`bot-sender running on port ${PORT}`);
});
