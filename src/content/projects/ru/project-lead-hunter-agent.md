---
titleKey: 'case_leadhunter_title'
descriptionKey: 'case_leadhunter_desc'
ogImage: '/og-image.webp'
clientKey: 'case_leadhunter_client'
servicesKey: 'case_leadhunter_services'
year: 2026
featured: true
category: 'ai'
stack: ['TypeScript', 'Python', 'Telegram Bot API', 'RAG Knowledge Base', 'PostgreSQL', 'CRM Webhooks']
publishDate: 2026-10-26
heroImage: '../../../assets/images/projects/lead-hunter-agent/hero.webp'
heroImageAlt: 'Lead Hunter AI — Мультиканальный агент лидогенерации по 30+ каналам'
metrics:
  - label: 'Скорость обработки'
    value: 'с 15 минут → до 2 секунд'
  - label: 'Каналы мониторинга'
    value: '30+ публичных площадок'
  - label: 'Режим верификации'
    value: 'Shadow Mode & 1-Click Approval'
header:
  titleKey: 'case_leadhunter_h1'
  descriptionKey: 'case_leadhunter_desc'
content:
  task:
    titleKey: 'case_task'
    pKey: 'case_leadhunter_task_p'
  solution:
    titleKey: 'case_solution'
    pKey: 'case_leadhunter_solution_p'
  keyFeatures:
    titleKey: 'case_key_features'
    listKeys:
      - 'case_leadhunter_feat_1'
      - 'case_leadhunter_feat_2'
      - 'case_leadhunter_feat_3'
      - 'case_leadhunter_feat_4'
      - 'case_leadhunter_feat_5'
  techStack:
    - icon: 'fab fa-js-square'
      title: 'TypeScript'
      color: '#3178C6'
    - icon: 'fab fa-python'
      title: 'Python'
      color: '#3776AB'
    - icon: 'fab fa-telegram'
      title: 'Telegram Bot API'
      color: '#229ED9'
    - icon: 'fas fa-brain'
      title: 'LLM Scoring Rubric'
      color: '#A855F7'
    - icon: 'fas fa-bullseye'
      title: 'CRM Webhooks'
      color: '#F59E0B'
  deployment:
    titleKey: 'case_deployment_title'
    pKey: 'case_leadhunter_deployment_text'
---

### Архитектурная схема пайплайна агентов

```text
┌─────────────────────────┐          Агрегация входящих          ┌──────────────────────────┐
│   30+ Каналов и Чатов   │ ───────────────────────────────────► │  Stream Collector Engine │
└─────────────────────────┘                                      └────────────┬─────────────┘
                                                                              │ Сырые сигналы
                                                                              ▼
┌─────────────────────────┐          Квалификация лида           ┌──────────────────────────┐
│   RAG Verification Base │ ◄─────────────────────────────────── │   LLM Scoring Engine     │
│   (Кейсы, Сметы, Стеки) │ ───────────────────────────────────► │   (Баллы 0-100 + Safety) │
└─────────────────────────┘          Проверенные аргументы       └────────────┬─────────────┘
                                                                              │
                                                                              ▼
┌─────────────────────────┐          Отправка в 1 клик           ┌──────────────────────────┐
│    CRM Воронка Продаж   │ ◄─────────────────────────────────── │   Shadow Mode Generator  │
│    (Карточка сделки)    │                                      │   (Черновик ответа)      │
└─────────────────────────┘                                      └──────────────────────────┘
```

### Эффективность воронки лидогенерации

| Этап воронки | Ручная обработка | Агент Lead Hunter AI |
| :--- | :--- | :--- |
| **Время реакции на горячий лид** | 15–40 минут (потеря клиента) | **до 2 секунд (мгновенный захват)** |
| **Информационный шум и спам** | 100% ручная фильтрация сейлзом | **85% отсекается LLM-фильтром** |
| **Качество первичного ответа** | Шаблонный опросник | **Глубокий драфт со ссылкой на релевантный кейс** |
