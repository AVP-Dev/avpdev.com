# Этап 1: Сборка приложения (Builder)
# Используем стандартный образ Bun на базе Debian (bookworm-slim)
# Это обеспечит лучшую совместимость с нативными модулями типа Sharp и ускорит сборку
FROM oven/bun:1.2 AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и bun.lock для кэширования зависимостей
# В Bun 1.2+ используется bun.lock по умолчанию
COPY package.json bun.lock ./

# Устанавливаем зависимости
RUN bun install --frozen-lockfile

# Копируем все остальные файлы проекта
COPY . .

# Генерируем типы Astro для корректной сборки
RUN bunx astro sync

# Собираем производственную версию приложения
# Отключаем телеметрию для ускорения
ENV ASTRO_TELEMETRY_DISABLED=1
RUN bun run build


# Этап 2: Производственный образ (Production)
FROM oven/bun:1.2-slim AS production

WORKDIR /app

# Создаем специального пользователя и группу для повышения безопасности
RUN groupadd -r astro_group && useradd -r -g astro_group astro_user

# Устанавливаем dumb-init для корректного управления процессами и curl для healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init curl && \
  rm -rf /var/lib/apt/lists/*

# Копируем собранное приложение из этапа 'builder'
COPY --from=builder /app/dist ./dist

# Копируем только необходимые для запуска производственные зависимости
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Устанавливаем права на файлы для созданного пользователя
RUN chown -R astro_user:astro_group .
# Переключаемся на непривилегированного пользователя
USER astro_user

# Открываем порт, на котором будет работать приложение
EXPOSE 4321

# Добавляем проверку состояния (Healthcheck)
# Проверяем, что сервер отвечает на запросы
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4321 || exit 1

# Устанавливаем команду для запуска приложения через dumb-init
# Это обеспечивает корректную обработку сигналов (например, при остановке контейнера)
CMD ["dumb-init", "node", "./dist/server/entry.mjs"]