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
├── web/                 # Next.js веб-приложение с nginx
│   ├── app/
│   │   ├── api/
│   │   │   └── submit/ # API endpoint для формы
│   │   └── ...
│   ├── Dockerfile
│   ├── nginx.conf       # Конфигурация nginx
│   ├── next.config.ts
│   └── package.json
├── .env                # Переменные окружения
├── .env.example        # Пример переменных окружений
├── docker-compose.yml
└── README.md
```

## Предварительная настройка

### 1. Настройка переменных окружения

Создайте файл `.env` в корне проекта (можно скопировать из `.env.example`):

```
env
# Обязательные переменные
TELEGRAM_BOT_TOKEN=ваш_telegram_bot_token
INTERNAL_HMAC_SECRET=ваш_секретный_ключ_hmac

# Опциональные переменные
RECAPTCHA_SECRET=ваш_recaptcha_secret_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=ваш_recaptcha_site_key
```

### 2. Генерация SSL сертификатов (для HTTPS)

Самоподписанные сертификаты уже находятся в `web/nginx/ssl/`. Для генерации новых:

```
bash
# Linux/Mac
cd web/nginx/ssl
openssl genrsa -out key.pem 2048
openssl req -new -x509 -key key.pem -out cert.pem -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Windows (PowerShell)
cd web/nginx/ssl
openssl genrsa -out key.pem 2048
openssl req -new -x509 -key key.pem -out cert.pem -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
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

- **HTTP**: http://localhost
- **HTTPS**: https://localhost (если настроены сертификаты)

## Архитектура

```
┌─────────────────────────────────────────────────────┐
│                 Внешний мир (интернет)               │
│                    :80 / :443                        │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│  Web Container (nginx + Next.js)                   │
│  - nginx:80 - Reverse proxy                         │
│  - nginx:443 - TLS termination (если настроено)    │
│  - Next.js:3000 - Application                       │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│  bot-sender (:3001, internal network only)         │
│  - Отправка сообщений в Telegram                    │
└─────────────────────────────────────────────────────┘
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
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
