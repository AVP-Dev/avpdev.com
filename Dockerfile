# Этап 1: Сборка приложения (Builder)
# Используем актуальную LTS-версию Node.js на базе Alpine для легковесности
FROM node:22-alpine AS builder

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
FROM node:22-alpine AS production

WORKDIR /app

# Создаем специального пользователя и группу для повышения безопасности
RUN addgroup -S astro_group && adduser -S astro_user -G astro_group

# Устанавливаем dumb-init для корректного управления процессами и curl для healthcheck
RUN apk add --no-cache dumb-init curl

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