---
titleKey: 'case_nyxvox_title'
descriptionKey: 'case_nyxvox_desc'
ogImage: '/og-image.webp'
clientKey: 'case_nyxvox_client'
servicesKey: 'case_nyxvox_services'
year: 2026
featured: true
category: 'ai'
stack: ['Rust 2021', 'Tauri 2.10', 'Next.js 16 / React 19', 'cpal (Audio DSP)', 'Groq Whisper Turbo', 'Deepgram Nova', 'Local Whisper (Metal / Core ML)', 'AES-256-GCM']
publishDate: 2026-10-31
heroImage: '../../../assets/images/projects/nyx-vox/hero.webp'
heroImageAlt: 'NYX Vox — Нативный голосовой AI-интерфейс (< 500 мс)'
metrics:
  - label: 'Скорость распознавания'
    value: '< 500 мс'
  - label: 'Отказоустойчивость'
    value: 'Multi-Tier Fallback'
  - label: 'Точность форматирования'
    value: '100% Verbatim'
header:
  titleKey: 'case_nyxvox_h1'
  descriptionKey: 'case_nyxvox_desc'
content:
  task:
    titleKey: 'case_task'
    pKey: 'case_nyxvox_task_p'
  solution:
    titleKey: 'case_solution'
    pKey: 'case_nyxvox_solution_p'
  keyFeatures:
    titleKey: 'case_key_features'
    listKeys:
      - 'case_nyxvox_feat_1'
      - 'case_nyxvox_feat_2'
      - 'case_nyxvox_feat_3'
      - 'case_nyxvox_feat_4'
      - 'case_nyxvox_feat_5'
  techStack:
    - icon: 'fab fa-rust'
      title: 'Rust 2021'
      color: '#DEA584'
    - icon: 'fas fa-cube'
      title: 'Tauri 2.10'
      color: '#FFC131'
    - icon: 'fab fa-react'
      title: 'React 19 / Next.js 16'
      color: '#61DAFB'
    - icon: 'fas fa-microphone-lines'
      title: 'cpal (Audio DSP)'
      color: '#10B981'
    - icon: 'fas fa-wave-square'
      title: 'Whisper STT'
      color: '#8B5CF6'
    - icon: 'fas fa-shield-halved'
      title: 'AES-256-GCM'
      color: '#F59E0B'
  deployment:
    titleKey: 'case_deployment_title'
    pKey: 'case_nyxvox_deployment_text'
---

### Конвейер обработки аудио и вставки текста

```text
┌─────────────────┐       ┌────────────────────────┐       ┌──────────────────────┐
│  Audio Capture  │ ────► │  300ms Pre-Speech FIFO │ ────► │  Smart VAD & Noise   │
│  (Rust / cpal)  │       │  Ring Buffer           │       │  Gate Detection      │
└─────────────────┘       └────────────────────────┘       └──────────┬───────────┘
                                                                      │ Speech Audio
                                                                      ▼
┌─────────────────┐       ┌────────────────────────┐       ┌──────────────────────┐
│  Direct HID     │ ◄──── │  Verbatim AI           │ ◄──── │  STT Cloud Turbo /   │
│  Injection      │       │  Refinement (LLM)      │       │  Local Metal Whisper │
└─────────────────┘       └────────────────────────┘       └──────────────────────┘
 (Accessibility / SendInput)
```

### Сравнение режимов работы

| Параметр | Облачный режим (Groq Turbo) | Локальный режим (Metal / Core ML) |
| :--- | :--- | :--- |
| **Задержка отклика** | **< 500 мс** | **1.2–2.0 с** |
| **Требование к сети** | Минимальный интернет-канал | **0 Кб/с (100% Офлайн)** |
| **Конфиденциальность** | TLS шифрование + Ephemeral | **100% локально на чипе** |
| **Потребление RAM** | ~65 МБ (Tauri 2) | ~320 МБ (включая веса модели) |
