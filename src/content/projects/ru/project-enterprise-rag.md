---
titleKey: 'case_enterpriserag_title'
descriptionKey: 'case_enterpriserag_desc'
ogImage: '/og-image.webp'
clientKey: 'case_enterpriserag_client'
servicesKey: 'case_enterpriserag_services'
year: 2026
featured: true
category: 'ai'
stack: ['Turborepo', 'Bun', 'PostgreSQL 16 / pgvector (HNSW)', 'ONNX Runtime', 'Multi-Provider AI Gateway', 'Postgres SKIP LOCKED Queue']
publishDate: 2026-10-28
heroImage: '../../../assets/images/projects/enterprise-rag/hero.jpeg'
heroImageAlt: 'Enterprise RAG — База знаний на 65 000+ чанков с AI Gateway'
metrics:
  - label: 'Точность выборки'
    value: 'Recall@5 88% / Precision@5 85%'
  - label: 'Скорость векторного поиска'
    value: '3 мс средняя / 4 мс p95'
  - label: 'Общий ответ LLM'
    value: '1.9 с со стримингом'
header:
  titleKey: 'case_enterpriserag_h1'
  descriptionKey: 'case_enterpriserag_desc'
content:
  task:
    titleKey: 'case_task'
    pKey: 'case_enterpriserag_task_p'
  solution:
    titleKey: 'case_solution'
    pKey: 'case_enterpriserag_solution_p'
  keyFeatures:
    titleKey: 'case_key_features'
    listKeys:
      - 'case_enterpriserag_feat_1'
      - 'case_enterpriserag_feat_2'
      - 'case_enterpriserag_feat_3'
      - 'case_enterpriserag_feat_4'
      - 'case_enterpriserag_feat_5'
  techStack:
    - icon: 'fas fa-hamburger'
      title: 'Bun'
      color: '#FBF0DF'
    - icon: 'fas fa-boxes-stacked'
      title: 'Turborepo'
      color: '#EF4444'
    - icon: 'fas fa-database'
      title: 'PostgreSQL 16 + pgvector'
      color: '#4169E1'
    - icon: 'fas fa-microchip'
      title: 'ONNX Local Embeddings'
      color: '#005CED'
    - icon: 'fas fa-network-wired'
      title: 'Multi-Provider AI Gateway'
      color: '#3B82F6'
    - icon: 'fas fa-magnifying-glass'
      title: 'Cross-Encoder Reranker'
      color: '#10B981'
  deployment:
    titleKey: 'case_deployment_title'
    pKey: 'case_enterpriserag_deployment_text'
---

### Схема отказоустойчивого RAG-контура

```text
┌─────────────────────────┐          Запрос сотрудника           ┌──────────────────────────┐
│   Корпоративный портал  │ ───────────────────────────────────► │  ONNX Local Embeddings   │
└────────────▲────────────┘                                      └────────────┬─────────────┘
             │                                                                │ 384-dim Vector
             │ Стриминг ответа с цитатами                                     ▼
┌────────────┴────────────┐     Top-20 Chunks    ┌──────────────────────────────────────────┐
│   AI Gateway Router     │ ◄─────────────────── │   pgvector HNSW (3 мс) + Reranker (88%)  │
│  (Anthropic / OpenAI /  │                      │   (65 798 чанков / 2 393 регламента)     │
│   Google / DeepSeek)    │                      └──────────────────────────────────────────┘
└─────────────────────────┘
 (Failover при 429 / 5xx)
```

### Метрики точности поиска (Recall@K / Precision@K)

| Метод выборки | Recall@5 | Precision@5 | Задержка p95 |
| :--- | :--- | :--- | :--- |
| **Базовый плоский поиск (pgvector IVFFlat)** | 62.4% | 58.1% | 48.0 мс |
| **Индексация HNSW без реранкера** | 76.8% | 71.5% | 3.8 мс |
| **HNSW + Локальный Cross-Encoder Reranker** | **88.2%** | **85.0%** | **4.2 мс** |
