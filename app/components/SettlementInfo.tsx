import React from 'react';

interface SettlementInfoProps {
  title: string;
  description: string;
  foundationDate: string;
  population: number;
  area: number;
  distanceToSurgut: number;
  distanceToKhanty: number;
  distanceToMoscow: number;
}

export default function SettlementInfo({
  title,
  description,
  foundationDate,
  population,
  area,
  distanceToSurgut,
  distanceToKhanty,
  distanceToMoscow
}: SettlementInfoProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
    }}>
             {/* Описание */}
       <div style={{
         fontSize: 24,
         lineHeight: 1.6,
         color: 'var(--main-text)',
         background: 'var(--white)',
         padding: 30,
         fontFamily: 'ACTAY',
         height: 228,
       }}>
         <strong style={{ color: '#03515c', fontSize: 32, fontFamily: 'ACTAYWIDE' }}>{title}</strong> {description}
       </div>

      {/* Статистика */}
      <div style={{
        background: 'var(--white)',
        padding: 30,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 6,
      }}>
        <div style={{   }}>
          <div style={{ color: 'var(--main-text)', fontSize: 24,  fontFamily: 'ACTAY', height: 24}}>
            Год основания:
          </div>
          <div style={{ color: '#03515c', fontSize: 32 }}>
            {foundationDate} год
          </div>
        </div>

        <div style={{   }}>
          <div style={{ color: 'var(--main-text)', fontSize: 24,  fontFamily: 'ACTAY', height: 24 }}>
            Население:
          </div>
          <div style={{ color: '#03515c', fontSize: 32 }}>
            {population} тыс. чел.
          </div>
        </div>

        <div style={{   }}>
          <div style={{ color: 'var(--main-text)', fontSize: 24,  fontFamily: 'ACTAY', height: 24 }}>
            Площадь:
          </div>
          <div style={{ color: '#03515c', fontSize: 32 }}>
            {area} км²
          </div>
        </div>

        <div style={{   }}>
          <div style={{ color: 'var(--main-text)', fontSize: 24,  fontFamily: 'ACTAY', height: 24 }}>
            До Сургута:
          </div>
          <div style={{ color: '#03515c', fontSize: 32 }}>
            {distanceToSurgut} км
          </div>
        </div>

        <div style={{   }}>
          <div style={{ color: 'var(--main-text)', fontSize: 24,  fontFamily: 'ACTAY', height: 24 }}>
            До Ханты-Мансийска:
          </div>
          <div style={{ color: '#03515c', fontSize: 32 }}>
            {distanceToKhanty} км
          </div>
        </div>

        <div style={{  }}>
          <div style={{ color: 'var(--main-text)', fontSize: 24,  fontFamily: 'ACTAY',  height: 24 }}>
            До Москвы:
          </div>
          <div style={{ color: '#03515c', fontSize: 32 }}>
            {distanceToMoscow} км
          </div>
        </div>
      </div>
            <button style={{
        background: '#D9EDF2',
        color: '#03515c', 
        padding: '0px 30px', 
        width: '100%', 
        height: 72, 
        borderRadius: 999, 
        fontSize: 22,
        margin: 0,
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
      }}>
        ОФИЦИАЛЬНЫЕ РЕСУРСЫ ПОСЕЛЕНИЯ
        <img src="/arrow-green.svg" alt="Стрелка" style={{ width: 26, height: 24 }} />
      </button>
    </div>
  );
} 