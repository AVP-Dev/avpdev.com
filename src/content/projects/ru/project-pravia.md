---
titleKey: 'case_pravia_title'
descriptionKey: 'case_pravia_desc'
ogImage: '/og-image.webp'
clientKey: 'case_pravia_client'
servicesKey: 'case_pravia_services'
year: 2026
featured: true
category: 'ai'
stack: ['TypeScript', 'Bun', 'PostgreSQL', 'pgvector (HNSW)', 'EmbeddingGemma-300M (ONNX)', 'Drizzle ORM', 'k6']
publishDate: 2026-11-01
heroImage: '../../../assets/images/projects/pravia/hero.webp'
heroImageAlt: 'Pravia — B2B-платформа AI-сотрудников на корпоративных знаниях'
metrics:
  - label: 'Снижение задержки p95'
    value: 'с 19.7 с → 164 мс'
  - label: 'Стресс-тестирование'
    value: '1 000 VU / 46 req/s'
  - label: 'Успешность ответов'
    value: '99.98% без ошибок'
header:
  titleKey: 'case_pravia_h1'
  descriptionKey: 'case_pravia_desc'
content:
  task:
    titleKey: 'case_task'
    pKey: 'case_pravia_task_p'
  solution:
    titleKey: 'case_solution'
    pKey: 'case_pravia_solution_p'
  keyFeatures:
    titleKey: 'case_key_features'
    listKeys:
      - 'case_pravia_feat_1'
      - 'case_pravia_feat_2'
      - 'case_pravia_feat_3'
      - 'case_pravia_feat_4'
      - 'case_pravia_feat_5'
  techStack:
    - icon: 'fab fa-js-square'
      title: 'TypeScript'
      color: '#3178C6'
    - icon: 'fas fa-hamburger'
      title: 'Bun'
      color: '#FBF0DF'
    - icon: 'fas fa-database'
      title: 'PostgreSQL'
      color: '#4169E1'
    - icon: 'fas fa-microchip'
      title: 'ONNX Runtime'
      color: '#005CED'
    - icon: 'fas fa-layer-group'
      title: 'Drizzle ORM'
      color: '#C5F74F'
    - icon: 'fas fa-tachometer-alt'
      title: 'k6 Load Testing'
      color: '#7D64FF'
  deployment:
    titleKey: 'case_deployment_title'
    pKey: 'case_pravia_deployment_text'
---

### Архитектурная схема пайплайна

```text
┌─────────────────────────┐          SSE Streaming          ┌──────────────────────────┐
│   Web / Telegram Chat   │ ◄────────────────────────────── │   Pravia Response Engine │
└────────────┬────────────┘                                 └────────────▲─────────────┘
             │                                                           │
             │ Текст запроса                                             │ Релевантные чанки
             ▼                                                           │
┌─────────────────────────┐     Векторный поиск (3.2мс)     ┌──────────────────┴─────────────┐
│   ONNX Runtime (CPU)    │ ──────────────────────────────► │   PostgreSQL 16 + pgvector     │
│   EmbeddingGemma-300M   │   Zero-Cloud Векторизация       │   HNSW Index (ef_search = 64)  │
└─────────────────────────┘                                 └────────────────────────────────┘
```

### Сравнение задержки под нагрузкой (k6 Benchmarks)

| Метрика | До оптимизации | После тюнинга HNSW и батчинга | Результат |
| :--- | :--- | :--- | :--- |
| **Задержка p95 (300 VU)** | 19.7 с | **164 мс** | **Ускорение в 120 раз** |
| **Пропускная способность (1 000 VU)** | Сбои соединений | **46 req/s (99.98% OK)** | **Стабильность без деградации** |
| **Инфраструктурные затраты** | Внешние embedding API | **Zero-Cloud CPU ONNX** | **Экономия до 90% бюджета** |
