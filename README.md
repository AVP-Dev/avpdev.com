# AVP-Dev Portfolio Core

[🇷🇺 Russian Version](./README.ru.md) | [⚙️ Technical Specs](./docs/TECHNICAL.md)

---

> [!NOTE]
> **Vision:** This repository is not just a personal website—it is a reference architecture for modern frontend development. It demonstrates the ideal balance between bleeding-edge performance, advanced SEO, and absolute security.

[![Astro v7](https://img.shields.io/badge/Astro-v7-FF5D01?logo=astro)](https://astro.build)
[![React 19](https://img.shields.io/badge/React-19-20232A?logo=react)](https://react.dev)
[![Bun](https://img.shields.io/badge/Bun-1.3+-black?logo=bun)](https://bun.sh/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Zod](https://img.shields.io/badge/Zod-4-3068B7?logo=zod&logoColor=white)](https://zod.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

AVP-Dev Portfolio Core is a production-ready portfolio and technical blog built on **Astro 7**. It serves as an architectural blueprint for creating modern, performant, and secure web applications. 

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
  <img src="https://img.shields.io/badge/Zod-3068B7?style=flat-square&logo=zod&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white" />
</p>