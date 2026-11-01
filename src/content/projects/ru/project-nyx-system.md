---
titleKey: 'case_nyxsystem_title'
descriptionKey: 'case_nyxsystem_desc'
ogImage: '/og-image.webp'
clientKey: 'case_nyxsystem_client'
servicesKey: 'case_nyxsystem_services'
year: 2026
featured: true
category: 'crm-erp'
stack: ['Go', 'PostgreSQL 16', 'OpenAPI / Swagger', 'JSONB Schema Extensions', 'Docker', 'Linux']
publishDate: 2026-10-29
heroImage: '../../../assets/images/projects/nyx-system/hero.webp'
heroImageAlt: 'NYX System — Мультитенантная платформа ERP / CRM / MES для промышленности'
metrics:
  - label: 'Скорость отклика'
    value: '< 0.1 с между офисом и цехом'
  - label: 'Учет данных'
    value: '100% Immutability (Сторно)'
  - label: 'Безопасность клиентов'
    value: 'Режим Privacy (Обезличенные заказы)'
header:
  titleKey: 'case_nyxsystem_h1'
  descriptionKey: 'case_nyxsystem_desc'
content:
  task:
    titleKey: 'case_task'
    pKey: 'case_nyxsystem_task_p'
  solution:
    titleKey: 'case_solution'
    pKey: 'case_nyxsystem_solution_p'
  keyFeatures:
    titleKey: 'case_key_features'
    listKeys:
      - 'case_nyxsystem_feat_1'
      - 'case_nyxsystem_feat_2'
      - 'case_nyxsystem_feat_3'
      - 'case_nyxsystem_feat_4'
      - 'case_nyxsystem_feat_5'
  techStack:
    - icon: 'fab fa-golang'
      title: 'Go Clean Architecture'
      color: '#00ADD8'
    - icon: 'fas fa-database'
      title: 'PostgreSQL 16'
      color: '#4169E1'
    - icon: 'fas fa-file-contract'
      title: 'OpenAPI Contract-First'
      color: '#85EA2D'
    - icon: 'fas fa-sitemap'
      title: 'Multi-Tenant Isolation'
      color: '#A855F7'
    - icon: 'fab fa-docker'
      title: 'Docker Swarm'
      color: '#2496ED'
  deployment:
    titleKey: 'case_deployment_title'
    pKey: 'case_nyxsystem_deployment_text'
---

### Архитектурная схема разделения контуров

```text
┌──────────────────────────────────────┐       Contract-First API       ┌──────────────────────────────────────┐
│       Management ERP Dashboard       │ ────────────────────────────►  │           Go Core Backend            │
│   (Финансы, Аналитика, Контрагенты)  │ ◄────────────────────────────  │       (Clean Architecture)           │
└──────────────────────────────────────┘                                └──────────────────┬───────────────────┘
                                                                                           │
┌──────────────────────────────────────┐       Privacy Mode (< 0.1s)                       │
│        Shop-Floor PWA Terminal       │ ◄─────────────────────────────────────────────────┤
│    (Обезличенные заказы #ORD-404)    │                                                   │
└──────────────────────────────────────┘                                                   ▼
                                                                        ┌──────────────────────────────────────┐
                                                                        │           PostgreSQL 16              │
                                                                        │  (RLS Multi-Tenancy + Storno Ledger) │
                                                                        └──────────────────────────────────────┘
```

### Безопасность и целостность данных

| Сценарий | Традиционные системы | NYX System |
| :--- | :--- | :--- |
| **Ошибочный выпуск партии** | Прямое удаление/правка строки (риск хищений) | **Только сторнирующая корректировка с фиксацией автора** |
| **Работа в цеху** | Видны имена заказчиков и цены | **Режим Privacy: операторы видят лишь технологические карты** |
| **Увольнение менеджера** | Риск саботажа и удаления сделок | **Soft Delete: безвозвратное удаление заблокировано** |
