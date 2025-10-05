# Этап 1: Сборка приложения (Builder)
# Используем последнюю стабильную LTS-версию Node.js на базе Alpine Linux
FROM node:22-alpine AS builder

# Устанавливаем dumb-init для корректного управления процессами
RUN apk add --no-cache dumb-init

WORKDIR /app

# Копируем package.json и package-lock.json для кэширования зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы проекта
COPY . .

# ИСПРАВЛЕНИЕ: Принудительно генерируем все типы Astro перед сборкой.
# Это решает проблему с ненайденными виртуальными модулями, такими как 'astro:actions'.
RUN npx astro sync

# Собираем производственную версию приложения
RUN npm run build


# Этап 2: Производственный образ (Production)
FROM node:22-alpine AS production

WORKDIR /app

# Создаем специального пользователя и группу для повышения безопасности
RUN addgroup -S astro_group && adduser -S astro_user -G astro_group

# ИСПРАВЛЕНИЕ: Устанавливаем 'curl' для прохождения Healthcheck на таких платформах, как Coolify.
RUN apk add --no-cache curl

# Копируем собранное приложение из этапа 'builder'
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Устанавливаем права на файлы для созданного пользователя
RUN chown -R astro_user:astro_group .

# Переключаемся на непривилегированного пользователя
USER astro_user

# Открываем порт, на котором будет работать приложение
EXPOSE 4321

# Устанавливаем команду для запуска приложения через dumb-init
CMD ["node", "./dist/server/entry.mjs"]

