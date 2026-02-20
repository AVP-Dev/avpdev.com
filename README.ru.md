# AVP-Dev Portfolio Core

[🇺🇸 English Version](./README.md) | [⚙️ Техническая часть](./docs/TECHNICAL.ru.md)

---

> [!NOTE]
> **Vision:** Этот репозиторий — не просто сайт-визитка, это эталонная архитектура современного фронтенда. Демонстрация идеального баланса между бескомпромиссной производительностью, продвинутым SEO и абсолютной безопасностью.

[![Astro v5](https://img.shields.io/badge/Astro-v5-FF5D01?logo=astro)](https://astro.build)
[![Bun](https://img.shields.io/badge/Bun-1.x-black?logo=bun)](https://bun.sh/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

AVP-Dev Portfolio Core — это production-ready портфолио и технический блог, построенный на **Astro 5**. Проект служит архитектурным чертежом для создания современных, быстрых и безопасных веб-приложений.

## 🚀 Ключевые особенности

- **Docker-First Подход**: Полностью контейнеризированная среда обеспечивает 100% воспроизводимость от локальной разработки до production-сервера.
- **Безопасность (Security by Design)**: Безопасность заложена в фундамент. Multi-stage Docker сборки, работа от имени non-root пользователя, строгая серверная санитизация (DOMPurify/Sanitize-HTML) и безопасное управление ENV-секретами.
- **Гибридный рендеринг (SSR + SSG)**: Использование режима `output: 'server'` для динамических интеграций (Telegram API), при этом большинство страниц (`prerender = true`) статически генерируются для максимальной отдачи в SEO и скорости.
- **Управление контентом (Без админки)**: Никаких тяжелых CMS. Блог, кейсы и документы управляются "из коробки" через Astro Content Collections со строгой TypeScript-типизацией.
- **CI/CD Автоматизация**: Настроенный пайплайн с **Coolify** и GitHub Actions для бесшовного деплоя.

## 🏆 Дорожная карта архитектуры

База заложена прочно, но развитие продолжается:
- Оптимизация дистрибуции глобальных CDN-сетей
- Продвинутый Edge-рендеринг для гипер-локализованной доставки контента
- Интеграция автоматизированного визуального регрессионного тестирования

## 📄 Лицензия

Распространяется под лицензией MIT. Исходный код открыт в образовательных целях и служит шаблоном для комьюнити.

---

<br />
<p align="center">
  <b><a href="https://avpdev.com/en/">Alexios Odos</a></b>
  &nbsp;|&nbsp;
  <b><a href="https://avpdev.com/ru/">Aliaksei Patskevich</a></b>
  <br />
  <sub>
    Senior Full-stack Engineer
    <br />
    <a href="https://github.com/AVP-Dev">GitHub</a> &bull; <a href="https://t.me/AVP_Dev">Telegram</a>
  </sub>
</p>
