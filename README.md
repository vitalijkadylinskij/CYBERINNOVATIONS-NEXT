# CYBERINNOVATIONS-NEXT

Прод-конфигурация проекта для запуска через `docker compose`:
- `nginx` принимает весь внешний трафик и работает как единственная публичная точка входа
- `web` (Next.js) обслуживает сайт с локалями `/ru` и `/en`
- `bot-sender` принимает только внутренние запросы от сайта и отправляет заявки в Telegram
- боевой домен и сертификаты рассчитаны на `adti.by`

## Архитектура

```text
Internet
  -> nginx (80/443 on host)
     -> web (internal, port 3000)
        -> bot-sender (internal, port 3001)
```

Что уже учтено в конфигурации:
- сайт работает через `docker compose`
- наружу публикуется только `nginx`
- `nginx` не подменяет отсутствующие URL на главную и пропускает реальные `404` от Next.js
- форма принимает только текстовые поля, а API отклоняет лишние поля и слишком большие payload'ы
- HTTP используется только для `/.well-known/acme-challenge/` и редиректа на HTTPS

## 1. Подготовка

1. Убедитесь, что установлены Docker, Docker Compose Plugin и `certbot`.
2. Создайте `.env`:

```bash
cp .env.example .env
chmod 600 .env
```

3. Создайте директорию для webroot certbot:

```bash
sudo mkdir -p /var/www/certbot
sudo chown "$USER":"$USER" /var/www/certbot
```

4. Сгенерируйте секрет для внутренней HMAC-подписи:

```bash
openssl rand -hex 32
```

5. Получите `TELEGRAM_BOT_TOKEN` у `@BotFather`.
6. Получите `RECIPIENT_USER_IDS`, отправив боту `/start`, затем:

```bash
export TELEGRAM_BOT_TOKEN='ваш_токен'
curl -s "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates" | jq -r '.result[]?.message?.chat?.id' | sort -u
```

7. Создайте ключи reCAPTCHA v2 Checkbox для `adti.by` и заполните `.env`.

## 2. Настройка `.env`

Минимальный пример:

```dotenv
NEXT_PUBLIC_SITE_URL=https://adti.by
NEXT_PUBLIC_BASE_PATH=

INTERNAL_HMAC_SECRET=replace_with_long_random_secret
RECAPTCHA_SECRET=replace_with_recaptcha_secret
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=replace_with_recaptcha_site_key
TELEGRAM_BOT_TOKEN=replace_with_telegram_bot_token
RECIPIENT_USER_IDS=473779853

ENABLE_DEBUG_ENDPOINTS=false
```

Важно:
- `nginx` в репозитории настроен на `adti.by`
- на хосте должны существовать сертификаты в `/etc/letsencrypt/live/adti.by/`
- `NEXT_PUBLIC_SITE_URL` должен быть `https://adti.by`
- `NEXT_PUBLIC_BASE_PATH` оставляйте пустым, если сайт размещается в корне домена

## 3. Первый запуск

1. Убедитесь, что сертификат для `adti.by` уже выпущен на хосте.

2. Поднимите compose:

```bash
docker compose up -d --build
```

3. Проверьте состояние:

```bash
docker compose ps
docker compose logs -f --tail=200
```

## 4. Автопродление сертификата

Для продления на хосте используйте deploy-hook, который перегружает `nginx` внутри compose:

```bash
sudo certbot renew \
  --deploy-hook "cd /path/to/CYBERINNOVATIONS-NEXT && docker compose exec -T nginx nginx -s reload"
```

Если у вас уже настроен системный timer `certbot`, достаточно один раз добавить такой hook в renewal-конфигурацию или в отдельный script.

## 5. Безопасность

- `web` не публикуется наружу
- `bot-sender` доступен только во внутренних сетях compose
- все внешние запросы идут через `nginx`
- HTTP используется только для ACME challenge и редиректа на HTTPS
- `nginx` запрещает неизвестные `/api/*`, ограничивает методы и маленьким `client_max_body_size`
- форма и API принимают только текстовые данные и не поддерживают загрузку файлов/вложений
- запросы между `web` и `bot-sender` подписаны HMAC

## 6. Полезные команды

Запуск:

```bash
docker compose up -d --build
```

Остановка:

```bash
docker compose down
```

Просмотр логов:

```bash
docker compose logs -f --tail=200 nginx web bot-sender
```
