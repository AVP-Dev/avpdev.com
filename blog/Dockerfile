# 1. Установка зависимостей
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2. Сборка приложения
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3. Запуск приложения
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Копируем собранное приложение из предыдущего шага
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Запускаем сервер Next.js
CMD ["node", "server.js"]
