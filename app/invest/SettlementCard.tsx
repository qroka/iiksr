import React from 'react';

interface Props {
  flag_url: string;
  name: string;
  foundation_date: string;
  population: number;
  area: number;
  distance_to_khanty: number;
  workers: number;
  distance_to_moscow: number;
  investments: number;
  onBack: () => void;
  onLearnMore?: () => void; // обработчик для кнопки "УЗНАТЬ ПОДРОБНЕЕ"
  dataReady?: boolean; // готовы ли данные для отображения
}

export default function SettlementCard({
  flag_url,
  name,
  foundation_date,
  population,
  area,
  distance_to_khanty,
  investments,
  onLearnMore,
  workers,
  dataReady = true,
}: Props) {
  return (
    <div style={{
      background: 'var(--white)',
      padding: 30,
      width: 538,
      fontFamily: 'ACTAYWIDE',
    }}>
      <img 
        src={flag_url} 
        alt="Флаг" 
        style={{ 
          width: 150, 
          height: 100, 
          marginBottom: 24,
        }} 
      />
      <div style={{ 
        fontSize: 36, 
        color: 'var(--fond-night)', 
        marginBottom: 12,
      }}>
        {dataReady ? name : ''}
      </div>
      <div style={{ 
        color: 'var(--gray-text)', 
        marginBottom: 12,
        fontSize: 24,
      }}>
        Дата основания: <a style={{ color: 'var(--fond-night)', fontSize: 32 }}>{dataReady ? foundation_date : ''}</a>
      </div>
      <div style={{ 
        color: 'var(--gray-text)', 
        marginBottom: 12,
        fontSize: 24,
      }}>
        Население: <a style={{ color: 'var(--fond-night)', fontSize: 32 }}>{dataReady ? population.toLocaleString('ru-RU') : ''} тыс. чел.</a>
      </div>
      <div style={{ 
        color: 'var(--gray-text)', 
        marginBottom: 12,
        fontSize: 24,
      }}>
        Площадь: <a style={{ color: 'var(--fond-night)', fontSize: 32 }}>{dataReady ? area : ''} км²</a>
      </div>
      <div style={{ 
        color: 'var(--gray-text)', 
        marginBottom: 12,
        fontSize: 24,
      }}>
        До Ханты-Мансийска: <a style={{ color: 'var(--fond-night)', fontSize: 32 }}>{dataReady ? distance_to_khanty : ''} км</a>
      </div>
      <div style={{ 
        color: 'var(--gray-text)', 
        marginBottom: 12,
        fontSize: 24,
      }}>
        Занятого населения: <a style={{ color: 'var(--fond-night)', fontSize: 32 }}>{dataReady ? workers : ''} %</a>
      </div>
      <div style={{ 
        color: 'var(--gray-text)', 
        marginBottom: 20,
        fontSize: 24,
      }}>
        Инвест. площдаки: <a style={{ color: 'var(--fond-night)', fontSize: 32 }}>{dataReady ? investments : ''} шт.</a>
      </div>
      <button 
        onClick={onLearnMore}
        style={{
          width: '100%',
          height: 76,
          color: 'var(--white)',
          border: 'none',
          background: 'var(--red)',
          borderRadius: 999,
          padding: '16px 0',
          fontSize: 22,
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
      >
        УЗНАТЬ ПОДРОБНЕЕ
      </button>
    </div>
  );
} 