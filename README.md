# Telegram Bot System - Docker Compose Setup

## Структура проекта

```
my-app/
├── bot-sender/          # Сервис отправки в Telegram
│   ├── src/
│   │   └── index.ts    # Основной код
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── web/                 # Next.js веб-приложение
│   ├── app/
│   │   ├── api/
│   │   │   └── submit/ # API endpoint для формы
│   │   └── ...
│   ├── Dockerfile
│   ├── next.config.ts
│   └── package.json
├── nginx/               # NGINX reverse proxy
│   ├── ssl/            # SSL сертификаты
│   ├── nginx.conf
│   └── Dockerfile
├── secrets/            # Секреты
│   ├── telegram_bot_token
│   └── internal_hmac_secret
├── docker-compose.yml
└── README.md
```

## Предварительная настройка

### 1. Генерация SSL сертификатов

Для разработки сгенерируйте самоподписанные сертификаты:

```
bash
# Linux/Mac
cd nginx/ssl
openssl genrsa -out key.pem 2048
openssl req -new -x509 -key key.pem -out cert.pem -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Windows (PowerShell)
cd nginx/ssl
openssl genrsa -out key.pem 2048
openssl req -new -x509 -key key.pem -out cert.pem -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
```

### 2. Настройка секретов

Создайте файлы в папке `secrets/`:

**secrets/telegram_bot_token**
```
ВАШ_TELEGRAM_BOT_TOKEN
```

**secrets/internal_hmac_secret**
```
Ваш_секретный_ключ_для_HMAC_подписи
```

### 3. Настройка переменных окружения (опционально)

Создайте файл `.env` в корне проекта:

```
env
RECAPTCHA_SECRET=ваш_recaptcha_secret_key
```

## Запуск

```
bash
# Сборка и запуск
docker-compose up --build

# Запуск в фоновом режиме
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down
```

## Доступ

- **HTTPS**: https://localhost (или ваш домен)
- **HTTP**: http://localhost (автоматически редиректит на HTTPS)

## Архитектура

```
┌─────────────────────────────────────────────────────┐
│                 Внешний мир (интернет)               │
│                    :443 (HTTPS)                      │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│  NGINX (reverse proxy)                              │
│  - TLS termination                                  │
│  - Rate limiting                                    │
│  - Security headers                                 │
└─────────────────────┬───────────────────────────────┘
                      │
         ┌────────────┴────────────┐
         ▼                         ▼
┌─────────────────┐      ┌─────────────────────┐
│   web (Next.js) │      │  bot-sender         │
│   :3000         │ ───► │  :3001 (internal)   │
│   (public)      │      │                     │
└─────────────────┘      └─────────────────────┘
```

## Требования к форме заявки

Форма должна отправлять POST запрос на `/api/submit` с JSON:

```
json
{
  "company": "Название компании",
  "name": "Имя контакта",
  "email": "email@example.com",
  "phone": "+1234567890",
  "role": "Роль (опционально)",
  "message": "Сообщение (опционально)",
  "captchaToken": "токен_рекапчи",
  "timestamp": 1234567890,
  "honeypot": ""  // Должно быть пустым
}
```

## Безопасность

- Rate limiting: 5 запросов/сек на `/api/submit`
- HMAC подпись запросов между web и bot-sender
- Idempotency ключи для предотвращения дубликатов
- CAPTCHA обязательна
- Honeypot проверка
- CSP заголовки
- TLS обязателен
