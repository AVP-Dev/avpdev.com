# Astro Showcase Submission Package

Файлы для добавления сайта [avpdev.com](https://avpdev.com/) в официальный каталог [Astro Showcase](https://astro.build/showcase/).

---

## 📁 Структура файлов

1. `avpdev.com.yml` — файл метаданных для репозитория `withastro/astro.build`.
2. `avpdev.com.webp` — скриншот сайта (ширина 1600px, формат WebP).
3. `convert-screenshot.sh` — вспомогательный скрипт для мгновенной конвертации вашего скриншота в требуемый формат.

---

## 🚀 Как быстро подготовить скриншот

Запустите скрипт, передав путь к вашему исходному скриншоту (PNG/JPG):
```bash
./showcase-submission/convert-screenshot.sh /путь/к/вашему/скриншоту.png
```
Скрипт автоматически сожмет изображение до ширины 1600px и сохранит его как `showcase-submission/avpdev.com.webp`.

---

## 📤 Куда заливать в репозитории `withastro/astro.build`

В вашем форке `astro.build` на GitHub оба файла должны быть помещены в папку:
```
src/content/showcase/
├── avpdev.com.yml
└── avpdev.com.webp
```

---

## 📝 Текст для Pull Request

**Заголовок PR:**
```text
Add avpdev.com to showcase
```

**Описание PR:**
```markdown
### Site details
- **URL**: https://avpdev.com/
- **Categories**: Personal, Portfolio, Tech, Blog
- **Description**: Production portfolio, engineering showcase, and technical blog built with Astro v7.
```
