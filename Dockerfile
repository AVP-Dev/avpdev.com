# Используем стабильную LTS версию Node.js на базе Debian (slim)
# Это решает проблему с падением компилятора Astro (panic: html parser)
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

COPY . .

# Генерируем типы
RUN npx astro sync

# Собираем проект
RUN npm run build

# --- Stage 2: Production ---
FROM node:20-slim AS production

WORKDIR /app

# Устанавливаем dumb-init и curl для healthcheck (в Debian используется apt-get)
RUN apt-get update && \
    apt-get install -y --no-install-recommends dumb-init curl && \
    rm -rf /var/lib/apt/lists/*

# Создаем пользователя
RUN groupadd -r astro_group && useradd -r -g astro_group -d /app astro_user

# Копируем артефакты сборки
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Настраиваем права
RUN chown -R astro_user:astro_group /app

USER astro_user

EXPOSE 4321

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:4321 || exit 1

CMD ["dumb-init", "node", "./dist/server/entry.mjs"]