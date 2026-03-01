export interface GeoContentData {
  title: string;
  description: string;
  h1: string;
  p: string;
  benefits?: { icon: string; title: string; desc: string }[];
  faq?: { q: string; a: string }[];
}

export const geoContent: Record<string, Record<string, GeoContentData>> = {
  'minsk': {
    'ru': {
      title: 'Создание сайтов в Минске | ПРОфессиональная веб-разработка',
      description: 'Заказать разработку сайта в Минске. Быстрые, современные и продающие сайты. AVPdev – ваш надежный ИТ партнер в Беларуси.',
      h1: 'Разработка сайтов и Web-Apps в Минске',
      p: 'Ищете надежного партнера для создания веб-сервиса в столице Беларуси? Мы предлагаем полный спектр услуг: от быстрых лендингов до сложных корпоративных порталов на Astro и Next.js, а также разработку парсеров и ботов.',
      benefits: [
        { icon: 'fa-rocket', title: 'Высокая конверсия и Скорость', desc: 'Проектируем UX/UI с фокусом на продажи и гарантируем мгновенную загрузку благодаря современному стеку.' },
        { icon: 'fa-robot', title: 'Индивидуальные решения', desc: 'Автоматизируем ваш бизнес с помощью нестандартных решений: кастомные Telegram-боты и системы веб-скрапинга.' }
      ],
      faq: [
        { q: 'Возможна ли разработка не просто сайта, а сложного веб-приложения?', a: 'Да, мы специализируемся на высоконагруженных Web-приложениях уровня Enterprise, базах данных и API-интеграциях.' },
        { q: 'Как происходит оценка стоимости разработки?', a: 'Каждый проект уникален. Итоговая стоимость формируется после глубокой оценки технического задания или серии брифингов.' }
      ]
    },
    'en': {
      title: 'Website Development in Minsk | Full-Stack Web Services',
      description: 'Order website development in Minsk. We create fast, modern, and complex web apps for business. Full-cycle services from AVPdev.',
      h1: 'Web & App Development in Minsk',
      p: 'Looking for a reliable tech partner in Belarus? We offer a full range of web development services in Minsk, from fast corporate portals on Astro to complex SaaS platforms on Next.js, including bots and scrapers.',
      benefits: [
        { icon: 'fa-rocket', title: 'High Conversion & Speed', desc: 'We design UX/UI focusing on sales and guarantee instant load times backed by our modern tech stack.' },
        { icon: 'fa-robot', title: 'Custom Automation', desc: 'We automate your business workflows using custom solutions like Telegram bots and advanced web scraping systems.' }
      ],
      faq: [
        { q: 'Do you build complex web applications, not just websites?', a: 'Yes, we specialize in high-load Enterprise Web applications, complex databases, and robust API integrations.' },
        { q: 'How do you estimate development costs?', a: 'Every project is unique. Final pricing is established after a thorough evaluation of your technical specifications and requirements.' }
      ]
    }
  },
  'gomel': {
    'ru': {
      title: 'Разработка сайтов в Гомеле | Локальное IT-решение для бизнеса',
      description: 'Создание продающих сайтов в Гомеле. Разрабатываем веб-приложения, боты и сложные B2B порталы для предприятий.',
      h1: 'Web-студия AVPdev в Гомеле',
      p: 'Гомельский бизнес требует современных подходов. Мы специализируемся на разработке веб-приложений, парсеров и корпоративных платформ, которые решают сложные технические задачи вашего бизнеса.',
      benefits: [
        { icon: 'fa-cubes', title: 'Широкий технологический стек', desc: 'Мы разрабатываем не только сайты, но и веб-приложения на Next.js, быстрые порталы на Astro, а также ботов и скрипты сбора данных.' },
        { icon: 'fa-industry', title: 'Фокус на В2В и логистику', desc: 'Учитываем специфику промышленного региона, создавая платформы для заводов, логистики и ритейла.' }
      ],
      faq: [
        { q: 'Возможна ли разработка кастомного парсера на заказ?', a: 'Да, мы специализируемся на создании высоконагруженных скриптов и парсеров для автоматического сбора данных из любых источников.' },
        { q: 'Как оценивается бюджет проекта?', a: 'Стоимость зависит исключительно от объема работ и выбранного технологического стека. Мы предоставляем прозрачную смету после изучения задачи.' }
      ]
    },
    'en': {
      title: 'Web Development in Gomel | Custom IT Solutions',
      description: 'Creating high-converting websites in Gomel. We develop web apps, bots, and complex B2B portals for Gomel enterprises.',
      h1: 'AVPdev Web Studio in Gomel',
      p: 'Gomel businesses require modern approaches. We specialize in developing web applications, scrapers, and corporate platforms that solve your difficult technical challenges locally and internationally.',
      benefits: [
        { icon: 'fa-cubes', title: 'Modern Tech Stack', desc: 'We build more than just sites. We engineer complex web applications on Next.js, lightning-fast portals on Astro, along with bots and scrapers.' },
        { icon: 'fa-industry', title: 'B2B & Manufacturing Focus', desc: 'We understand the industrial specificities of the region, creating robust platforms for manufacturing and logistics.' }
      ],
      faq: [
        { q: 'Is it possible to order a custom data scraper?', a: 'Yes, we specialize in creating custom high-load scripts and scrapers for automated data extraction from diverse sources.' },
        { q: 'How is the project budget estimated?', a: 'Pricing depends entirely on the scope of work and the chosen technology stack. We provide a transparent quote after analyzing the task.' }
      ]
    }
  },
  'mogilev': {
    'ru': {
      title: 'Создание сайтов в Могилеве | Веб-студия AVPdev',
      description: 'Профессиональная разработка сайтов в Могилеве. Создаем эффективные веб-решения для локального бизнеса. Гарантия качества и соблюдение сроков.',
      h1: 'Разработка сайтов в Могилеве',
      p: 'Наша команда предлагает услуги по созданию сайтов в Могилеве. Мы помогаем компаниям укрепить свое присутствие в интернете и привлечь новых клиентов.'
    },
    'en': {
      title: 'Web Development in Mogilev | AVPdev Web Studio',
      description: 'Professional website development in Mogilev. We create effective web solutions for local businesses. Quality assurance and timely delivery.',
      h1: 'Website Development in Mogilev',
      p: 'Our team offers website creation services in Mogilev. We help companies strengthen their online presence and attract new customers.'
    }
  },
  'vitebsk': {
    'ru': {
      title: 'Разработка сайтов в Витебске | Заказать создание сайта',
      description: 'Услуги по созданию сайтов в Витебске. Разрабатываем лендинги, корпоративные сайты и интернет-магазины. Индивидуальный подход к каждому проекту.',
      h1: 'Создание сайтов в Витебске',
      p: 'Ищете разработчиков в Витебске? Мы готовы предложить вам современные и функциональные решения, которые помогут вашему бизнесу расти.'
    },
    'en': {
      title: 'Website Development in Vitebsk | Order Website Creation',
      description: 'Website development services in Vitebsk. We develop landing pages, corporate websites, and online stores. Individual approach to each project.',
      h1: 'Website Creation in Vitebsk',
      p: 'Looking for developers in Vitebsk? We are ready to offer you modern and functional solutions that will help your business grow.'
    }
  },
  'grodno': {
    'ru': {
      title: 'Создание сайтов в Гродно | Профессиональные веб-услуги',
      description: 'Разработка и поддержка сайтов в Гродно. Поможем вашему бизнесу стать заметнее в цифровом пространстве. Качественные сайты по доступным ценам.',
      h1: 'Разработка сайтов в Гродно',
      p: 'Предлагаем полный цикл разработки сайтов в Гродно. От анализа ниши до запуска и поддержки – мы ваш надежный IT-партнер.'
    },
    'en': {
      title: 'Website Development in Grodno | Professional Web Services',
      description: 'Development and support of websites in Grodno. We will help your business become more visible in the digital space. Quality websites at affordable prices.',
      h1: 'Web Development in Grodno',
      p: 'We offer a full cycle of website development in Grodno. From niche analysis to launch and support – we are your reliable IT partner.'
    }
  },
  'brest': {
    'ru': {
      title: 'Разработка сайтов в Бресте | Создание бизнес-сайтов',
      description: 'Заказать сайт в Бресте. Наша команда специализируется на создании сайтов, которые приносят результат. Современный дизайн и оптимизация под SEO.',
      h1: 'Создание сайтов в Бресте',
      p: 'AVPdev предлагает услуги по разработке сайтов в Бресте для компаний любого масштаба. Повысьте свою конкурентоспособность с помощью качественного веб-сайта.'
    },
    'en': {
      title: 'Web Development in Brest | Business Website Creation',
      description: 'Order a website in Brest. Our team specializes in creating websites that deliver results. Modern design and SEO optimization.',
      h1: 'Website Creation in Brest',
      p: 'AVPdev offers website development services in Brest for companies of all sizes. Increase your competitiveness with a quality website.'
    }
  },
  'bobruisk': {
    'ru': {
      title: 'Создание сайтов в Бобруйске | Веб-разработка',
      description: 'Профессиональные услуги по созданию сайтов в Бобруйске. Разрабатываем сайты, которые помогают бизнесу расти и привлекать клиентов.',
      h1: 'Разработка сайтов в Бобруйске',
      p: 'Хотите заказать сайт для вашего бизнеса в Бобруйске? Мы предлагаем надежные и эффективные решения, адаптированные под ваши цели.'
    },
    'en': {
      title: 'Website Creation in Bobruisk | Web Development',
      description: 'Professional website creation services in Bobruisk. We develop websites that help businesses grow and attract customers.',
      h1: 'Web Development in Bobruisk',
      p: 'Want to order a website for your business in Bobruisk? We offer reliable and effective solutions tailored to your goals.'
    }
  },
  'baranovichi': {
    'ru': {
      title: 'Разработка сайтов в Барановичах | Заказать сайт',
      description: 'Создание и продвижение сайтов в Барановичах. Индивидуальный подход и современные технологии для вашего бизнеса.',
      h1: 'Создание сайтов в Барановичах',
      p: 'Мы помогаем компаниям в Барановичах создавать мощные онлайн-платформы для взаимодействия с клиентами и увеличения продаж.'
    },
    'en': {
      title: 'Website Development in Baranovichi | Order a Website',
      description: 'Creation and promotion of websites in Baranovichi. Individual approach and modern technologies for your business.',
      h1: 'Website Creation in Baranovichi',
      p: 'We help companies in Baranovichi create powerful online platforms to interact with customers and increase sales.'
    }
  },
  'borisov': {
    'ru': {
      title: 'Создание сайтов в Борисове | Услуги веб-разработки',
      description: 'Нужен сайт в Борисове? Мы предлагаем полный спектр услуг по разработке, от простых сайтов-визиток до сложных порталов.',
      h1: 'Разработка сайтов в Борисове',
      p: 'Наша студия предоставляет профессиональные услуги по созданию сайтов в Борисове. Мы гарантируем высокое качество и результат.'
    },
    'en': {
      title: 'Website Creation in Borisov | Web Development Services',
      description: 'Need a website in Borisov? We offer a full range of development services, from simple business card sites to complex portals.',
      h1: 'Web Development in Borisov',
      p: 'Our studio provides professional website creation services in Borisov. We guarantee high quality and results.'
    }
  },
  'pinsk': {
    'ru': {
      title: 'Разработка сайтов в Пинске | Создать сайт для бизнеса',
      description: 'Услуги по созданию сайтов в Пинске. Поможем вашему бизнесу выделиться на фоне конкурентов с помощью качественного сайта.',
      h1: 'Создание сайтов в Пинске',
      p: 'Профессиональная веб-разработка в Пинске. Мы создаем сайты, которые работают на вас 24/7, привлекая новых клиентов.'
    },
    'en': {
      title: 'Website Development in Pinsk | Create a Business Website',
      description: 'Website creation services in Pinsk. We will help your business stand out from the competition with a quality website.',
      h1: 'Website Creation in Pinsk',
      p: 'Professional web development in Pinsk. We create websites that work for you 24/7, attracting new customers.'
    }
  },
  'orsha': {
    'ru': {
      title: 'Создание сайтов в Орше | Веб-разработка под ключ',
      description: 'Заказать разработку сайта в Орше. Мы предлагаем комплексные решения для вашего бизнеса, включая дизайн, разработку и поддержку.',
      h1: 'Разработка сайтов в Орше',
      p: 'Развивайте свой бизнес в Орше с помощью профессионального веб-сайта от нашей команды. Мы знаем, как создать эффективный онлайн-инструмент.'
    },
    'en': {
      title: 'Website Creation in Orsha | Turnkey Web Development',
      description: 'Order website development in Orsha. We offer comprehensive solutions for your business, including design, development, and support.',
      h1: 'Web Development in Orsha',
      p: 'Grow your business in Orsha with a professional website from our team. We know how to create an effective online tool.'
    }
  },
  'mozyr': {
    'ru': {
      title: 'Разработка сайтов в Мозыре | Создание сайтов',
      description: 'Ищете, где заказать сайт в Мозыре? Наша команда готова предложить вам качественные и современные решения по доступной цене.',
      h1: 'Создание сайтов в Мозыре',
      p: 'Мы предлагаем услуги по созданию сайтов в Мозыре, которые помогут вам укрепить свои позиции на рынке и привлечь целевую аудиторию.'
    },
    'en': {
      title: 'Website Development in Mozyr | Website Creation',
      description: 'Looking for where to order a website in Mozyr? Our team is ready to offer you high-quality and modern solutions at an affordable price.',
      h1: 'Website Creation in Mozyr',
      p: 'We offer website creation services in Mozyr that will help you strengthen your market position and attract your target audience.'
    }
  },
  'lida': {
    'ru': {
      title: 'Создание сайтов в Лиде | Веб-студия',
      description: 'Профессиональная разработка сайтов в Лиде. Создаем быстрые, адаптивные и красивые сайты для вашего бизнеса.',
      h1: 'Разработка сайтов в Лиде',
      p: 'Наша веб-студия предлагает полный спектр услуг по созданию сайтов в Лиде. Доверьте свой проект профессионалам.'
    },
    'en': {
      title: 'Website Creation in Lida | Web Studio',
      description: 'Professional website development in Lida. We create fast, responsive, and beautiful websites for your business.',
      h1: 'Web Development in Lida',
      p: 'Our web studio offers a full range of website creation services in Lida. Entrust your project to professionals.'
    }
  },
  'soligorsk': {
    'ru': {
      title: 'Разработка сайтов в Солигорске | Заказать сайт',
      description: 'Создание сайтов для бизнеса в Солигорске. Мы предлагаем индивидуальные решения, которые помогут вам достичь ваших целей.',
      h1: 'Создание сайтов в Солигорске',
      p: 'Хотите укрепить свое присутствие в интернете? Мы поможем вам создать качественный сайт в Солигорске, который будет привлекать клиентов.'
    },
    'en': {
      title: 'Website Development in Soligorsk | Order a Website',
      description: 'Creating websites for business in Soligorsk. We offer customized solutions to help you achieve your goals.',
      h1: 'Website Creation in Soligorsk',
      p: 'Want to strengthen your online presence? We will help you create a quality website in Soligorsk that will attract customers.'
    }
  },
  'novopolotsk': {
    'ru': {
      title: 'Создание сайтов в Новополоцке | Веб-разработка',
      description: 'Услуги по разработке сайтов в Новополоцке. Создаем современные веб-решения, которые работают на результат.',
      h1: 'Разработка сайтов в Новополоцке',
      p: 'Наша команда специализируется на создании сайтов для бизнеса в Новополоцке. Мы знаем, как сделать ваш сайт эффективным инструментом продаж.'
    },
    'en': {
      title: 'Website Creation in Novopolotsk | Web Development',
      description: 'Website development services in Novopolotsk. We create modern web solutions that work for results.',
      h1: 'Web Development in Novopolotsk',
      p: 'Our team specializes in creating websites for businesses in Novopolotsk. We know how to make your website an effective sales tool.'
    }
  },
  'molodechno': {
    'ru': {
      title: 'Разработка сайтов в Молодечно | Создать сайт',
      description: 'Профессиональное создание сайтов в Молодечно. Мы предлагаем качественные и доступные решения для малого и среднего бизнеса.',
      h1: 'Создание сайтов в Молодечно',
      p: 'Ищете надежных разработчиков в Молодечно? Наша команда готова воплотить ваши идеи в жизнь и создать сайт, который будет работать на вас.'
    },
    'en': {
      title: 'Website Development in Molodechno | Create a Website',
      description: 'Professional website creation in Molodechno. We offer high-quality and affordable solutions for small and medium-sized businesses.',
      h1: 'Website Creation in Molodechno',
      p: 'Looking for reliable developers in Molodechno? Our team is ready to bring your ideas to life and create a website that will work for you.'
    }
  },
  'polotsk': {
    'ru': {
      title: 'Создание сайтов в Полоцке | Веб-разработка',
      description: 'Разработка сайтов в древнейшем городе Беларуси. Мы предлагаем создание современных сайтов в Полоцке для вашего бизнеса.',
      h1: 'Разработка сайтов в Полоцке',
      p: 'Укрепите свои позиции на рынке Полоцка с помощью профессионального сайта. Мы создаем решения, которые привлекают внимание и клиентов.'
    },
    'en': {
      title: 'Website Creation in Polotsk | Web Development',
      description: 'Website development in the oldest city of Belarus. We offer the creation of modern websites in Polotsk for your business.',
      h1: 'Web Development in Polotsk',
      p: 'Strengthen your market position in Polotsk with a professional website. We create solutions that attract attention and customers.'
    }
  },
  'zhlobin': {
    'ru': {
      title: 'Разработка сайтов в Жлобине | Создание бизнес-сайтов',
      description: 'Нужен сайт в Жлобине? Мы предлагаем услуги по созданию качественных и функциональных сайтов для местного бизнеса.',
      h1: 'Создание сайтов в Жлобине',
      p: 'Наша команда поможет вам создать профессиональный сайт в Жлобине, который станет эффективным инструментом для вашего бизнеса.'
    },
    'en': {
      title: 'Web Development in Zhlobin | Business Website Creation',
      description: 'Need a website in Zhlobin? We offer services for creating high-quality and functional websites for local businesses.',
      h1: 'Website Creation in Zhlobin',
      p: 'Our team will help you create a professional website in Zhlobin that will become an effective tool for your business.'
    }
  },
  'rechitsa': {
    'ru': {
      title: 'Создание сайтов в Речице | Веб-студия AVPdev',
      description: 'Профессиональная разработка сайтов в Речице. Создаем сайты, которые помогают бизнесу расти и развиваться.',
      h1: 'Разработка сайтов в Речице',
      p: 'Предлагаем услуги по созданию сайтов в Речице. Мы знаем, как сделать ваш сайт привлекательным для клиентов и поисковых систем.'
    },
    'en': {
      title: 'Web Development in Rechitsa | AVPdev Web Studio',
      description: 'Professional website development in Rechitsa. We create websites that help businesses grow and develop.',
      h1: 'Website Development in Rechitsa',
      p: 'We offer website creation services in Rechitsa. We know how to make your website attractive to customers and search engines.'
    }
  },
  'svetlogorsk': {
    'ru': {
      title: 'Разработка сайтов в Светлогорске | Заказать сайт',
      description: 'Создание сайтов в Светлогорске. Мы предлагаем полный цикл услуг по веб-разработке для вашего бизнеса.',
      h1: 'Создание сайтов в Светлогорске',
      p: 'Ищете профессионалов для создания сайта в Светлогорске? Наша команда готова предложить вам лучшие решения.'
    },
    'en': {
      title: 'Website Development in Svetlogorsk | Order a Website',
      description: 'Website creation in Svetlogorsk. We offer a full cycle of web development services for your business.',
      h1: 'Website Creation in Svetlogorsk',
      p: 'Looking for professionals to create a website in Svetlogorsk? Our team is ready to offer you the best solutions.'
    }
  },
  'slutsk': {
    'ru': {
      title: 'Создание сайтов в Слуцке | Профессиональная разработка',
      description: 'Разработка сайтов в Слуцке. Создаем эффективные и современные сайты, которые помогут вашему бизнесу достичь новых высот.',
      h1: 'Разработка сайтов в Слуцке',
      p: 'Наша команда предлагает услуги по созданию сайтов в Слуцке. Мы гарантируем индивидуальный подход и высокое качество.'
    },
    'en': {
      title: 'Website Creation in Slutsk | Professional Development',
      description: 'Website development in Slutsk. We create effective and modern websites that will help your business reach new heights.',
      h1: 'Web Development in Slutsk',
      p: 'Our team offers website creation services in Slutsk. We guarantee an individual approach and high quality.'
    }
  },
  'kobrin': {
    'ru': {
      title: 'Разработка сайтов в Кобрине | Создание сайтов',
      description: 'Нужен сайт в Кобрине? Мы предлагаем профессиональные услуги по созданию сайтов, которые будут работать на вас.',
      h1: 'Создание сайтов в Кобрине',
      p: 'Создайте свой успешный онлайн-проект в Кобрине вместе с нами. Мы предлагаем качественные и доступные решения.'
    },
    'en': {
      title: 'Website Development in Kobrin | Website Creation',
      description: 'Need a website in Kobrin? We offer professional website creation services that will work for you.',
      h1: 'Website Creation in Kobrin',
      p: 'Create your successful online project in Kobrin with us. We offer high-quality and affordable solutions.'
    }
  },
  'slonim': {
    'ru': {
      title: 'Создание сайтов в Слониме | Веб-разработка',
      description: 'Услуги по созданию сайтов в Слониме. Разрабатываем проекты любой сложности, от визиток до интернет-магазинов.',
      h1: 'Разработка сайтов в Слониме',
      p: 'Наша команда поможет вашему бизнесу в Слониме заявить о себе в интернете. Мы создаем сайты, которые приносят результат.'
    },
    'en': {
      title: 'Website Creation in Slonim | Web Development',
      description: 'Website creation services in Slonim. We develop projects of any complexity, from business cards to online stores.',
      h1: 'Web Development in Slonim',
      p: 'Our team will help your business in Slonim make a statement online. We create websites that deliver results.'
    }
  },
  'volkovysk': {
    'ru': {
      title: 'Разработка сайтов в Волковыске | Заказать сайт',
      description: 'Создание сайтов в Волковыске. Мы предлагаем надежные и современные решения для вашего бизнеса.',
      h1: 'Создание сайтов в Волковыске',
      p: 'Профессиональная разработка сайтов в Волковыске. Мы поможем вам создать сайт, который будет соответствовать всем вашим требованиям.'
    },
    'en': {
      title: 'Website Development in Volkovysk | Order a Website',
      description: 'Website creation in Volkovysk. We offer reliable and modern solutions for your business.',
      h1: 'Website Creation in Volkovysk',
      p: 'Professional website development in Volkovysk. We will help you create a website that will meet all your requirements.'
    }
  },
  'zhodino': {
    'ru': {
      title: 'Создание сайтов в Жодино | Веб-студия',
      description: 'Разработка сайтов в Жодино. Мы создаем качественные и функциональные сайты, которые помогают бизнесу расти.',
      h1: 'Разработка сайтов в Жодино',
      p: 'Ищете разработчиков в Жодино? Наша команда готова предложить вам лучшие решения для вашего онлайн-присутствия.'
    },
    'en': {
      title: 'Website Creation in Zhodino | Web Studio',
      description: 'Website development in Zhodino. We create high-quality and functional websites that help businesses grow.',
      h1: 'Web Development in Zhodino',
      p: 'Looking for developers in Zhodino? Our team is ready to offer you the best solutions for your online presence.'
    }
  },
  'smorgon': {
    'ru': {
      title: 'Разработка сайтов в Сморгони | Создание сайтов',
      description: 'Профессиональные услуги по созданию сайтов в Сморгони. Мы знаем, как сделать ваш бизнес успешным в интернете.',
      h1: 'Создание сайтов в Сморгони',
      p: 'Наша команда предлагает разработку сайтов в Сморгони. Мы создаем проекты, которые нравятся пользователям и поисковым системам.'
    },
    'en': {
      title: 'Website Development in Smorgon | Website Creation',
      description: 'Professional website creation services in Smorgon. We know how to make your business successful online.',
      h1: 'Website Creation in Smorgon',
      p: 'Our team offers website development in Smorgon. We create projects that users and search engines love.'
    }
  },
  'kalinkovichi': {
    'ru': {
      title: 'Создание сайтов в Калинковичах | Веб-разработка',
      description: 'Разработка сайтов в Калинковичах. Создаем современные и адаптивные сайты для вашего бизнеса.',
      h1: 'Разработка сайтов в Калинковичах',
      p: 'Мы предлагаем полный спектр услуг по созданию сайтов в Калинковичах. Доверьтесь профессионалам и получите отличный результат.'
    },
    'en': {
      title: 'Website Creation in Kalinkovichi | Web Development',
      description: 'Website development in Kalinkovichi. We create modern and responsive websites for your business.',
      h1: 'Web Development in Kalinkovichi',
      p: 'We offer a full range of website creation services in Kalinkovichi. Trust the professionals and get excellent results.'
    }
  },
  'rogachev': {
    'ru': {
      title: 'Разработка сайтов в Рогачеве | Заказать сайт',
      description: 'Создание сайтов в Рогачеве. Мы предлагаем качественные веб-решения для компаний любого масштаба.',
      h1: 'Создание сайтов в Рогачеве',
      p: 'Ищете, где заказать сайт в Рогачеве? Наша команда готова помочь вам создать эффективный онлайн-инструмент.'
    },
    'en': {
      title: 'Website Development in Rogachev | Order a Website',
      description: 'Website creation in Rogachev. We offer high-quality web solutions for companies of all sizes.',
      h1: 'Website Creation in Rogachev',
      p: 'Looking for where to order a website in Rogachev? Our team is ready to help you create an effective online tool.'
    }
  },
  'gorki': {
    'ru': {
      title: 'Создание сайтов в Горках | Веб-студия',
      description: 'Разработка сайтов в Горках. Создаем профессиональные и современные сайты для вашего бизнеса.',
      h1: 'Разработка сайтов в Горках',
      p: 'Наша команда предлагает услуги по созданию сайтов в Горках. Мы знаем, как сделать ваш проект успешным.'
    },
    'en': {
      title: 'Website Creation in Gorki | Web Studio',
      description: 'Website development in Gorki. We create professional and modern websites for your business.',
      h1: 'Web Development in Gorki',
      p: 'Our team offers website creation services in Gorki. We know how to make your project successful.'
    }
  },
  'moscow': {
    'ru': {
      title: 'Разработка сайтов в Москве | Веб-разработка полного цикла',
      description: 'Разработка масштабируемых веб-решений, ботов и парсеров для бизнеса в Москве. Индивидуальный стек (Astro/Next.js).',
      h1: 'Создание сайтов и Web-App в Москве',
      p: 'Завоевывайте столичный рынок вместе с AVPdev. Мы предлагаем высококлассные услуги по разработке сложных решений в Москве: от интеграции Telegram-ботов до масштабируемых PWA и SPA-платформ.',
      benefits: [
        { icon: 'fa-robot', title: 'Автоматизация бизнес-процессов', desc: 'Мы разрабатываем сложные парсеры данных и многоуровневых Telegram-ботов для нужд московского рынка.' },
        { icon: 'fa-cogs', title: 'Топовые фреймворки', desc: 'Работаем с лучшими из лучших — Next.js для динамики и масштаба, Astro для феноменальной скорости загрузки в SEO.' }
      ],
      faq: [
        { q: 'В чем ваше отличие от обычных веб-студий?', a: 'Наш спектр услуг шире. Помимо сайтов, мы с нуля пишем сложные веб-приложения, API, ботов и интеграционные шлюзы.' },
        { q: 'Как происходит ценообразование?', a: 'Мы работаем с прозрачными сметами. Цена зависит от требуемого стека, затрачиваемых часов и сложности бизнес-логики.' }
      ]
    },
    'en': {
      title: 'Website Development in Moscow | Full-Cycle Web Services',
      description: 'Order scalable web solutions, bots, and scrapers in Moscow. Professional business development using custom stacks (Astro/Next.js).',
      h1: 'Web & App Creation in Moscow',
      p: 'Conquer the capital\'s market with AVPdev. We offer high-class services for developing complex solutions in Moscow: from integrating customized Telegram bots to massive scalable PWA and SPA platforms.',
      benefits: [
        { icon: 'fa-robot', title: 'Business Process Automation', desc: 'We develop complex data scrapers and multi-level Telegram bots to meet the sophisticated demands of the Moscow market.' },
        { icon: 'fa-cogs', title: 'Top-tier Frameworks', desc: 'We utilize the best: Next.js for dynamism and limitless scale, Astro for phenomenal loading speed and SEO.' }
      ],
      faq: [
        { q: 'What makes you different from regular web studios?', a: 'Our service range is broader. Besides traditional sites, we build complex web applications, APIs, bots, and integration gateways from scratch.' },
        { q: 'How does pricing work?', a: 'We provide transparent estimates. The price depends on the required tech stack, estimated hours, and the complexity of the business logic.' }
      ]
    }
  },
  'saint-petersburg': {
    'ru': {
      title: 'Создание сайтов в Санкт-Петербурге | Веб-разработка',
      description: 'Разработка сайтов в Санкт-Петербурге. Создаем уникальные и эффективные веб-решения для вашего бизнеса в Северной столице.',
      h1: 'Разработка сайтов в Санкт-Петербурге',
      p: 'Ищете надежных партнеров для создания сайта в Санкт-Петербурге? Мы предлагаем полный комплекс услуг по веб-разработке.'
    },
    'en': {
      title: 'Website Creation in Saint Petersburg | Web Development',
      description: 'Website development in Saint Petersburg. We create unique and effective web solutions for your business in the Northern capital.',
      h1: 'Web Development in Saint Petersburg',
      p: 'Looking for reliable partners to create a website in Saint Petersburg? We offer a full range of web development services.'
    }
  },
  'novosibirsk': {
    'ru': {
      title: 'Разработка сайтов в Новосибирске | Заказать сайт',
      description: 'Профессиональная разработка сайтов в Новосибирске. Поможем вашему бизнесу выйти на новый уровень в Сибири.',
      h1: 'Создание сайтов в Новосибирске',
      p: 'Наша команда создает современные и быстрые сайты для компаний в Новосибирске, способствуя их росту и развитию.'
    },
    'en': {
      title: 'Website Development in Novosibirsk | Order a Website',
      description: 'Professional website development in Novosibirsk. We will help your business reach a new level in Siberia.',
      h1: 'Website Creation in Novosibirsk',
      p: 'Our team creates modern and fast websites for companies in Novosibirsk, contributing to their growth and development.'
    }
  },
  'yekaterinburg': {
    'ru': {
      title: 'Создание сайтов в Екатеринбурге | Веб-студия',
      description: 'Разработка сайтов в Екатеринбурге. Мы предлагаем качественные и современные решения для бизнеса на Урале.',
      h1: 'Разработка сайтов в Екатеринбурге',
      p: 'Хотите заказать сайт в Екатеринбурге? Наша команда готова предложить вам лучшие решения для вашего онлайн-присутствия.'
    },
    'en': {
      title: 'Website Creation in Yekaterinburg | Web Studio',
      description: 'Website development in Yekaterinburg. We offer high-quality and modern solutions for businesses in the Urals.',
      h1: 'Web Development in Yekaterinburg',
      p: 'Want to order a website in Yekaterinburg? Our team is ready to offer you the best solutions for your online presence.'
    }
  },
  'kazan': {
    'ru': {
      title: 'Разработка сайтов в Казани | Создание сайтов',
      description: 'Профессиональные услуги по созданию сайтов в Казани. Разрабатываем проекты, которые помогают бизнесу расти.',
      h1: 'Создание сайтов в Казани',
      p: 'Наша команда предлагает разработку сайтов в Казани. Мы создаем качественные и функциональные веб-решения.'
    },
    'en': {
      title: 'Website Development in Kazan | Website Creation',
      description: 'Professional website creation services in Kazan. We develop projects that help businesses grow.',
      h1: 'Website Creation in Kazan',
      p: 'Our team offers website development in Kazan. We create high-quality and functional web solutions.'
    }
  },
  'krasnodar': {
    'ru': {
      title: 'Создание сайтов в Краснодаре | Веб-разработка',
      description: 'Разработка сайтов в Краснодаре. Мы предлагаем полный спектр услуг по созданию сайтов для вашего бизнеса на юге России.',
      h1: 'Разработка сайтов в Краснодаре',
      p: 'Ищете разработчиков в Краснодаре? Мы готовы предложить вам современные и эффективные решения для вашего проекта.'
    },
    'en': {
      title: 'Website Creation in Krasnodar | Web Development',
      description: 'Website development in Krasnodar. We offer a full range of website creation services for your business in the south of Russia.',
      h1: 'Web Development in Krasnodar',
      p: 'Looking for developers in Krasnodar? We are ready to offer you modern and effective solutions for your project.'
    }
  },
  'sochi': {
    'ru': {
      title: 'Разработка сайтов в Сочи | Заказать сайт',
      description: 'Создание сайтов в Сочи. Мы помогаем бизнесу в курортном городе привлекать туристов и клиентов с помощью качественных сайтов.',
      h1: 'Создание сайтов в Сочи',
      p: 'Профессиональная разработка сайтов в Сочи. Мы создаем проекты, которые работают на вас круглый год.'
    },
    'en': {
      title: 'Website Development in Sochi | Order a Website',
      description: 'Website creation in Sochi. We help businesses in the resort city attract tourists and customers with high-quality websites.',
      h1: 'Website Creation in Sochi',
      p: 'Professional website development in Sochi. We create projects that work for you all year round.'
    }
  },
  'warsaw': {
    'en': {
      title: 'Web Development Services in Warsaw | Custom Website Creation',
      description: 'Looking for professional web development in Warsaw? We build high-performance, modern websites tailored for your business needs in Poland\'s capital.',
      h1: 'Website Development in Warsaw',
      p: 'Unlock your business potential in Warsaw with a state-of-the-art website. We provide full-stack development services for companies in Warsaw and across Poland.'
    },
    'ru': {
      title: 'Разработка сайтов в Варшаве | Создание сайтов для бизнеса',
      description: 'Ищете профессиональную веб-разработку в Варшаве? Мы создаем высокопроизводительные, современные сайты, адаптированные для вашего бизнеса в столице Польши.',
      h1: 'Разработка сайтов в Варшаве',
      p: 'Раскройте потенциал вашего бизнеса в Варшаве с помощью современного веб-сайта. Мы предоставляем услуги полной разработки для компаний в Варшаве и по всей Польше.'
    }
  },
  'krakow': {
    'en': {
      title: 'Web Development in Krakow | Professional Web Solutions',
      description: 'Expert web development services in Krakow. We create stunning, responsive websites to help your business thrive in Poland\'s cultural hub.',
      h1: 'Website Development in Krakow',
      p: 'From e-commerce to corporate sites, our team in Krakow delivers cutting-edge web solutions that drive growth and engagement.'
    },
    'ru': {
      title: 'Разработка сайтов в Кракове | Профессиональные веб-решения',
      description: 'Экспертные услуги по веб-разработке в Кракове. Мы создаем потрясающие, адаптивные сайты, чтобы помочь вашему бизнесу процветать в культурном центре Польши.',
      h1: 'Разработка сайтов в Кракове',
      p: 'От электронной коммерции до корпоративных сайтов, наша команда в Кракове поставляет передовые веб-решения, которые стимулируют рост и вовлеченность.'
    }
  },
  'berlin': {
    'en': {
      title: 'Web Development in Berlin | Innovative Tech Solutions',
      description: 'Your partner for web development in Berlin. We build scalable, secure, and user-friendly websites for startups and established businesses in Germany.',
      h1: 'Website Development in Berlin',
      p: 'Navigate the competitive Berlin market with a powerful website. We specialize in custom web applications and digital experiences.'
    },
    'ru': {
      title: 'Веб-разработка в Берлине | Инновационные технические решения',
      description: 'Ваш партнер по веб-разработке в Берлине. Мы создаем масштабируемые, безопасные и удобные для пользователей веб-сайты для стартапов и уже существующих компаний в Германии.',
      h1: 'Веб-разработка в Берлине',
      p: 'Ориентируйтесь на конкурентном рынке Берлина с помощью мощного веб-сайта. Мы специализируемся на пользовательских веб-приложениях и цифровых технологиях.'
    }
  },
  'munich': {
    'en': {
      title: 'Web Development Services in Munich | Quality & Precision',
      description: 'Precision-engineered web development in Munich. We deliver high-quality websites and digital products for businesses in Bavaria and beyond.',
      h1: 'Website Development in Munich',
      p: 'Combine German engineering with modern web design. Our Munich-focused team builds robust websites that perform flawlessly.'
    },
    'ru': {
      title: 'Услуги веб-разработки в Мюнхене | Качество и точность',
      description: 'Веб-разработка в Мюнхене, выполненная с высокой точностью. Мы поставляем высококачественные веб-сайты и цифровые продукты для бизнеса в Баварии и за ее пределами.',
      h1: 'Веб-разработка в Мюнхене',
      p: 'Сочетайте немецкую инженерию с современным веб-дизайном. Наша команда, ориентированная на Мюнхен, создает надежные веб-сайты, которые работают безупречно.'
    }
  },
  'prague': {
    'en': {
      title: 'Web Development in Prague | Creative Web Agency',
      description: 'Creative and reliable web development services in Prague. We help businesses connect with their audience through beautiful and functional websites.',
      h1: 'Website Development in Prague',
      p: 'Let us build your digital presence in the heart of Europe. We offer comprehensive web solutions for the Prague market.'
    },
    'ru': {
      title: 'Веб-разработка в Праге | Креативное веб-агентство',
      description: 'Креативные и надежные услуги по веб-разработке в Праге. Мы помогаем компаниям связываться со своей аудиторией через красивые и функциональные веб-сайты.',
      h1: 'Веб-разработка в Праге',
      p: 'Позвольте нам создать ваше цифровое присутствие в сердце Европы. Мы предлагаем комплексные веб-решения для пражского рынка.'
    }
  },
  'vilnius': {
    'en': {
      title: 'Web Development in Vilnius | Baltic Tech Hub',
      description: 'Top-tier web development in Vilnius. We serve the thriving tech scene in Lithuania with modern, fast, and secure websites.',
      h1: 'Website Development in Vilnius',
      p: 'Accelerate your growth in the Baltics with a website built by our expert team. We focus on performance and user experience.'
    },
    'ru': {
      title: 'Веб-разработка в Вильнюсе | Балтийский технологический центр',
      description: 'Первоклассная веб-разработка в Вильнюсе. Мы обслуживаем процветающую технологическую сцену в Литве, создавая современные, быстрые и безопасные веб-сайты.',
      h1: 'Веб-разработка в Вильнюсе',
      p: 'Ускорьте свой рост в странах Балтии с помощью веб-сайта, созданного нашей командой экспертов. Мы ориентируемся на производительность и удобство для пользователей.'
    }
  },
  'riga': {
    'en': {
      title: 'Web Development in Riga | Digital Solutions for Growth',
      description: 'Professional web development services in Riga. We build effective digital platforms to help your business succeed in Latvia.',
      h1: 'Website Development in Riga',
      p: 'From concept to launch, we provide end-to-end web development solutions for companies in Riga, tailored to the local market.'
    },
    'ru': {
      title: 'Веб-разработка в Риге | Цифровые решения для роста',
      description: 'Профессиональные услуги по веб-разработке в Риге. Мы создаем эффективные цифровые платформы, чтобы помочь вашему бизнесу добиться успеха в Латвии.',
      h1: 'Веб-разработка в Риге',
      p: 'От концепции до запуска мы предоставляем комплексные решения по веб-разработке для компаний в Риге, адаптированные к местному рынку.'
    }
  },
  'tallinn': {
    'en': {
      title: 'Web Development in Tallinn | e-Estonia\'s Tech Partner',
      description: 'Advanced web development in Tallinn. As a tech partner in e-Estonia, we build innovative and secure websites for a digital-first world.',
      h1: 'Website Development in Tallinn',
      p: 'Join the digital revolution with a website crafted in Tallinn. We specialize in high-tech solutions for forward-thinking businesses.'
    },
    'ru': {
      title: 'Веб-разработка в Таллинне | Технологический партнер e-Estonia',
      description: 'Передовая веб-разработка в Таллинне. Как технологический партнер в e-Estonia, мы создаем инновационные и безопасные веб-сайты для цифрового мира.',
      h1: 'Веб-разработка в Таллинне',
      p: 'Присоединяйтесь к цифровой революции с веб-сайтом, созданным в Таллинне. Мы специализируемся на высокотехнологичных решениях для дальновидных компаний.'
    }
  },
  'amsterdam': {
    'en': {
      title: 'Web Development in Amsterdam | Creative & Tech-Driven',
      description: 'Leading web development agency in Amsterdam. We combine creative design with robust technology to build websites that stand out.',
      h1: 'Website Development in Amsterdam',
      p: 'Expand your reach in the Netherlands with a professionally built website. Our Amsterdam team is ready to bring your vision to life.'
    },
    'ru': {
      title: 'Веб-разработка в Амстердаме | Креатив и технологии',
      description: 'Ведущее агентство по веб-разработке в Амстердаме. Мы сочетаем креативный дизайн с надежными технологиями для создания выдающихся веб-сайтов.',
      h1: 'Веб-разработка в Амстердаме',
      p: 'Расширьте свое присутствие в Нидерландах с помощью профессионально созданного веб-сайта. Наша команда в Амстердаме готова воплотить ваше видение в жизнь.'
    }
  },
  'almaty': {
    'ru': {
      title: 'Разработка сайтов в Алматы | Создание сайтов для бизнеса',
      description: 'Профессиональная веб-разработка в Алматы. Создаем современные, адаптивные и высококонверсионные сайты для бизнеса в Казахстане.',
      h1: 'Создание сайтов в Алматы',
      p: 'Закажите разработку сайта в Алматы. Наша команда поможет вашему бизнесу выйти на новый уровень в цифровом пространстве Казахстана, предлагая передовые веб-решения.'
    },
    'en': {
      title: 'Website Development in Almaty | Business Web Solutions',
      description: 'Professional web development in Almaty. We create modern, responsive, and high-converting websites for businesses in Kazakhstan.',
      h1: 'Website Creation in Almaty',
      p: 'Order website development in Almaty. Our team will help your business reach a new level in the digital space of Kazakhstan, offering cutting-edge web solutions.'
    }
  },
  'astana': {
    'ru': {
      title: 'Создание сайтов в Астане | IT-решения для бизнеса',
      description: 'Разработка сайтов в Астане (Нур-Султан). Разрабатываем корпоративные порталы, интернет-магазины и лендинги для столичного бизнеса.',
      h1: 'Разработка сайтов в Астане',
      p: 'Мы предоставляем полный спектр услуг по созданию сайтов в Астане. Доверьте цифровизацию вашего бизнеса профессионалам AVPdev.'
    },
    'en': {
      title: 'Website Creation in Astana | IT Solutions for Business',
      description: 'Website development in Astana (Nur-Sultan). We develop corporate portals, online stores, and landing pages for capital businesses.',
      h1: 'Web Development in Astana',
      p: 'We provide a full range of website creation services in Astana. Entrust the digitalization of your business to the professionals at AVPdev.'
    }
  },
  'karaganda': {
    'ru': {
      title: 'Разработка сайтов в Караганде | Заказать качественный сайт',
      description: 'Надежная веб-разработка в Караганде. Создаем сайты, которые работают на результат и привлекают новых клиентов.',
      h1: 'Разработка сайтов в Караганде',
      p: 'Укрепите свои позиции на рынке с профессиональным сайтом от нашей команды разработчиков в Караганде. Гарантия качества и сроки.'
    },
    'en': {
      title: 'Web Development in Karaganda | Order a Quality Website',
      description: 'Reliable web development in Karaganda. We create websites that deliver results and attract new customers.',
      h1: 'Website Development in Karaganda',
      p: 'Strengthen your market position with a professional website from our development team in Karaganda. Quality assurance and deadlines.'
    }
  },
  'shymkent': {
    'ru': {
      title: 'Создание сайтов в Шымкенте | Услуги веб-студии',
      description: 'Нужен современный сайт в Шымкенте? Мы предлагаем комплексный подход к созданию и продвижению веб-проектов.',
      h1: 'Создание сайтов в Шымкенте',
      p: 'Наша студия предлагает эффективные веб-решения в Шымкенте, помогая местному бизнесу масштабироваться через интернет.'
    },
    'en': {
      title: 'Website Creation in Shymkent | Web Studio Services',
      description: 'Need a modern website in Shymkent? We offer a comprehensive approach to the creation and promotion of web projects.',
      h1: 'Website Creation in Shymkent',
      p: 'Our studio offers effective web solutions in Shymkent, helping local businesses scale via the Internet.'
    }
  },
  'new-york': {
    'en': {
      title: 'Web Development in New York | Enterprise Digital Solutions',
      description: 'Top-tier web development agency in NYC. We build fast, accessible, and scalable tech platforms for startups and enterprises across New York.',
      h1: 'Strategic Web Development in New York',
      p: 'The NYC market never sleeps, and neither should your web platform. AVPdev delivers cutting-edge digital experiences built on React, Node, and Astro that help New York businesses scale effectively and dominate their niches.',
      benefits: [
        { icon: 'fa-building', title: 'Enterprise-Grade Scale', desc: 'Our architectures handle high traffic spikes, ensuring your application stays up during intense media coverage or marketing drops.' },
        { icon: 'fa-universal-access', title: 'ADA Compliance', desc: 'We natively implement rigorous accessibility (a11y) standards crucial for operating within US and NY state regulations.' }
      ],
      faq: [
        { q: 'Do you work with Wall Street / FinTech companies?', a: 'Yes, we are highly experienced in creating secure portals, dashboards, and scalable APIs suitable for the financial sector.' },
        { q: 'How do you handle time zone differences?', a: 'Our project managers ensure seamless communication overlaps. We provide asynchronous daily updates and adhere to strict agile delivery schedules.' }
      ]
    },
    'ru': {
      title: 'Разработка сайтов в Нью-Йорке | Корпоративные решения',
      description: 'Ведущее агентство веб-разработки для рынка Нью-Йорка. Создаем быстрые и масштабируемые платформы для стартапов и корпораций в США.',
      h1: 'Веб-разработка для бизнеса в Нью-Йорке',
      p: 'Рынок Нью-Йорка не спит, и ваш сайт тоже не должен. AVPdev поставляет передовые цифровые проекты на базе React и Astro, которые помогают компаниям на Манхэттене и по всему штату эффективно масштабироваться.',
      benefits: [
        { icon: 'fa-building', title: 'Масштабируемость Enterprise уровня', desc: 'Наши архитектурные решения выдерживают пиковые нагрузки во время масштабных рекламных кампаний США.' },
        { icon: 'fa-universal-access', title: 'ADA Совместимость (Инклюзивность)', desc: 'Мы внедряем строгие стандарты доступности (WCAG), что защищает американские компании от юридических рисков.' }
      ],
      faq: [
        { q: 'Имеете ли вы опыт работы с FinTech стартапами?', a: 'Да, мы специализируемся на безопасных порталах, защищенных API и дэшбордах для финансового сектора.' },
        { q: 'Как вы решаете вопрос разницы во времени?', a: 'Мы настраиваем процесс через асинхронные ежедневные апдейты и находим удобные слоты для созвонов с американскими клиентами.' }
      ]
    }
  },
  'los-angeles': {
    'en': {
      title: 'Web Development in Los Angeles | Creative Web Studio',
      description: 'Creative web development in Los Angeles. We combine stunning design with robust technology to help LA businesses stand out.',
      h1: 'Website Development in Los Angeles',
      p: 'Capture your audience’s attention with a visually compelling website. Our team provides top-tier web development services across Los Angeles.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' },
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' }
          ],
          faq: [
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' },
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'chicago': {
    'en': {
      title: 'Web Development in Chicago | Professional Web Services',
      description: 'Expert web development company in Chicago. We build reliable, conversion-focused websites for local and global businesses.',
      h1: 'Website Development in Chicago',
      p: 'Partner with us to create a high-quality website that drives growth for your Chicago-based business. We focus on performance and usability.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' },
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' }
          ],
          faq: [
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' },
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'miami': {
    'en': {
      title: 'Web Development in Miami | Modern Digital Solutions',
      description: 'Innovative web development in Miami. We create fast, mobile-friendly websites designed to convert visitors into customers.',
      h1: 'Website Development in Miami',
      p: 'Expand your digital footprint in Miami with our professional web development services. We build websites that look great and perform flawlessly.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' },
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' }
          ],
          faq: [
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' },
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'austin': {
    'en': {
      title: 'Web Development in Austin | Agile Tech Partner',
      description: 'Leading web development in Austin, the thriving tech hub. We create custom, scalable web applications for forward-thinking companies.',
      h1: 'Website Development in Austin',
      p: 'Join Austin’s fast-growing tech scene with a powerful website. We provide full-cycle web development tailored to your specific needs.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' },
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' }
          ],
          faq: [
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' },
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'san-francisco': {
    'en': {
      title: 'Web Development in San Francisco | Silicon Valley Standards',
      description: 'Premium web development in San Francisco. We deliver world-class websites and web apps for startups and tech giants.',
      h1: 'Website Development in San Francisco',
      p: 'Achieve Silicon Valley standards with a modern, high-performance website. We specialize in advanced web solutions for the SF Bay Area.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' }
          ],
          faq: [
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' },
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'london': {
    'en': {
      title: 'Web Design & Development Agency in London | Next-Gen Tech',
      description: 'Expert web development agency in London, UK. We build highly converting e-commerce sites, fintech apps, and B2B platforms using the modern JS ecosystem.',
      h1: 'Next-Generation Web Development in London',
      p: 'Stand out in the competitive UK digital landscape. We empower London-based startups and established enterprises with incredibly fast, compliant, and beautifully engineered web applications.',
      benefits: [
        { icon: 'fa-shield-check', title: 'GDPR & UK Privacy', desc: 'We build privacy-first applications ensuring full compliance with strict UK data protection laws.' },
        { icon: 'fa-pound-sign', title: 'E-commerce Mastery', desc: 'Seamless integration with Shopify, Stripe, and UK-focused logistics and payment providers for maximum checkout conversions.' }
      ],
      faq: [
        { q: 'Can you work alongside our existing London marketing team?', a: 'Yes. We frequently act as a technical extension for UK digital marketing and creative agencies, ensuring clean code execution of their designs.' },
        { q: 'What is your stack for complex web platforms?', a: 'We specialize in Next.js, Node.js, and Astro. This ensures your London customers get app-like experiences directly in the browser.' }
      ]
    },
    'ru': {
      title: 'Разработка сайтов в Лондоне | Британское качество AVPdev',
      description: 'Экспертное лондонское веб-агентство. Мы создаем конверсионные e-commerce решения, приложения для финтеха и B2B.',
      h1: 'Инновационная разработка сайтов для рынка Лондона',
      p: 'Выделитесь на высококонкурентном британском рынке. AVPdev снабжает стартапы и корпорации Лондона невероятно быстрыми, безопасными и современными веб-инструментами.',
      benefits: [
        { icon: 'fa-shield-check', title: 'GDPR и защита данных', desc: 'Абсолютное соответствие британскому законодательству об обработке персональных данных прямо "из коробки".' },
        { icon: 'fa-pound-sign', title: 'Экспертиза в E-commerce', desc: 'Интегрируем локальные британские платежные шлюзы и системы доставки для максимальных продаж.' }
      ],
      faq: [
        { q: 'Сможете ли вы работать с нашей маркетинг командой?', a: 'Да, мы часто выступаем в роли надежного технического подрядчика для лондонских креативных и PR-агентств.' },
        { q: 'Какой стек вы рекомендуете для UK рынка?', a: 'Для достижения высоких позиций в Google UK мы используем Next.js или Astro, обеспечивающие идеальную SEO оптимизацию и скорость.' }
      ]
    }
  },
  'paris': {
    'en': {
      title: 'Web Development in Paris | Creative Tech Solutions',
      description: 'Top-tier web development in Paris. We combine elegant design with robust engineering for outstanding digital experiences.',
      h1: 'Website Development in Paris',
      p: 'Bring your vision to life in Paris with our comprehensive web development services. We build websites that inspire and convert.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' },
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' }
          ],
          faq: [
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' },
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'madrid': {
    'en': {
      title: 'Web Development in Madrid | Innovative Web Design',
      description: 'Leading web development company in Madrid. We create dynamic, responsive websites tailored for your business growth.',
      h1: 'Website Development in Madrid',
      p: 'Accelerate your digital transformation in Madrid. We deliver cutting-edge websites and applications for modern enterprises.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' }
          ],
          faq: [
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' },
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'rome': {
    'en': {
      title: 'Web Development in Rome | Professional Digital Services',
      description: 'Reliable web development in Rome. We craft functional and beautiful websites that help Italian businesses thrive online.',
      h1: 'Website Development in Rome',
      p: 'Expand your reach in Rome with a professionally engineered website. We ensure high performance and superior user experience.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' },
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' }
          ],
          faq: [
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' },
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'dubai': {
    'en': {
      title: 'Web Development Company in Dubai | AVPdev Agency',
      description: 'Elite web development in Dubai, UAE. We deliver state-of-the-art corporate websites, real estate portals, and startup MVPs for the Middle East.',
      h1: 'Premium Web Development in Dubai',
      p: 'The UAE market demands luxury, speed, and flawless execution. AVPdev specializes in building high-end digital solutions for real estate, hospitality, and rapid-growth startups operating in Dubai and the MENA region.',
      benefits: [
        { icon: 'fa-gem', title: 'Luxury Digital aesthetic', desc: 'We deliver ultra-premium UI/UX design tailored to the high expectations of UAE customers and investors.' },
        { icon: 'fa-language', title: 'Full Bilingual Support (RTL)', desc: 'Our architectures natively support complex English to Arabic layout flipping (Right-to-Left) with zero performance drops.' }
      ],
      faq: [
        { q: 'Do you build platforms for Dubai Real Estate market?', a: 'Absolutely. We have extensive expertise building property listing platforms with map integrations, 3D tours, and CRM connections.' },
        { q: 'Can you integrate local UAE payment gateways?', a: 'Yes, we seamlessly integrate PayTabs, Telr, Mashreq, and global options like Stripe for smooth transactions in AED.' }
      ]
    },
    'ru': {
      title: 'Разработка сайтов в Дубае | Веб-агентство AVPdev',
      description: 'Премиальная веб-разработка в Дубае (ОАЭ). Создаем корпоративные сайты, порталы недвижимости и MVP для стартапов на Ближнем Востоке.',
      h1: 'Премиальная веб-разработка в Дубае',
      p: 'Рынок ОАЭ требует безупречного исполнения, высокой скорости и роскошного визуала. Мы в AVPdev специализируемся на создании digital-решений для недвижимости, гостиничного бизнеса и стартапов в Дубае.',
      benefits: [
        { icon: 'fa-gem', title: 'Премиальный визуал', desc: 'Создаем бескомпромиссный 고급 UX/UI дизайн, который отвечает ожиданиям требовательных инвесторов и клиентов ОАЭ.' },
        { icon: 'fa-language', title: 'Поддержка RTL (Арабский)', desc: 'Наши платформы могут органично менять направление контента (справа налево) без потери скорости загрузки.' }
      ],
      faq: [
        { q: 'Разрабатываете ли вы сайты для агентств недвижимости в Дубае?', a: 'Конечно. Мы интегрируем каталоги объектов с интерактивными картами и популярными на Ближнем Востоке CRM-системами.' },
        { q: 'Подключаете ли платежные шлюзы ОАЭ?', a: 'Да, мы настраиваем прием платежей в дирхамах (AED) через локальные сервисы, такие как PayTabs или Telr.' }
      ]
    }
  },
  'abu-dhabi': {
    'en': {
      title: 'Web Development in Abu Dhabi | Corporate Web Solutions',
      description: 'Expert web development services in Abu Dhabi. We deliver secure and scalable digital solutions for government and corporate sectors.',
      h1: 'Website Development in Abu Dhabi',
      p: 'Drive digital innovation in Abu Dhabi with our professional web development team. We create powerful web-based platforms.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' }
          ],
          faq: [
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' },
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'singapore': {
    'en': {
      title: 'Web Development in Singapore | Future-Ready Web Apps',
      description: 'Leading web development in Singapore. We engineer fast, secure, and highly scalable web applications for tech-driven businesses.',
      h1: 'Website Development in Singapore',
      p: 'Connect with a global audience from Singapore through our advanced web solutions. We build for performance and reliability.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' }
          ],
          faq: [
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' },
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'tokyo': {
    'en': {
      title: 'Web Development in Tokyo | Advanced Digital Engineering',
      description: 'High-performance web development in Tokyo. We combine innovative technology with exceptional design for the Japanese market.',
      h1: 'Website Development in Tokyo',
      p: 'Elevate your business in Tokyo with our modern web development services. We focus on speed, precision, and user engagement.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' },
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' }
          ],
          faq: [
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' },
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'toronto': {
    'en': {
      title: 'Web Development in Toronto | Agile Tech Specialists',
      description: 'Top-rated web development in Toronto. We build custom websites and applications that fuel business growth across Canada.',
      h1: 'Website Development in Toronto',
      p: 'Power your digital strategy in Toronto with our custom web solutions. We deliver robust platforms optimized for conversion.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' }
          ],
          faq: [
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' },
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'vancouver': {
    'en': {
      title: 'Web Development in Vancouver | Creative Digital Studio',
      description: 'Professional web development in Vancouver. Our team crafts stunning websites designed for performance and global reach.',
      h1: 'Website Development in Vancouver',
      p: 'Boost your online presence in Vancouver. We create dynamic web experiences that resonate with your target audience.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' },
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' }
          ],
          faq: [
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' },
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'sydney': {
    'en': {
      title: 'Web Development in Sydney | Premier Digital Agency',
      description: 'Expert web development services in Sydney. We build modern, scalable websites to help Australian businesses succeed online.',
      h1: 'Website Development in Sydney',
      p: 'Transform your digital presence in Sydney. We offer end-to-end web development tailored to your specific business needs.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' },
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' }
          ],
          faq: [
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' },
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'melbourne': {
    'en': {
      title: 'Web Development in Melbourne | Innovative Tech Solutions',
      description: 'Creative and reliable web development in Melbourne. We engineered bespoke websites that drive engagement and sales.',
      h1: 'Website Development in Melbourne',
      p: 'Partner with us in Melbourne for top-tier web development. We build future-proof platforms for brands that demand excellence.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' },
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' }
          ],
          faq: [
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' },
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'manchester': {
    'en': {
      title: 'Web Development in Manchester | Digital Agency',
      description: 'Expert web development services in Manchester. We design and build high-quality websites for UK businesses.',
      h1: 'Website Development in Manchester',
      p: 'Establish a powerful online presence in Manchester with our custom web solutions. We specialize in fast, scalable, and secure applications.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' },
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' }
          ],
          faq: [
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' },
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'birmingham': {
    'en': {
      title: 'Web Development in Birmingham | Custom Web Solutions',
      description: 'Top-tier web development in Birmingham. We build modern websites that drive digital growth.',
      h1: 'Website Development in Birmingham',
      p: 'Accelerate your business with robust web solutions in Birmingham tailored to your digital strategy.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' }
          ],
          faq: [
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' },
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'edinburgh': {
    'en': {
      title: 'Web Development in Edinburgh | Web Studio',
      description: 'Reliable web development in Edinburgh. We craft functional and beautiful websites.',
      h1: 'Website Development in Edinburgh',
      p: 'Expand your reach in Edinburgh with a professionally engineered website. We ensure high performance.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' }
          ],
          faq: [
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' },
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'glasgow': {
    'en': {
      title: 'Web Development in Glasgow | Tech-Driven Solutions',
      description: 'Professional web development in Glasgow. We deliver fast, secure web applications.',
      h1: 'Website Development in Glasgow',
      p: 'Power your digital strategy in Glasgow with out custom web solutions and modern design.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' },
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' }
          ],
          faq: [
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' },
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'lyon': {
    'en': {
      title: 'Web Development in Lyon | Creative Web Agency',
      description: 'Expert web development services in Lyon. We design and build high-quality websites.',
      h1: 'Website Development in Lyon',
      p: 'Bring your vision to life in Lyon with our comprehensive web development services. We build websites that inspire and convert.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' },
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' }
          ],
          faq: [
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' },
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'marseille': {
    'en': {
      title: 'Web Development in Marseille | Digital Solutions',
      description: 'Top-rated web development in Marseille. We build custom websites and applications.',
      h1: 'Website Development in Marseille',
      p: 'Expand your digital footprint in Marseille with our professional web development services.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' }
          ],
          faq: [
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' },
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'toulouse': {
    'en': {
      title: 'Web Development in Toulouse | Tech Hub Agency',
      description: 'Reliable and fast web development in Toulouse. We craft custom web platforms.',
      h1: 'Website Development in Toulouse',
      p: 'Empower your business in Toulouse with reliable, conversion-focused websites.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' }
          ],
          faq: [
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' },
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'frankfurt': {
    'en': {
      title: 'Web Development in Frankfurt | Business Web IT',
      description: 'Premium web development in Frankfurt. We build state-of-the-art web platforms for businesses in Germany.',
      h1: 'Website Development in Frankfurt',
      p: 'Stand out in Frankfurt\'s dynamic market with a cutting-edge website. We specialize in scalable solutions for enterprise clients.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' }
          ],
          faq: [
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' },
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'hamburg': {
    'en': {
      title: 'Web Development in Hamburg | Creative Digital Agency',
      description: 'Innovative web development in Hamburg. We combine elegant design with robust engineering.',
      h1: 'Website Development in Hamburg',
      p: 'Accelerate your digital transformation in Hamburg. We deliver cutting-edge websites and applications.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' },
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' }
          ],
          faq: [
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' },
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'cologne': {
    'en': {
      title: 'Web Development in Cologne | Modern Web Services',
      description: 'Leading web development company in Cologne. We create dynamic, responsive websites.',
      h1: 'Website Development in Cologne',
      p: 'Expand your reach in Cologne with a professionally engineered website for modern enterprises.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' },
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' }
          ],
          faq: [
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' },
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'stuttgart': {
    'en': {
      title: 'Web Development in Stuttgart | Advanced Engineering',
      description: 'Expert web development services in Stuttgart. We deliver secure and scalable digital solutions.',
      h1: 'Website Development in Stuttgart',
      p: 'Drive digital innovation in Stuttgart with our professional web development team.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' },
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' }
          ],
          faq: [
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' },
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'barcelona': {
    'en': {
      title: 'Web Development in Barcelona | Digital Creators',
      description: 'Leading web development in Barcelona. We engineer fast, secure, and highly scalable web applications.',
      h1: 'Website Development in Barcelona',
      p: 'Connect with a global audience from Barcelona through our advanced web solutions. We build for performance.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' },
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' }
          ],
          faq: [
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' },
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'valencia': {
    'en': {
      title: 'Web Development in Valencia | Tech Agency',
      description: 'High-performance web development in Valencia. We combine innovative technology with exceptional design.',
      h1: 'Website Development in Valencia',
      p: 'Elevate your business in Valencia with our modern web development services. We focus on speed and user engagement.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' },
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' }
          ],
          faq: [
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' },
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'seville': {
    'en': {
      title: 'Web Development in Seville | Professional Digital Services',
      description: 'Reliable web development in Seville. We craft beautiful websites that help Spanish businesses thrive online.',
      h1: 'Website Development in Seville',
      p: 'Transform your digital presence in Seville. We offer end-to-end web development tailored to your specific needs.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' }
          ],
          faq: [
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' },
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'milan': {
    'en': {
      title: 'Web Development in Milan | Premier Web Studio',
      description: 'Top-tier web development in Milan. We combine sleek design with robust technology.',
      h1: 'Website Development in Milan',
      p: 'Capture your audience with a visually compelling website. Our team provides top-tier web development services in Milan.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' },
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' }
          ],
          faq: [
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' },
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'naples': {
    'en': {
      title: 'Web Development in Naples | Digital Solutions',
      description: 'Expert web development services in Naples. We build reliable, conversion-focused websites.',
      h1: 'Website Development in Naples',
      p: 'Partner with us to create a high-quality website that drives growth for your Naples-based business.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' },
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' }
          ],
          faq: [
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' },
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'turin': {
    'en': {
      title: 'Web Development in Turin | Advanced Tech Partner',
      description: 'Leading web development in Turin. We create custom, scalable web applications for forward-thinking companies.',
      h1: 'Website Development in Turin',
      p: 'Join Turin’s thriving tech scene with a powerful website. We provide full-cycle web development.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' },
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' }
          ],
          faq: [
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' },
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'wroclaw': {
    'en': {
      title: 'Web Development in Wroclaw | Agile Tech Partner',
      description: 'Top-rated web development in Wroclaw. We build custom websites and applications for business growth.',
      h1: 'Website Development in Wroclaw',
      p: 'Power your digital strategy in Wroclaw with our custom web solutions. We deliver robust platforms.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' }
          ],
          faq: [
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' },
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'poznan': {
    'en': {
      title: 'Web Development in Poznan | IT Solutions',
      description: 'Professional web development in Poznan. Our team crafts stunning websites designed for performance.',
      h1: 'Website Development in Poznan',
      p: 'Boost your online presence in Poznan. We create dynamic web experiences that resonate with your target audience.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' },
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' }
          ],
          faq: [
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' },
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'seattle': {
    'en': {
      title: 'Web Development in Seattle | Pacific Tech Solutions',
      description: 'Expert web development services in Seattle. We design and build high-quality websites that drive results.',
      h1: 'Website Development in Seattle',
      p: 'Establish a powerful online presence in Seattle with our custom web solutions. We specialize in fast and secure applications.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' }
          ],
          faq: [
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' },
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'denver': {
    'en': {
      title: 'Web Development in Denver | Innovative Web Design',
      description: 'Leading web development company in Denver. We create dynamic, responsive websites tailored for your growth.',
      h1: 'Website Development in Denver',
      p: 'Accelerate your digital transformation in Denver. We deliver cutting-edge websites and applications.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' },
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' }
          ],
          faq: [
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' },
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'boston': {
    'en': {
      title: 'Web Development in Boston | Corporate Web Solutions',
      description: 'Reliable web development in Boston. We craft functional and beautiful websites that help businesses thrive online.',
      h1: 'Website Development in Boston',
      p: 'Expand your reach in Boston with a professionally engineered website. We ensure high performance and superior user experience.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' },
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' }
          ],
          faq: [
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' },
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'houston': {
    'en': {
      title: 'Web Development in Houston | Elite Tech Agency',
      description: 'Premium web development in Houston. We build state-of-the-art web platforms for enterprise and startup clients.',
      h1: 'Website Development in Houston',
      p: 'Stand out in Houston\'s dynamic market with a cutting-edge website. We specialize in scalable web solutions.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' }
          ],
          faq: [
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' },
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'atlanta': {
    'en': {
      title: 'Web Development in Atlanta | Professional Digital Services',
      description: 'Expert web development services in Atlanta. We deliver secure and scalable digital solutions for modern sectors.',
      h1: 'Website Development in Atlanta',
      p: 'Drive digital innovation in Atlanta with our professional web development team. We create powerful web-based platforms.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' }
          ],
          faq: [
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' },
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'las-vegas': {
    'en': {
      title: 'Web Development in Las Vegas | Future-Ready Web Apps',
      description: 'Leading web development in Las Vegas. We engineer fast, secure, and highly scalable web applications.',
      h1: 'Website Development in Las Vegas',
      p: 'Connect with a global audience from Las Vegas through our advanced web solutions. We build for performance.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' },
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' }
          ],
          faq: [
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' },
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'washington': {
    'en': {
      title: 'Web Development in Washington D.C. | Advanced Digital Engineering',
      description: 'High-performance web development in Washington D.C. We combine innovative technology with exceptional design.',
      h1: 'Website Development in Washington D.C.',
      p: 'Elevate your business in Washington D.C. with our modern web development services. We focus on security and precision.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' }
          ],
          faq: [
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' },
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'montreal': {
    'en': {
      title: 'Web Development in Montreal | Agile Tech Specialists',
      description: 'Top-rated web development in Montreal. We build custom websites and applications that fuel business growth across Canada.',
      h1: 'Website Development in Montreal',
      p: 'Power your digital strategy in Montreal with our custom web solutions. We deliver robust platforms optimized for conversion.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' }
          ],
          faq: [
            { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' },
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'calgary': {
    'en': {
      title: 'Web Development in Calgary | Creative Digital Studio',
      description: 'Professional web development in Calgary. Our team crafts stunning websites designed for performance and global reach.',
      h1: 'Website Development in Calgary',
      p: 'Boost your online presence in Calgary. We create dynamic web experiences that resonate with your target audience.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' },
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' }
          ],
          faq: [
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' },
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'brisbane': {
    'en': {
      title: 'Web Development in Brisbane | Premier Digital Agency',
      description: 'Expert web development services in Brisbane. We build modern, scalable websites to help Australian businesses succeed online.',
      h1: 'Website Development in Brisbane',
      p: 'Transform your digital presence in Brisbane. We offer end-to-end web development tailored to your specific business needs.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' }
          ],
          faq: [
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' },
            { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'perth': {
    'en': {
      title: 'Web Development in Perth | Innovative Tech Solutions',
      description: 'Creative and reliable web development in Perth. We engineered bespoke websites that drive engagement and sales.',
      h1: 'Website Development in Perth',
      p: 'Partner with us in Perth for top-tier web development. We build future-proof platforms for brands that demand excellence.',
      benefits: [
        {
          icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.',
          benefits: [
            { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
            { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' }
          ],
          faq: [
            { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' },
            { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' }
          ]
        },
        { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }
      ],
      faq: [
        { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },
        { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }
      ]
    }
  },
  'adelaide': {
    'en': {
      title: 'Web Development in Adelaide | Digital Solutions Partner',
      description: 'Top-rated web development in Adelaide. We build robust and modern websites focusing on SEO and performance.',
      h1: 'Website Development in Adelaide',
      p: 'Power your digital strategy in Adelaide with our custom web solutions. We deliver highly optimized platforms.'
    }
  }
};