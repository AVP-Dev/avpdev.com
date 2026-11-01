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
heroImageAlt: 'Pair Mailbox — Autonomous Multi-Agent Coding Protocol'
metrics:
  - label: 'Autonomous Pipeline'
    value: '100% Ticket to PR'
  - label: 'Integrity Guard'
    value: 'Single-Writer Lock'
  - label: 'External Dependencies'
    value: '0 (Zero Deps)'
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

### Multi-Agent State Protocol

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
                                                  ▼ All Tests Pass & Approved
                                     ┌─────────────────────────┐
                                     │  Clean Pull Request     │
                                     └─────────────────────────┘
```

### Autonomy Guardrails

| Mode | Agent Behavior | Human Engineering Boundary |
| :--- | :--- | :--- |
| **`observe`** | Generates proposed diffs and critique | Explicit manual sign-off on every action |
| **`semi`** | Autonomous edits and unit test runs | Human approval before migrations, secrets, or deploys |
| **`auto`** | **100% autonomous from issue to green PR** | Final merge button in GitHub |
