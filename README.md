# Персональный сайт-портфолио – AVPdev.com

Современный сайт-портфолио, созданный на нативном HTML, CSS и JavaScript, с бэкендом на Node.js для обработки контактной формы и отправки уведомлений в Telegram.

[![portfolio-website](https.img.shields.io/badge/Live_Demo-AVPdev.com-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.avpdev.com/)
[![Telegram](https://img.shields.io/badge/Telegram-@avpdevcom-0088cc?style=for-the-badge&logo=telegram)](https://t.me/avpdevcom)
[![GitHub](https://img.shields.io/badge/GitHub-AVP--Dev-181717?style=for-the-badge&logo=github)](https://github.com/AVP-Dev)

---

## 🛠️ Стек технологий

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

---

## ✨ Ключевые особенности

*   📱 **Адаптивный Mobile-First дизайн** — корректное отображение на всех устройствах, от смартфонов до десктопов.
*   🌐 **Многоязычность (i18n)** — мгновенное переключение между русским и английским языками без перезагрузки страницы.
*   🎨 **Светлая и темная темы** — автоматическое сохранение выбора пользователя в `localStorage`.
*   🚀 **Динамическое портфолио** — рендеринг проектов из JS-объекта с фильтрацией по категориям и ленивой загрузкой.
*   ✨ **Интерактивные анимации** — плавное появление элементов при скролле (`IntersectionObserver API`) и анимированный фон (`particles.js`).
*   📝 **Backend на Node.js/Express** — обработка данных контактной формы с отправкой заявок напрямую в Telegram.
*   🔒 **Безопасность и валидация** — базовая защита от XSS-атак на стороне сервера.
*   📊 **SEO-оптимизация** — полный набор мета-тегов, Open Graph, `sitemap.xml`, Google Analytics и Яндекс.Метрика.

---

## 🚀 Установка и запуск

Для просмотра фронтенд-части достаточно открыть файл `index.html`. Для работы контактной формы требуется запуск Node.js сервера.

1.  **Клонируйте репозиторий:**
    ```bash
    git clone https://github.com/AVP-Dev/avpdev.com.git
    cd avpdev.com
    ```

2.  **Установите зависимости сервера:**
    ```bash
    npm install
    ```

3.  **Настройте переменные окружения:**
    Создайте файл `.env` в корне проекта и добавьте свои ключи Telegram:
    ```env
    BOT_TOKEN=ВАШ_ТЕЛЕГРАМ_БОТ_ТОКЕН
    CHAT_ID=ВАШ_ТЕЛЕГРАМ_ЧАТ_ID
    ```

4.  **Запустите сервер:**
    ```bash
    npm start
    ```
    Сервер будет запущен по адресу `http://localhost:3000`.

---

## 📂 Структура проекта

```
/
├── api/
│   └── sendMessage.js        # Backend: Express-сервер
├── assets/
│   ├── css/                  # Стили
│   ├── images/               # Изображения
│   └── js/                   # Клиентские скрипты
├── *.html                      # HTML-страницы
├── package.json                # Зависимости и скрипты Node.js
├── sitemap.xml                 # Карта сайта
└── README.md                   # Этот файл
```

---

## ✍️ Автор

**Алексей Пацкевич**

*   **GitHub:** [@AVP-Dev](https://github.com/AVP-Dev)
*   **Telegram:** [@avpdevcom](https://t.me/avpdevcom)
*   **Сайт:** [avpdev.com](https://www.avpdev.com/)