import { Settlement, SettlementsData } from '../types/settlements';

// Данные поселений (встроенные в код для избежания проблем с импортом JSON)
const data: SettlementsData = {
  settlements: [
    {
      name: "Городское посление Лянтор",
      flag_url: "/Флаги поселений/Лянтор.png",
      foundation_date: "1931",
      population: 42.5,
      area: 87.6,
      distance_to_khanty: 360,
      distance_to_moscow: 2850,
      workers: 59.6,
      investments: 9,
      description: "Город в Сургутском районе Ханты-Мансийского автономного округа - Югры, центр Лянторского городского поселения."
    },
    {
      name: "Сельское посление Сытомино",
      flag_url: "/Флаги поселений/Сытомино.png",
      foundation_date: "1924",
      population: 1.3,
      area: 236.2,
      distance_to_khanty: 470,
      distance_to_moscow: 2950,
      workers: 59.6, 
      investments: 9,
      description: "Село в Сургутском районе Ханты-Мансийского автономного округа - Югры, административный центр Сытоминского сельского поселения."
    },
    {
      name: "Сельское посление Лямина",
      flag_url: "/Флаги поселений/Лямина.png",
      foundation_date: "1926",
      population: 1.1,
      area: 0.7,
      distance_to_khanty: 440,
      distance_to_moscow: 2920,
      workers: 59.6,
      investments: 9,
      description: "Село в Сургутском районе Ханты-Мансийского автономного округа - Югры, административный центр Ляминского сельского поселения."
    },
    {
      name: "Сельское посление Тундрино",
      flag_url: "/Флаги поселений/Тундрино.png",
      foundation_date: "1924",
      population: 0.5,
      area: 37.4,
      distance_to_khanty: 282,
      distance_to_moscow: 2770,
      workers: 59.6,
      investments: 9,
      description: "Село в Сургутском районе Ханты-Мансийского автономного округа - Югры, административный центр Тундринского сельского поселения."
    },
    {
      name: "Сельское посление Солнечный",
      flag_url: "/Флаги поселений/Солнечный.png",
      foundation_date: "1980",
      population: 14.3,
      area: 73.3,
      distance_to_khanty: 291,
      distance_to_moscow: 2770,
      workers: 59.6, 
      investments: 9,
      description: "Посёлок городского типа в Сургутском районе Ханты-Мансийского автономного округа - Югры, административный центр Солнечного городского поселения."
    },
    {
      name: "Городское посление Барсово",
      flag_url: "/Флаги поселений/Барсово.png",
      foundation_date: "1971",
      population: 6.3,
      area: 19.8,
      distance_to_khanty: 282,
      distance_to_moscow: 2770,
      workers: 59.6, 
      investments: 9,
      description: "Посёлок городского типа в Сургутском районе Ханты-Мансийского автономного округа - Югры, административный центр Барсовского городского поселения."
    },
    {
      name: "Городское посление Белый Яр",
      flag_url: "/Флаги поселений/Белый Яр.png",
      foundation_date: "1900",
      population: 18.3,
      area: 7.1,
      distance_to_khanty: 292,
      distance_to_moscow: 2780,
      workers: 59.6, 
      investments: 9,
      description: "Посёлок городского типа в Сургутском районе Ханты-Мансийского автономного округа - Югры, административный центр Белоярского городского поселения."
    },
    {
      name: "Сельское посление Угут",
      flag_url: "/Флаги поселений/Угут.png",
      foundation_date: "1809",
      population: 2.8,
      area: 686.5,
      distance_to_khanty: 390,
      distance_to_moscow: 2780,
      workers: 59.6, 
      investments: 9,
      description: "Село в Сургутском районе Ханты-Мансийского автономного округа - Югры, административный центр Угутского сельского поселения."
    },
    {
      name: "Сельское посление Локосово",
      flag_url: "/Флаги поселений/Локосово.png",
      foundation_date: "1716",
      population: 1,
      area: 89.8,
      distance_to_khanty: 460,
      distance_to_moscow: 2950,
      workers: 59.6, 
      investments: 9,
      description: "Село в Сургутском районе Ханты-Мансийского автономного округа - Югры, административный центр Локосовского сельского поселения."
    },
    {
      name: "Сельское посление Ульт-Ягун",
      flag_url: "/Флаги поселений/Ульт-Ягун.png",
      foundation_date: "1977",
      population: 2.4,
      area: 79.2,
      distance_to_khanty: 380,
      distance_to_moscow: 2860,
      workers: 59.6, 
      investments: 9,
      description: "Посёлок городского типа в Сургутском районе Ханты-Мансийского автономного округа - Югры, административный центр Ульт-Ягунского городского поселения."
    },
    {
      name: "Городское посление Фёдоровский",
      flag_url: "/Флаги поселений/Фёдоровский.png",
      foundation_date: "1984",
      population: 24.5,
      area: 60.1,
      distance_to_khanty: 350,
      distance_to_moscow: 2830,
      workers: 59.6, 
      investments: 9,
      description: "Посёлок городского типа в Сургутском районе Ханты-Мансийского автономного округа - Югры, административный центр Фёдоровского городского поселения."
    },
    {
      name: "Сельское посление Русскинская",
      flag_url: "/Флаги поселений/Русскинская.png",
      foundation_date: "1949",
      population: 1.9,
      area: 0.2,
      distance_to_khanty: 450,
      distance_to_moscow: 2940,
      workers: 59.6, 
      investments: 9,
      description: "Село в Сургутском районе Ханты-Мансийского автономного округа - Югры, административный центр Русскинского сельского поселения."
    },
    {
      name: "Сельское посление Нижнесортымский",
      flag_url: "/Флаги поселений/Нижнесортымский.png",
      foundation_date: "1991",
      population: 13.9,
      area: 15.5,
      distance_to_khanty: 480,
      distance_to_moscow: 2960,
      workers: 59.6, 
      investments: 9,
      description: "Посёлок городского типа в Сургутском районе Ханты-Мансийского автономного округа - Югры, административный центр Нижнесортымского городского поселения."
    }
  ]
};

/**
 * Получить все поселения
 */
export function getAllSettlements(): Settlement[] {
  return data.settlements;
}

/**
 * Найти поселение по названию
 */
export function getSettlementByName(name: string): Settlement | undefined {
  return data.settlements.find(settlement => settlement.name === name);
}

/**
 * Получить поселение по индексу
 */
export function getSettlementByIndex(index: number): Settlement | undefined {
  return data.settlements[index];
}

/**
 * Получить количество поселений
 */
export function getSettlementsCount(): number {
  return data.settlements.length;
}

/**
 * Получить массив названий поселений
 */
export function getSettlementNames(): string[] {
  return data.settlements.map(settlement => settlement.name);
} 