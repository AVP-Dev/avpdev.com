# Dockerfile

# --- Этап 1: Сборщик (Builder) ---
# Используем последнюю стабильную LTS-версию Node.js на базе Alpine для минимального размера
FROM node:22-alpine AS builder

# Устанавливаем dumb-init для корректной обработки сигналов в контейнере
RUN apk add --no-cache dumb-init

WORKDIR /app

# Копируем только package.json и package-lock.json для кэширования зависимостей
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


# --- Этап 2: Продакшн (Production) ---
FROM node:22-alpine

# Устанавливаем dumb-init
RUN apk add --no-cache dumb-init

WORKDIR /app

# Создаем пользователя с ограниченными правами для безопасности
RUN addgroup -S astro_group && adduser -S astro_user -G astro_group
USER astro_user

# Копируем только необходимые для запуска артефакты из сборщика
COPY --from=builder /app/dist ./
COPY --from=builder /app/node_modules ./node_modules

# Устанавливаем переменные окружения для Node.js сервера
# PORT будет взят из docker-compose.yml
ENV HOST=0.0.0.0

# Запускаем приложение через dumb-init
CMD ["dumb-init", "node", "./server/entry.mjs"]

