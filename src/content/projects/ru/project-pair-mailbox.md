---
titleKey: 'case_pairmailbox_title'
descriptionKey: 'case_pairmailbox_desc'
ogImage: '/og-image.webp'
clientKey: 'case_pairmailbox_client'
servicesKey: 'case_pairmailbox_services'
year: 2026
featured: true
category: 'ai'
stack: ['TypeScript', 'Node.js', 'Claude Code CLI', 'Codex', 'OpenCode', 'Local IPC & Locking', 'Git / GitHub Actions']
publishDate: 2026-10-30
heroImage: '../../../assets/images/projects/pair-mailbox/hero.webp'
heroImageAlt: 'Pair Mailbox — Автономный протокол парного кодинга для AI-CLI'
metrics:
  - label: 'Автономность цикла'
    value: '100% от задачи до PR'
  - label: 'Защита целостности'
    value: 'Single-Writer Guard'
  - label: 'Внешние зависимости'
    value: '0 (Zero Dependencies)'
header:
  titleKey: 'case_pairmailbox_h1'
  descriptionKey: 'case_pairmailbox_desc'
content:
  task:
    titleKey: 'case_task'
    pKey: 'case_pairmailbox_task_p'
  solution:
    titleKey: 'case_solution'
    pKey: 'case_pairmailbox_solution_p'
  keyFeatures:
    titleKey: 'case_key_features'
    listKeys:
      - 'case_pairmailbox_feat_1'
      - 'case_pairmailbox_feat_2'
      - 'case_pairmailbox_feat_3'
      - 'case_pairmailbox_feat_4'
      - 'case_pairmailbox_feat_5'
  techStack:
    - icon: 'fab fa-js-square'
      title: 'TypeScript'
      color: '#3178C6'
    - icon: 'fab fa-node-js'
      title: 'Node.js'
      color: '#68A063'
    - icon: 'fas fa-robot'
      title: 'AI Multi-Agent'
      color: '#8B5CF6'
    - icon: 'fas fa-terminal'
      title: 'CLI Supervisor'
      color: '#10B981'
    - icon: 'fab fa-git-alt'
      title: 'Git Protocol'
      color: '#F05032'
  deployment:
    titleKey: 'case_deployment_title'
    pKey: 'case_pairmailbox_deployment_text'
---

### Протокол взаимодействия агентов (State Diagram)

```text
       ┌────────────────────────┐
       │     Task Ticket        │
       └───────────┬────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐       Structured Patches      ┌──────────────────────────────────────┐
│            Writer Agent              │ ────────────────────────────► │           Reviewer Agent             │
│   (Write Authority: Files & Tests)   │ ◄──────────────────────────── │      (Read-Only: Architecture Audit) │
└──────────────────┬───────────────────┘       Critique & Approval     └──────────────────┬───────────────────┘
                   │                                                                      │
                   │                                                                      │
                   ▼                                                                      ▼
       ┌──────────────────────────────────────────────────────────────────────────────────────┐
       │                     Immutable Audit Mailbox Log (Single-Writer Guard)                │
       └──────────────────────────────────────────┬───────────────────────────────────────────┘
                                                  │
                                                  ▼ Tests Pass & Approved
                                     ┌─────────────────────────┐
                                     │  Clean Pull Request     │
                                     └─────────────────────────┘
```

### Уровни автономности супервизора

| Режим | Поведение агентов | Зона ответственности человека |
| :--- | :--- | :--- |
| **`observe`** | Агенты готовят диффы и ревью | Ручное подтверждение каждого шага |
| **`semi`** | Автономный кодинг и локальные тесты | Пауза перед деплоем, миграциями и секретами |
| **`auto`** | **100% сквозной цикл от тикета до PR** | Финальный мердж в GitHub |
