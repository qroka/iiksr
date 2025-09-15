'use client';

import React, { useMemo } from 'react';
import SettlementHeader from '../../../components/SettlementHeader';
import ActionButtons from '../../../components/ActionButtons';
import TourismCard from '../../../components/TourismCard';
import lyantorData from '../../../data/lyantor.json';
import { getCategoriesByCity } from '../../../utils/tourism';

export default function LyantorTourismPage() {
  // Мемоизируем получение категорий достопримечательностей для Лянтора
  const lyantorCategories = useMemo(() => {
    return getCategoriesByCity("Лянтор");
  }, []);

  const handleCardClick = React.useCallback((categoryName: string) => {
    console.log(`Clicked on category ${categoryName}`);
    // Здесь можно добавить навигацию к детальной странице категории
  }, []);

  return (
    <div>
      {/* Хедер поселения */}
      <SettlementHeader
        name={lyantorData.name}
        flagUrl={lyantorData.flag_url}
      />

      {/* Основной контент */}
      <div>
        {/* Карточки туризма */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          margin: '47px 0px 24px 0px',
        }}>
          {lyantorCategories.map((category) => (
            <TourismCard
              key={category.name}
              category={category}
              onClick={() => handleCardClick(category.name)}
            />
          ))}
        </div>

        {/* Кнопки действий */}
        <ActionButtons
          onHistory={() => window.history.back()}
          onInvestments={() => window.history.back()}
          onTourism={() => window.history.back()}
          onBack={() => window.history.back()}
          disabledHistory={false}
          disabledInvestments={false}
          disabledTourism={true}
        />
      </div>
    </div>
  );
} 