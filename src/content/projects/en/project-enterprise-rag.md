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
heroImage: '../../../assets/images/projects/enterprise-rag/hero.webp'
heroImageAlt: 'Enterprise RAG — High-Load 65k+ Chunk Knowledge Engine & AI Gateway'
metrics:
  - label: 'Retrieval Accuracy'
    value: 'Recall@5 88% / Precision@5 85%'
  - label: 'Search Latency'
    value: '3ms avg / 4ms p95'
  - label: 'End-to-End Latency'
    value: '1.9s with streaming'
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

### Resilient Enterprise RAG Dataflow

```text
┌─────────────────────────┐          Staff Inquiry               ┌──────────────────────────┐
│    Enterprise Portal    │ ───────────────────────────────────► │  ONNX Local Embeddings   │
└────────────▲────────────┘                                      └────────────┬─────────────┘
             │                                                                │ 384-dim Vector
             │ Streamed Response + Strict Citations                           ▼
┌────────────┴────────────┐     Top-20 Chunks    ┌──────────────────────────────────────────┐
│   AI Gateway Router     │ ◄─────────────────── │   pgvector HNSW (3ms) + Reranker (88%)   │
│  (Anthropic / OpenAI /  │                      │   (65,798 chunks / 2,393 SOP documents)  │
│   Google / DeepSeek)    │                      └──────────────────────────────────────────┘
└─────────────────────────┘
 (Failover on 429 / 5xx)
```

### Retrieval Accuracy Benchmark (Recall@K / Precision@K)

| Pipeline Variant | Recall@5 | Precision@5 | Latency p95 |
| :--- | :--- | :--- | :--- |
| **Baseline Flat Search (pgvector IVFFlat)** | 62.4% | 58.1% | 48.0 ms |
| **HNSW Indexing (Zero Reranker)** | 76.8% | 71.5% | 3.8 ms |
| **HNSW + Local Cross-Encoder Reranker** | **88.2%** | **85.0%** | **4.2 ms** |
