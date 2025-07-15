'use client';

import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import React from 'react';
import { InvestCard, RayonCard, TurizmCard, HeaderTitle, StaticLabel, AnimatedText, InfoButton, RuButton } from './components';

export default function Page() {
  const texts = ['инвесторов', 'бизнеса', 'новых идей', 'устойчивого развития', 'туризма', 'комфортной жизини','прогресса', 'надёжного будущего',];

  return (
    <>
      <header style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
          {/* Левый блок — основной */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <HeaderTitle />
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <StaticLabel />
              <AnimatedText texts={texts} />
            </div>
          </div>
          {/* Правый блок — текст и логотип */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '8px', marginTop: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right', color: '#A6A7AC', fontSize: 20, lineHeight: '0.95', fontFamily: 'ACTAY', fontWeight: 400 }}>
              <span>Сургутский муниципальный район</span>
              <span>Ханты-Мансийского автономного округа - Югры</span>
            </div>
            <img src="/Логотип.svg" width={34} height={34} alt="Логотип" style={{ marginLeft: 8 }} />
          </div>
        </div>
      </header>
      {/* Секция карточек: три тематические карточки с разными иконками, цветами и переходами */}
      <section
        style={{
          marginTop: 64,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: 24,
          justifyContent: 'center',
        }}
      >
        {/* Карточка "Инвест-Атлас" (зелёная) */}
        <InvestCard />
        {/* Карточка "Наш район" (синяя) */}
        <RayonCard />
        {/* Карточка "Туризм Сор-Кут" (зелёная) */}
        <TurizmCard />
        {/* Можно добавить дополнительные карточки по аналогии */}
      </section>

      {/* Фиксированные кнопки Info и RU в правом нижнем углу */}
      <div
        style={{
          position: 'fixed',
          left: 1820,
          top: 860,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          zIndex: 1000,
        }}
      >
        <InfoButton />
        <RuButton />
      </div>
    </>
  );
}
