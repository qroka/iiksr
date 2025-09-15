export interface Settlement {
  name: string;
  flag_url: string;
  foundation_date: string;
  population: number;
  area: number;
  distance_to_khanty: number;
  distance_to_moscow: number;
  workers: number;
  description: string;
  investments: number;
}

export interface SettlementsData {
  settlements: Settlement[];
} 