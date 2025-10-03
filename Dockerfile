# Этап 1: Установка зависимостей и сборка проекта
# Используем образ Node.js, так как Astro - это JS-фреймворк
FROM node:20-alpine AS builder

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и lock-файл для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости проекта
RUN npm install

# Копируем все остальные файлы проекта в рабочую директорию
COPY . .

# Собираем проект. Astro с Node.js адаптером создаст папку /dist с сервером
RUN npm run build

# ---

# Этап 2: Финальный образ для запуска приложения
# Используем тот же базовый образ для консистентности
FROM node:20-alpine

WORKDIR /app

# ДОБАВЛЕНО: Устанавливаем curl для healthcheck
RUN apk add --no-cache curl

# Копируем только необходимые для запуска файлы из этапа сборки
COPY --from=builder /app/dist ./
# ДОБАВЛЕНО: Копируем установленные зависимости, необходимые для запуска сервера
COPY --from=builder /app/node_modules ./node_modules

# Переменные окружения для сервера
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

# Запускаем сервер с помощью команды, которая находится внутри `dist/server/entry.mjs`
CMD ["node", "server/entry.mjs"]