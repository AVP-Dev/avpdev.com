---
titleKey: 'case_postgresqueue_title'
descriptionKey: 'case_postgresqueue_desc'
ogImage: '/og-image.webp'
clientKey: 'case_postgresqueue_client'
servicesKey: 'case_postgresqueue_services'
year: 2026
featured: true
category: 'app'
stack: ['PostgreSQL 16', 'SQL / PL-pgSQL', 'Bun / Node.js', 'Drizzle ORM', 'Docker']
publishDate: 2026-10-24
heroImage: '../../../assets/images/projects/postgres-queue/hero.jpeg'
heroImageAlt: 'Postgres Queue — Отказоустойчивая lean-очередь задач без брокеров'
metrics:
  - label: 'Инфраструктурный стек'
    value: '0 брокеров (Без Redis/RabbitMQ)'
  - label: 'Надежность обработки'
    value: '100% (FOR UPDATE SKIP LOCKED)'
  - label: 'Потребление памяти'
    value: 'Снижение оверхеда на 70%'
header:
  titleKey: 'case_postgresqueue_h1'
  descriptionKey: 'case_postgresqueue_desc'
content:
  task:
    titleKey: 'case_task'
    pKey: 'case_postgresqueue_task_p'
  solution:
    titleKey: 'case_solution'
    pKey: 'case_postgresqueue_solution_p'
  keyFeatures:
    titleKey: 'case_key_features'
    listKeys:
      - 'case_postgresqueue_feat_1'
      - 'case_postgresqueue_feat_2'
      - 'case_postgresqueue_feat_3'
      - 'case_postgresqueue_feat_4'
      - 'case_postgresqueue_feat_5'
  techStack:
    - icon: 'fas fa-database'
      title: 'PostgreSQL 16 Engine'
      color: '#4169E1'
    - icon: 'fas fa-code'
      title: 'SQL / PL-pgSQL'
      color: '#336791'
    - icon: 'fas fa-hamburger'
      title: 'Bun Runtime'
      color: '#FBF0DF'
    - icon: 'fas fa-layer-group'
      title: 'Drizzle ORM'
      color: '#C5F74F'
    - icon: 'fab fa-docker'
      title: 'Docker Deployment'
      color: '#2496ED'
  deployment:
    titleKey: 'case_deployment_title'
    pKey: 'case_postgresqueue_deployment_text'
---

### Схема неблокирующей обработки задач (SKIP LOCKED)

```text
┌──────────────────────────────────────┐          Атомарная транзакция        ┌──────────────────────────────────────┐
│           Business Service           │ ───────────────────────────────────► │             PostgreSQL 16            │
│   (Создание сущности + Постановка)   │     ACID Transactional Outbox        │       Таблица `job_queue`            │
└──────────────────────────────────────┘                                      └──────────────────┬───────────────────┘
                                                                                                 │
                                      FOR UPDATE SKIP LOCKED                                     │ SELECT ... FOR UPDATE
                                      Lock-Free Потоки Воркеров                                  │ SKIP LOCKED LIMIT 10
                                                                                                 ▼
┌──────────────────┐               ┌──────────────────┐               ┌──────────────────┐
│  Worker Thread 1 │               │  Worker Thread 2 │               │  Worker Thread N │
│  (Задачи 1..10)  │               │  (Задачи 11..20) │               │  (Задачи 21..30) │
└────────┬─────────┘               └────────┬─────────┘               └────────┬─────────┘
         │                                  │                                  │
         └──────────────────────────────────┴──────────────────────────────────┘
                                            │
                                            ▼ Ошибки исполнения
                               ┌──────────────────────────┐
                               │ Exponential Backoff      │
                               │ + Dead-Letter Queue (DLQ)│
                               └──────────────────────────┘
```

### Сравнение архитектур очередей задач

| Параметр | Традиционная связка (Redis + BullMQ) | Lean-архитектура на PostgreSQL 16 |
| :--- | :--- | :--- |
| **Инфраструктура** | Отдельный инстанс Redis + Sentinel | **0 дополнительных серверов (внутри PostgreSQL)** |
| **Проблема Dual-Write** | Риск рассинхронизации БД и очереди | **Исключена: строгая ACID-атомарность** |
| **Персистентность при сбоях** | Зависит от тонких настроек AOF/RDB | **100% гарантия сохранности на WAL-диске** |
| **Расход памяти (RAM)** | Дублирование данных в памяти брокера | **Сокращение общего оверхеда RAM на 70%** |
