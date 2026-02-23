# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json для кэширования
COPY web/package.json web/package-lock.json ./web/
COPY bot-sender/package.json ./bot-sender/

# Устанавливаем зависимости
WORKDIR /app/web
RUN npm ci --prefer-offline --no-audit

WORKDIR /app/bot-sender
RUN npm install --prefer-offline --no-audit

# Копируем исходный код
WORKDIR /app
COPY web ./web
COPY bot-sender ./bot-sender
COPY nginx ./nginx
COPY secrets ./secrets

# Аргументы для сборки
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG RECAPTCHA_SECRET

# Собираем web
WORKDIR /app/web
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV RECAPTCHA_SECRET=$RECAPTCHA_SECRET
RUN npm run build

# Собираем bot-sender
WORKDIR /app/bot-sender
RUN npm run build

# Stage 2: Production - Web
FROM node:20-alpine AS runner-web

WORKDIR /app

# Создаем не-root пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем собранные файлы из stage builder
COPY --from=builder /app/web/public ./public
COPY --from=builder /app/web/.next/standalone ./.
COPY --from=builder /app/web/.next/static ./.next/static

# Копируем secrets из build stage и Docker secrets
COPY --from=builder /app/secrets ./secrets

# Переключаемся на не-root пользователя
USER nextjs

# Переменные окружения
ENV NODE_ENV=production
ENV PORT=3000
ENV INTERNAL_HMAC_SECRET_FILE=/run/secrets/internal_hmac_secret

# Expose port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start
CMD ["node", "server.js"]
