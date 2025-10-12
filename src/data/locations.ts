export interface Location {
  slug: string;
  name_ru: string | null; // Имя в предложном падеже (в Минске)
  name_en: string;
  country: string;
}

export const locations: Location[] = [
  // --- Беларусь (Приоритет - максимальный охват) ---
  { slug: 'minsk', name_ru: 'Минске', name_en: 'Minsk', country: 'BY' },
  { slug: 'gomel', name_ru: 'Гомеле', name_en: 'Gomel', country: 'BY' },
  { slug: 'mogilev', name_ru: 'Могилеве', name_en: 'Mogilev', country: 'BY' },
  { slug: 'vitebsk', name_ru: 'Витебске', name_en: 'Vitebsk', country: 'BY' },
  { slug: 'grodno', name_ru: 'Гродно', name_en: 'Grodno', country: 'BY' },
  { slug: 'brest', name_ru: 'Бресте', name_en: 'Brest', country: 'BY' },
  { slug: 'bobruisk', name_ru: 'Бобруйске', name_en: 'Bobruisk', country: 'BY' },
  { slug: 'baranovichi', name_ru: 'Барановичах', name_en: 'Baranovichi', country: 'BY' },
  { slug: 'borisov', name_ru: 'Борисове', name_en: 'Borisov', country: 'BY' },
  { slug: 'pinsk', name_ru: 'Пинске', name_en: 'Pinsk', country: 'BY' },
  { slug: 'orsha', name_ru: 'Орше', name_en: 'Orsha', country: 'BY' },
  { slug: 'mozyr', name_ru: 'Мозыре', name_en: 'Mozyr', country: 'BY' },
  { slug: 'lida', name_ru: 'Лиде', name_en: 'Lida', country: 'BY' },
  { slug: 'soligorsk', name_ru: 'Солигорске', name_en: 'Soligorsk', country: 'BY' },
  { slug: 'novopolotsk', name_ru: 'Новополоцке', name_en: 'Novopolotsk', country: 'BY' },
  { slug: 'molodechno', name_ru: 'Молодечно', name_en: 'Molodechno', country: 'BY' },
  { slug: 'polotsk', name_ru: 'Полоцке', name_en: 'Polotsk', country: 'BY' },
  { slug: 'zhlobin', name_ru: 'Жлобине', name_en: 'Zhlobin', country: 'BY' },
  { slug: 'rechitsa', name_ru: 'Речице', name_en: 'Rechitsa', country: 'BY' },
  { slug: 'svetlogorsk', name_ru: 'Светлогорске', name_en: 'Svetlogorsk', country: 'BY' },
  { slug: 'slutsk', name_ru: 'Слуцке', name_en: 'Slutsk', country: 'BY' },
  { slug: 'kobrin', name_ru: 'Кобрине', name_en: 'Kobrin', country: 'BY' },
  { slug: 'slonim', name_ru: 'Слониме', name_en: 'Slonim', country: 'BY' },
  { slug: 'volkovysk', name_ru: 'Волковыске', name_en: 'Volkovysk', country: 'BY' },
  { slug: 'zhodino', name_ru: 'Жодино', name_en: 'Zhodino', country: 'BY' },
  { slug: 'smorgon', name_ru: 'Сморгони', name_en: 'Smorgon', country: 'BY' },
  { slug: 'kalinkovichi', name_ru: 'Калинковичах', name_en: 'Kalinkovichi', country: 'BY' },
  { slug: 'rogachev', name_ru: 'Рогачеве', name_en: 'Rogachev', country: 'BY' },
  { slug: 'gorki', name_ru: 'Горках', name_en: 'Gorki', country: 'BY' },

  // --- Россия ---
  { slug: 'moscow', name_ru: 'Москве', name_en: 'Moscow', country: 'RU' },
  { slug: 'saint-petersburg', name_ru: 'Санкт-Петербурге', name_en: 'Saint Petersburg', country: 'RU' },
  { slug: 'novosibirsk', name_ru: 'Новосибирске', name_en: 'Novosibirsk', country: 'RU' },
  { slug: 'yekaterinburg', name_ru: 'Екатеринбурге', name_en: 'Yekaterinburg', country: 'RU' },
  { slug: 'kazan', name_ru: 'Казани', name_en: 'Kazan', country: 'RU' },
  { slug: 'krasnodar', name_ru: 'Краснодаре', name_en: 'Krasnodar', country: 'RU' },
  { slug: 'sochi', name_ru: 'Сочи', name_en: 'Sochi', country: 'RU' },

  // --- Европа (только английский) ---
  { slug: 'warsaw', name_ru: null, name_en: 'Warsaw', country: 'PL' },
  { slug: 'krakow', name_ru: null, name_en: 'Krakow', country: 'PL' },
  { slug: 'berlin', name_ru: null, name_en: 'Berlin', country: 'DE' },
  { slug: 'munich', name_ru: null, name_en: 'Munich', country: 'DE' },
  { slug: 'prague', name_ru: null, name_en: 'Prague', country: 'CZ' },
  { slug: 'vilnius', name_ru: null, name_en: 'Vilnius', country: 'LT' },
  { slug: 'riga', name_ru: null, name_en: 'Riga', country: 'LV' },
  { slug: 'tallinn', name_ru: null, name_en: 'Tallinn', country: 'EE' },
  { slug: 'amsterdam', name_ru: null, name_en: 'Amsterdam', country: 'NL' }
];