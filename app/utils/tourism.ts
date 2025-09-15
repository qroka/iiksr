import tourismData from '../data/tourism-attractions.json';

export interface TourismAttraction {
  id: number;
  city: string;
  category: string;
  name: string;
  description: string;
  photos: string[];
  mainPhoto: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  workingHours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface TourismCategory {
  name: string;
  count: number;
  mainPhoto: string;
}

export function getAttractionsByCity(cityName: string): TourismAttraction[] {
  return tourismData.attractions.filter(
    attraction => attraction.city === cityName
  );
}

export function getCategoriesByCity(cityName: string): TourismCategory[] {
  const attractions = getAttractionsByCity(cityName);
  const categoryMap = new Map<string, { count: number; mainPhoto: string }>();
  
  attractions.forEach(attraction => {
    if (categoryMap.has(attraction.category)) {
      const existing = categoryMap.get(attraction.category)!;
      existing.count += 1;
    } else {
      categoryMap.set(attraction.category, {
        count: 1,
        mainPhoto: attraction.mainPhoto
      });
    }
  });
  
  return Array.from(categoryMap.entries()).map(([name, data]) => ({
    name,
    count: data.count,
    mainPhoto: data.mainPhoto
  }));
}

export function getAttractionsByCategory(cityName: string, categoryName: string): TourismAttraction[] {
  return tourismData.attractions.filter(
    attraction => attraction.city === cityName && attraction.category === categoryName
  );
}

export function getAllAttractions(): TourismAttraction[] {
  return tourismData.attractions;
} 