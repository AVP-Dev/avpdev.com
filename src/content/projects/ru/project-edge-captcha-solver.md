---
titleKey: 'case_edgecaptcha_title'
descriptionKey: 'case_edgecaptcha_desc'
ogImage: '/og-image.webp'
clientKey: 'case_edgecaptcha_client'
servicesKey: 'case_edgecaptcha_services'
year: 2026
featured: true
category: 'ai'
stack: ['Python', 'PyTorch', 'ResNet-18 + Squeeze-and-Excitation', 'ONNX Runtime (CPU)', 'FastAPI', 'Chrome Extension / Playwright']
publishDate: 2026-10-27
heroImage: '../../../assets/images/projects/edge-captcha-solver/hero.jpeg'
heroImageAlt: 'Edge ML Captcha Solver — Замена Vision-LLM локальной нейросетью ResNet-18'
metrics:
  - label: 'Ускорение инференса'
    value: 'в 800 раз (3.5 мс вместо ~3 с)'
  - label: 'Точность Exact Match'
    value: 'с 30.2% → 75.0%'
  - label: 'Себестоимость запроса'
    value: '0$ (локальный CPU)'
header:
  titleKey: 'case_edgecaptcha_h1'
  descriptionKey: 'case_edgecaptcha_desc'
content:
  task:
    titleKey: 'case_task'
    pKey: 'case_edgecaptcha_task_p'
  solution:
    titleKey: 'case_solution'
    pKey: 'case_edgecaptcha_solution_p'
  keyFeatures:
    titleKey: 'case_key_features'
    listKeys:
      - 'case_edgecaptcha_feat_1'
      - 'case_edgecaptcha_feat_2'
      - 'case_edgecaptcha_feat_3'
      - 'case_edgecaptcha_feat_4'
      - 'case_edgecaptcha_feat_5'
  techStack:
    - icon: 'fab fa-python'
      title: 'Python'
      color: '#3776AB'
    - icon: 'fas fa-fire'
      title: 'PyTorch'
      color: '#EE4C2C'
    - icon: 'fas fa-eye'
      title: 'ResNet-18 + SE'
      color: '#8B5CF6'
    - icon: 'fas fa-microchip'
      title: 'ONNX Runtime CPU'
      color: '#005CED'
    - icon: 'fas fa-bolt'
      title: 'FastAPI'
      color: '#009688'
  deployment:
    titleKey: 'case_deployment_title'
    pKey: 'case_edgecaptcha_deployment_text'
---

### Конвейер инференса компьютерного зрения

```text
┌─────────────────────────┐          Перехват капчи           ┌──────────────────────────┐
│    Chrome / Playwright  │ ────────────────────────────────► │     FastAPI Service      │
│    Scraper Worker       │ ◄──────────────────────────────── │  (Нарезка плиток 3x3)    │
└─────────────────────────┘          Координаты клика         └────────────┬─────────────┘
                                                                           │ Нарезка 9 тайлов
                                                                           ▼
                                                              ┌──────────────────────────┐
                                                              │  ONNX Runtime (AVX-512)  │
                                                              │  ResNet-18 + SE (CPU)    │
                                                              │  Задержка: 3.5 мс / тайл │
                                                              └──────────────────────────┘
```

### Сравнение с облачной Vision-LLM

| Параметр | Исходное решение (Vision-LLM) | Локальная нейросеть (ResNet-18 + SE) | Выигрыш |
| :--- | :--- | :--- | :--- |
| **Точность (Exact Match)** | 30.2% | **75.0%** | **Рост в 2.5 раза** |
| **Время решения 1 ячейки** | ~3 000 мс | **3.5–4.0 мс** | **Ускорение в ~800 раз** |
| **Вычислительная база** | Облачный API с оплатой токенов | **Локальный CPU (AVX2/AVX-512)** | **0$ затрат на вызовы** |
| **Автономность** | Зависимость от сети и блокировок | **100% локальный контур** | **0 сетевых отказов** |
