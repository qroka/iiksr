"use client";
import React from 'react';
import { BackButton } from '../../components';
import PhotoSlider from '../../components/PhotoSlider';
import ActionButtons from '../../components/ActionButtons';
import SettlementHeader from '../../components/SettlementHeader';
import SettlementInfo from '../../components/SettlementInfo';
import lyantorData from '../../data/lyantor.json';
import lyantorPhotos from '../../data/lyantor-photos.json';

interface Photo {
  id: number;
  url: string;
  title: string;
  alt: string;
}

export default function LyantorPage() {
  const photos: Photo[] = lyantorPhotos.photos;

  return (
    <div style={{
      fontFamily: 'ACTAYWIDE',
      position: 'relative'
    }}>

      {/* Header */}
      <SettlementHeader
        flagUrl={lyantorData.flag_url}
        name={lyantorData.name}
      />

      {/* Основной контент */}
      <div style={{
        display: 'flex',
        gap: 24,
        alignItems: 'start',
        margin:  '42px 0px 24px 0px',
      }}>
        {/* Левая колонка - фотографии */}
        <div>
          <PhotoSlider photos={photos}/>
        </div>

        {/* Правая колонка - информация */}
        <SettlementInfo
          title={lyantorData.short_name}
          description={lyantorData.description}
          foundationDate={lyantorData.foundation_date}
          population={lyantorData.population}
          area={lyantorData.area}
          distanceToSurgut={lyantorData.distance_to_surgut}
          distanceToKhanty={lyantorData.distance_to_khanty}
          distanceToMoscow={lyantorData.distance_to_moscow}
        />
      </div>

      {/* Нижние кнопки */}
      <ActionButtons
        onHistory={() => console.log('История Лянтора')}
        onInvestments={() => console.log('Инвестиции Лянтора')}
        onTourism={() => window.location.href = '/citys/lyantor/tourism'}
      />
    </div>
  );
} 