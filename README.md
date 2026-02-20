# AVP-Dev Portfolio Core

[🇷🇺 Russian Version](./README.ru.md) | [⚙️ Technical Specs](./docs/TECHNICAL.md)

---

> [!NOTE]
> **Vision:** This repository is not just a personal website—it is a reference architecture for modern frontend development. It demonstrates the ideal balance between bleeding-edge performance, advanced SEO, and absolute security.

[![Astro v5](https://img.shields.io/badge/Astro-v5-FF5D01?logo=astro)](https://astro.build)
[![Bun](https://img.shields.io/badge/Bun-1.x-black?logo=bun)](https://bun.sh/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

AVP-Dev Portfolio Core is a production-ready portfolio and technical blog built on **Astro 5**. It serves as an architectural blueprint for creating modern, performant, and secure web applications. 

## 🚀 Key Features

- **Docker-First Ecosystem**: Fully containerized environment ensuring 100% reproducibility from local development to production.
- **Security by Design**: Security is a foundational layer. Multi-stage Docker builds, non-root execution, server-side DOM sanitization, and strict environment variable management.
- **Hybrid Rendering (SSR + SSG)**: Operates in `output: 'server'` mode for dynamic forms and Telegram API integrations, while pre-rendering (`prerender = true`) most pages for maximum performance and SEO.
- **Headless Content Management**: No external CMS needed. Articles, projects, and legal documents are managed directly via Astro Content Collections with full TypeScript validation natively.
- **CI/CD Auto-Deployment**: Seamlessly integrated with **Coolify** and GitHub Actions for zero-downtime deployment.

## 🏆 Architectural Roadmap

While the foundation is solid, continuous evolution is key:
- Global CDN distribution optimization mapping
- Advanced Edge rendering for hyper-localized content delivery
- Automated visual regression testing suite integration

## 📄 License & Usage

Distributed under the MIT License. This repository is fully open-source as an educational showcase and template for the community.

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