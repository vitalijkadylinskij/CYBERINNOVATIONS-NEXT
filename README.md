# CYBERINNOVATIONS-NEXT

Прод-конфигурация проекта для запуска через `docker compose`:
- `web` (Next.js, порт контейнера `3000`)
- `bot-sender` (внутренний сервис отправки в Telegram, порт контейнера `3001`, наружу не публикуется)

## Структура

```text
CYBERINNOVATIONS-NEXT/
├── bot-sender/
│   ├── src/index.ts
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── web/
│   ├── app/
│   ├── public/
│   ├── Dockerfile
│   ├── package.json
│   └── next.config.mjs
├── .env.example
├── docker-compose.yml
└── README.md
```

## 1. Подготовка

1. Убедитесь, что установлены Docker и Docker Compose Plugin (`docker compose version`).
2. Создайте файл окружения:

```bash
cp .env.example .env
chmod 600 .env
```

3. Сгенерируйте секрет для внутренней HMAC-подписи:

```bash
openssl rand -hex 32
```

Если `openssl` недоступен:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

4. Получите `TELEGRAM_BOT_TOKEN`:
1. Откройте `@BotFather` в Telegram.
2. Выполните `/newbot`.
3. Скопируйте токен вида `1234567890:AA...`.

5. Получите `RECIPIENT_USER_IDS` (chat id получателей):
1. Отправьте вашему боту команду `/start`.
2. Выполните:

```bash
export TELEGRAM_BOT_TOKEN='ваш_токен'
curl -s "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates" | jq -r '.result[]?.message?.chat?.id' | sort -u
```

3. Вставьте одно или несколько значений в `.env` через запятую.

6. Получите reCAPTCHA ключи:
1. Создайте сайт в [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin/create).
2. Выберите reCAPTCHA v2 Checkbox.
3. Запишите `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` и `RECAPTCHA_SECRET` в `.env`.

## 2. Настройка `.env`

Пример (обязательные значения):

```dotenv
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_BASE_PATH=
WEB_PORT=80
BOT_SENDER_URL=http://bot-sender:3001

INTERNAL_HMAC_SECRET=replace_with_generated_secret
RECAPTCHA_SECRET=replace_with_recaptcha_secret
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=replace_with_recaptcha_site_key
TELEGRAM_BOT_TOKEN=replace_with_telegram_bot_token
RECIPIENT_USER_IDS=473779853

ENABLE_DEBUG_ENDPOINTS=false
```

`NEXT_PUBLIC_BASE_PATH` оставьте пустым для обычного запуска на корне домена. Заполняйте только если приложение реально публикуется под подпутём, например `/CYBERINNOVATIONS-NEXT`.

## 3. Запуск

```bash
docker compose --env-file .env up -d --build
```

Проверка состояния:

```bash
docker compose --env-file .env ps
docker compose --env-file .env logs -f --tail=200
```

Остановка:

```bash
docker compose --env-file .env down
```

Примечание: `docker compose` обычно и так автоматически читает `.env` из корня проекта, но `--env-file .env` делает это явно.

## 4. Безопасность

- Все секреты хранятся только в `.env`.
- `.env` не должен попадать в Git.
- `.env` находится в `.dockerignore`, чтобы секреты не попадали в Docker build context и слой образа.
- `bot-sender` доступен только во внутренней сети compose.
- Межсервисные запросы подписываются HMAC (`INTERNAL_HMAC_SECRET`).
- Контейнеры запущены с ограничениями (`no-new-privileges`, `cap_drop: ALL`, `read_only: true`).

## 5. Прод-развёртывание

1. Замените все placeholder-значения в `.env` на реальные.
2. Откройте на сервере только порт `WEB_PORT`.
3. Для HTTPS используйте внешний reverse proxy (Caddy/Nginx/Traefik) перед `web`.
