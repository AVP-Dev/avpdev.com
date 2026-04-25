# Этап 1: Сборка приложения (Builder)
FROM oven/bun:latest AS builder

WORKDIR /app

# Копируем файлы зависимостей и скрипт патча
COPY package.json bun.lock* ./
COPY scripts ./scripts

# Устанавливаем зависимости
RUN bun install

# Копируем всё остальное
COPY . .

# Собираем проект
RUN bun run build

# Этап 2: Производственный образ (Production)
FROM oven/bun:latest AS production

WORKDIR /app

# Безопасность и системные утилиты
RUN groupadd -r astro_group && useradd -r -g astro_group astro_user
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates && rm -rf /var/lib/apt/lists/*

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
ENV ASTRO_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Healthcheck на порт 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Запуск через bun
CMD ["bun", "./dist/server/entry.mjs"]