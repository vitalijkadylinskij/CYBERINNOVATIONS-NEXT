# TODO - Настройка Docker Compose для Telegram Bot системы

## Файлы для создания/редактирования:

### 1. NGINX ✓
- [x] my-app/nginx/Dockerfile
- [x] my-app/nginx/nginx.conf

### 2. Docker Compose ✓
- [x] my-app/docker-compose.yml

### 3. Web (Next.js) ✓
- [x] my-app/web/next.config.ts - обновлён для Docker (output: 'standalone')
- [x] my-app/web/Dockerfile
- [x] my-app/web/app/api/submit/route.ts - API для приёма формы

### 4. Bot-sender ✓
- [x] my-app/bot-sender/package.json
- [x] my-app/bot-sender/Dockerfile
- [x] my-app/bot-sender/tsconfig.json
- [x] my-app/bot-sender/src/index.ts - улучшен с логикой повторов

### 5. Документация ✓
- [x] my-app/README.md
- [x] my-app/nginx/ssl/generate.sh

## Статус: Завершено ✓

## Что нужно сделать перед запуском:

1. Сгенерировать SSL сертификаты:
   
```
bash
   cd nginx/ssl
   openssl genrsa -out key.pem 2048
   openssl req -new -x509 -key key.pem -out cert.pem -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
   
```

2. Заполнить секреты:
   - my-app/secrets/telegram_bot_token - ваш токен Telegram бота
   - my-app/secrets/internal_hmac_secret - ваш секретный ключ для HMAC

3. Запустить:
   
```
bash
   docker-compose up --build
