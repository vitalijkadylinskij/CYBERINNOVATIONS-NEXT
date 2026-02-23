
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json для кэширования
COPY package.json package-lock.json ./

# Используем npm ci для быстрой и детерминистичной установки
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

# Устанавливаем nginx для статических файлов
RUN apk add --no-cache nginx

# Создаем не-root пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Создаем необходимые директории для nginx
RUN mkdir -p /var/lib/nginx/logs /var/lib/nginx/tmp/client_body /var/run && \
    chown -R nextjs:nodejs /var/lib/nginx /var/run

# Копируем собранные файлы из stage builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Копируем nginx конфигурацию
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Устанавливаем только production зависимости
RUN npm install --omit=dev --omit=peer

# Переменные окружения
ENV NODE_ENV=production
ENV PORT=3000

# Expose ports: 3000 for Next.js, 80 for nginx
EXPOSE 3000 80

# Healthcheck для nginx
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Start nginx with daemon off and Next.js
CMD ["sh", "-c", "nginx -g 'daemon off;' & node server.js"]
