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
heroImageAlt: 'NYX Vox — Native Desktop AI Voice Interface (< 500ms)'
metrics:
  - label: 'Transcription Speed'
    value: '< 500ms'
  - label: 'Fault Tolerance'
    value: 'Multi-Tier Fallback'
  - label: 'Formatting Fidelity'
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

### Audio Pipeline & Caret Injection Architecture

```text
┌─────────────────┐       ┌────────────────────────┐       ┌──────────────────────┐
│  Audio Capture  │ ────► │  300ms Pre-Speech FIFO │ ────► │  Smart VAD & Noise   │
│  (Rust / cpal)  │       │  Ring Buffer           │       │  Gate Detection      │
└─────────────────┘       └────────────────────────┘       └──────────┬───────────┘
                                                                      │ Clean Audio
                                                                      ▼
┌─────────────────┐       ┌────────────────────────┐       ┌──────────────────────┐
│  Direct HID     │ ◄──── │  Verbatim AI           │ ◄──── │  STT Cloud Turbo /   │
│  Injection      │       │  Refinement (LLM)      │       │  Local Metal Whisper │
└─────────────────┘       └────────────────────────┘       └──────────────────────┘
 (Accessibility / SendInput)
```

### Operational Modes

| Dimension | Cloud LPU (Groq Turbo) | On-Device Local (Metal / Core ML) |
| :--- | :--- | :--- |
| **Response Latency** | **< 500ms** | **1.2–2.0s** |
| **Connectivity** | Standard broadband | **0 KB/s (100% Air-Gapped)** |
| **Security & Privacy** | Ephemeral memory, zero logging | **100% on-device neural execution** |
| **RAM Footprint** | ~65 MB (Tauri 2) | ~320 MB (inclusive of model weights) |
