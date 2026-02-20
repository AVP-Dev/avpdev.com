# Этап 1: Сборка приложения (Builder)
FROM oven/bun:1.2-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json bun.lockb* ./

# Устанавливаем зависимости
RUN bun install --frozen-lockfile

# Копируем всё остальное
COPY . .

# Собираем проект
RUN bun run build

# Этап 2: Производственный образ (Production)
FROM oven/bun:1.2-alpine AS production

WORKDIR /app

# Безопасность и системные утилиты
RUN addgroup -S astro_group && adduser -S astro_user -G astro_group
RUN apk add --no-cache dumb-init curl

# Копируем билд и зависимости
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Права доступа
RUN chown -R astro_user:astro_group .
USER astro_user

# --- ВНИМАНИЕ: Порт изменен на 3000 (согласно твоему astro.config) ---
EXPOSE 3000

# Переменные окружения для работы внутри контейнера
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Healthcheck на порт 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Запуск через bun (так как образа node в системе нет)
CMD ["dumb-init", "bun", "./dist/server/entry.mjs"]