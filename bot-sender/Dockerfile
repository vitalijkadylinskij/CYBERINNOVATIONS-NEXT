# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем зависимости и устанавливаем
COPY package.json ./
RUN npm install

# Копируем исходный код
COPY tsconfig.json ./
COPY src ./src

# Компилируем TypeScript
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

# Создаем не-root пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 bot

# Копируем скомпилированные файлы
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Переключаемся на не-root пользователя
USER bot

# Переменные окружения
ENV NODE_ENV=production

# Expose port
EXPOSE 3001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/internal/send || exit 1

# Start
CMD ["node", "dist/index.js"]
