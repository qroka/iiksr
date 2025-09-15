import React from 'react';
import Image from 'next/image';

interface SettlementHeaderProps {
  flagUrl: string;
  name: string;
}

export default function SettlementHeader({
  flagUrl,
  name,
}: SettlementHeaderProps) {
  return (
    <header style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', }}>
        {/* Левый блок — название поселения и флаг */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Image
              src={flagUrl}
              alt={`Флаг ${name}`}
              width={159}
              height={106}
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 120px, 159px"
              priority
            />
            <span
              style={{
                fontFamily: 'ACTAYWIDE',
                fontSize: 64,
                color: 'var(--button-bg)',
                lineHeight: 0.9,
                height: 106, 
              }}
            >
              {name}
            </span>
          </div>
        </div>
                                {/* Правый блок — текст и логотип */}
           <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '16px', marginTop: '8px'}}>
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right', color: '#A6A7AC', fontSize: 20, lineHeight: '0.95', fontFamily: 'ACTAY', fontWeight: 400, flexShrink: 1 }}>
               <span style={{ whiteSpace: 'nowrap' }}>Сургутский муниципальный район</span>
               <span style={{ whiteSpace: 'nowrap' }}>Ханты-Мансийского автономного округа - Югры</span>
             </div>
             <Image src="/Логотип.svg" width={34} height={34} alt="Логотип" style={{ flexShrink: 0 }} />
          </div>
      </div>
    </header>
  );
} 