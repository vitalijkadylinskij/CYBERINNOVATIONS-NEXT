# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json для кэширования
COPY package.json package-lock.json ./

# Используем npm ci для быстрой и детерминистичной установки
# --prefer-offline использует кэш, если доступен
# --no-audit отключает аудит безопасности для ускорения
RUN npm ci --prefer-offline --no-audit

# Копируем исходный код
COPY . .

ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG RECAPTCHA_SECRET

ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV RECAPTCHA_SECRET=$RECAPTCHA_SECRET

# Устанавливаем зависимости для сборки
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

# Создаем не-root пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем собранные файлы из stage builder
# Для standalone режима копируем только необходимые файлы
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Копируем файл с секретом
COPY --from=builder /app/secrets ./secrets

# Устанавливаем только production зависимости
RUN npm install --omit=dev --omit=peer

# Переключаемся на не-root пользователя
USER nextjs

# Переменные окружения
ENV NODE_ENV=production
ENV PORT=3000
ENV INTERNAL_HMAC_SECRET_FILE=/app/secrets/internal_hmac_secret

# Expose port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start (standalone mode uses server.js directly)
CMD ["node", "server.js"]
