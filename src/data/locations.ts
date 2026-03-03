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
  { slug: 'osipovichi', name_ru: 'Осиповичах', name_en: 'Osipovichi', country: 'BY' },

  // --- Россия ---
  { slug: 'moscow', name_ru: 'Москве', name_en: 'Moscow', country: 'RU' },
  { slug: 'saint-petersburg', name_ru: 'Санкт-Петербурге', name_en: 'Saint Petersburg', country: 'RU' },
  { slug: 'novosibirsk', name_ru: 'Новосибирске', name_en: 'Novosibirsk', country: 'RU' },
  { slug: 'yekaterinburg', name_ru: 'Екатеринбурге', name_en: 'Yekaterinburg', country: 'RU' },
  { slug: 'kazan', name_ru: 'Казани', name_en: 'Kazan', country: 'RU' },
  { slug: 'krasnodar', name_ru: 'Краснодаре', name_en: 'Krasnodar', country: 'RU' },
  { slug: 'sochi', name_ru: 'Сочи', name_en: 'Sochi', country: 'RU' },

  // --- Казахстан ---
  { slug: 'almaty', name_ru: 'Алматы', name_en: 'Almaty', country: 'KZ' },
  { slug: 'astana', name_ru: 'Астане', name_en: 'Astana', country: 'KZ' },
  { slug: 'karaganda', name_ru: 'Караганде', name_en: 'Karaganda', country: 'KZ' },
  { slug: 'shymkent', name_ru: 'Шымкенте', name_en: 'Shymkent', country: 'KZ' },

  // --- Европа (только английский) ---
  { slug: 'london', name_ru: null, name_en: 'London', country: 'GB' },
  { slug: 'manchester', name_ru: null, name_en: 'Manchester', country: 'GB' },
  { slug: 'birmingham', name_ru: null, name_en: 'Birmingham', country: 'GB' },
  { slug: 'edinburgh', name_ru: null, name_en: 'Edinburgh', country: 'GB' },
  { slug: 'glasgow', name_ru: null, name_en: 'Glasgow', country: 'GB' },

  { slug: 'paris', name_ru: null, name_en: 'Paris', country: 'FR' },
  { slug: 'lyon', name_ru: null, name_en: 'Lyon', country: 'FR' },
  { slug: 'marseille', name_ru: null, name_en: 'Marseille', country: 'FR' },
  { slug: 'toulouse', name_ru: null, name_en: 'Toulouse', country: 'FR' },

  { slug: 'berlin', name_ru: null, name_en: 'Berlin', country: 'DE' },
  { slug: 'munich', name_ru: null, name_en: 'Munich', country: 'DE' },
  { slug: 'frankfurt', name_ru: null, name_en: 'Frankfurt', country: 'DE' },
  { slug: 'hamburg', name_ru: null, name_en: 'Hamburg', country: 'DE' },
  { slug: 'cologne', name_ru: null, name_en: 'Cologne', country: 'DE' },
  { slug: 'stuttgart', name_ru: null, name_en: 'Stuttgart', country: 'DE' },

  { slug: 'madrid', name_ru: null, name_en: 'Madrid', country: 'ES' },
  { slug: 'barcelona', name_ru: null, name_en: 'Barcelona', country: 'ES' },
  { slug: 'valencia', name_ru: null, name_en: 'Valencia', country: 'ES' },
  { slug: 'seville', name_ru: null, name_en: 'Seville', country: 'ES' },

  { slug: 'rome', name_ru: null, name_en: 'Rome', country: 'IT' },
  { slug: 'milan', name_ru: null, name_en: 'Milan', country: 'IT' },
  { slug: 'naples', name_ru: null, name_en: 'Naples', country: 'IT' },
  { slug: 'turin', name_ru: null, name_en: 'Turin', country: 'IT' },

  { slug: 'warsaw', name_ru: null, name_en: 'Warsaw', country: 'PL' },
  { slug: 'krakow', name_ru: null, name_en: 'Krakow', country: 'PL' },
  { slug: 'wroclaw', name_ru: null, name_en: 'Wroclaw', country: 'PL' },
  { slug: 'poznan', name_ru: null, name_en: 'Poznan', country: 'PL' },

  { slug: 'prague', name_ru: null, name_en: 'Prague', country: 'CZ' },
  { slug: 'amsterdam', name_ru: null, name_en: 'Amsterdam', country: 'NL' },
  { slug: 'vilnius', name_ru: null, name_en: 'Vilnius', country: 'LT' },
  { slug: 'riga', name_ru: null, name_en: 'Riga', country: 'LV' },
  { slug: 'tallinn', name_ru: null, name_en: 'Tallinn', country: 'EE' },

  // --- Ближний Восток и Азия (только английский) ---
  { slug: 'dubai', name_ru: null, name_en: 'Dubai', country: 'AE' },
  { slug: 'abu-dhabi', name_ru: null, name_en: 'Abu Dhabi', country: 'AE' },
  { slug: 'singapore', name_ru: null, name_en: 'Singapore', country: 'SG' },
  { slug: 'tokyo', name_ru: null, name_en: 'Tokyo', country: 'JP' },

  // --- Северная Америка и Океания (только английский) ---
  { slug: 'new-york', name_ru: null, name_en: 'New York', country: 'US' },
  { slug: 'los-angeles', name_ru: null, name_en: 'Los Angeles', country: 'US' },
  { slug: 'chicago', name_ru: null, name_en: 'Chicago', country: 'US' },
  { slug: 'miami', name_ru: null, name_en: 'Miami', country: 'US' },
  { slug: 'austin', name_ru: null, name_en: 'Austin', country: 'US' },
  { slug: 'san-francisco', name_ru: null, name_en: 'San Francisco', country: 'US' },
  { slug: 'seattle', name_ru: null, name_en: 'Seattle', country: 'US' },
  { slug: 'denver', name_ru: null, name_en: 'Denver', country: 'US' },
  { slug: 'boston', name_ru: null, name_en: 'Boston', country: 'US' },
  { slug: 'houston', name_ru: null, name_en: 'Houston', country: 'US' },
  { slug: 'atlanta', name_ru: null, name_en: 'Atlanta', country: 'US' },
  { slug: 'las-vegas', name_ru: null, name_en: 'Las Vegas', country: 'US' },
  { slug: 'washington', name_ru: null, name_en: 'Washington D.C.', country: 'US' },

  { slug: 'toronto', name_ru: null, name_en: 'Toronto', country: 'CA' },
  { slug: 'vancouver', name_ru: null, name_en: 'Vancouver', country: 'CA' },
  { slug: 'montreal', name_ru: null, name_en: 'Montreal', country: 'CA' },
  { slug: 'calgary', name_ru: null, name_en: 'Calgary', country: 'CA' },

  { slug: 'sydney', name_ru: null, name_en: 'Sydney', country: 'AU' },
  { slug: 'melbourne', name_ru: null, name_en: 'Melbourne', country: 'AU' },
  { slug: 'brisbane', name_ru: null, name_en: 'Brisbane', country: 'AU' },
  { slug: 'perth', name_ru: null, name_en: 'Perth', country: 'AU' },
  { slug: 'adelaide', name_ru: null, name_en: 'Adelaide', country: 'AU' }
];