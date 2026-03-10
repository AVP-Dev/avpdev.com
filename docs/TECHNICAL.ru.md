# Техническая спецификация

[🏠 Главная](../README.ru.md) | [🇺🇸 English Version](./TECHNICAL.md)

---

> [!IMPORTANT]
> **Архитектурная парадигма**: Проект акцентирует внимание на максимальной развязке (decoupling), встроенной типизации через Astro Content Collections и stateless-интеграциях. Это позволяет полностью отказаться от базы данных и админки, многократно снижая векторы атак, сохраняя при этом гибкость управления контентом и интерактивность.

## 🧩 Архитектурная топология

Поток данных строго однонаправленный. Все чувствительные операции и системные переменные хранятся и исполняются исключительно на стороне сервера.

```mermaid
graph TD
    A["Браузер Клиента"] -->|HTTP/HTTPS| B["Nginx / Reverse Proxy"]
    B --> C["Docker Контейнер (Astro App)"]
    
    subgraph "Серверная Инфраструктура"
      C -->|Статические страницы| D["Astro SSG Движок"]
      C -->|Динамические API Роуты| E["Astro Bun SSR"]
      E -->|Валидация Данных| F["Zod Схемы"]
      F -->|Очистка Данных| G["HTML Санитизатор"]
    end
    
    G -->|Защищенный POST Запрос| H["Telegram API"]
    
    subgraph "Управление Контентом"
      D -.-> I["Astro Content Collections (Markdown/MDX)"]
    end
```

## 🔐 Архитектура безопасности

1. **Защита от XSS**: Все пользовательские вводы из форм очищаются через `sanitize-html` на бэкенде Astro (Bun) для исключения инъекций скриптов.
2. **Маскирование Окружения**: Секретные ключи (`BOT_TOKEN`, `CHAT_ID`) никогда не попадают в клиентский код и используются только на сервере.
3. **Изоляция Контейнеров**: Docker-сборка базируется на Bun Alpine с жестко заданным запуском процессов от имени пользователя без root-прав (non-root execution).

## 🚀 CLI Команды

Для локального запуска и проверки репозитория используйте следующие команды:

```bash
# Инициализация зависимостей
bun install

# Запуск dev-сервера
bun run dev

# Сборка production-версии
bun run build

# Строгая проверка типов (TypeScript / Astro)
bun run check
```

## 🚢 Флоу CI/CD Деплоя

Автоматизация процесса происходит по следующему сценарию:

```mermaid
sequenceDiagram
    participant Dev as "Разработчик"
    participant GH as "GitHub (main)"
    participant Coolify as "Coolify CI/CD"
    participant Server as "Production Сервер"

    Dev->>GH: push коммита
    GH->>Coolify: Webhook Триггер
    Coolify->>Server: Скачивание кода и сборка Docker-образа
    Server-->>Coolify: Сборка успешна
    Coolify->>Server: Деплой контейнера (Zero-Downtime)
```

---

<br />
<p align="center">
  <a href="https://avpdev.com/en/"><b>Alexios Odos</b></a>
  &nbsp;|&nbsp;
  <a href="https://avpdev.com/ru/"><b>Aliaksei Patskevich</b></a>
  <br />
  <sub>
    <b>Software Engineer</b> • Code, Design & AI
    <br />
    <a href="https://github.com/AVP-Dev">GitHub</a> &bull; <a href="https://t.me/AVP_Dev">Telegram</a>
  </sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" />
  <br />
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white" />
  <img src="https://img.shields.io/badge/Autodesk_Fusion_360-0696D7?style=flat-square&logo=autodesk&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" />
</p>

