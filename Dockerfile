# Используем Node.js 24 (LTS на момент ноября 2025 года) на базе Debian (slim)
FROM node:24-slim AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для кэширования зависимостей
COPY package*.json ./

# Устанавливаем зависимости, включая devDependencies для сборки
RUN npm install

# Копируем все остальные файлы проекта
COPY . .

# Генерируем типы Astro для корректной сборки
RUN npx astro sync

# Собираем производственную версию приложения
RUN npm run build


# Этап 2: Производственный образ (Production)
FROM node:24-slim AS production

WORKDIR /app

# Устанавливаем dumb-init для корректного управления процессами и curl для healthcheck
# В Debian используется apt-get, а не apk
RUN apt-get update && \
    apt-get install -y --no-install-recommends dumb-init curl && \
    rm -rf /var/lib/apt/lists/*

# Создаем специального пользователя и группу для повышения безопасности
# В node образах часто уже есть пользователь 'node', но для надежности создадим своего
RUN groupadd -r astro_group && useradd -r -g astro_group -d /app astro_user

# Копируем собранное приложение из этапа 'builder'
COPY --from=builder /app/dist ./dist

# Копируем только необходимые для запуска производственные зависимости
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Устанавливаем права на файлы для созданного пользователя
RUN chown -R astro_user:astro_group /app

# Переключаемся на непривилегированного пользователя
USER astro_user

# Открываем порт, на котором будет работать приложение
EXPOSE 4321

# Добавляем проверку состояния (Healthcheck)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:4321 || exit 1

# Устанавливаем команду для запуска приложения через dumb-init
CMD ["dumb-init", "node", "./dist/server/entry.mjs"]