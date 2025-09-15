'use client';

import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { InvestCard, RayonCard, TurizmCard, HeaderTitle, StaticLabel, AnimatedText, InfoButton, RuButton } from './components';
import { motion } from 'framer-motion';

export default function Page() {
  // Массив текстов для анимированного блока (меняются по очереди)
  const texts = [
    'инвесторов',
    'бизнеса',
    'новых идей',
    'устойчивого развития',
    'туризма',
    'комфортной жизини',
    'прогресса',
    'надёжного будущего',
  ];

  // Индекс карточки, на которой сейчас shine-анимация
  const [shineIndex, setShineIndex] = React.useState(0);
  const [shineActive, setShineActive] = React.useState(false);
  const SHINE_INTERVAL_MS = 5000;
  const SHINE_DURATION_MS = 1500;

  // Меняем shineIndex с нужной частотой
  React.useEffect(() => {
    const interval = setInterval(() => {
      setShineIndex((prev) => (prev + 1) % 3);
    }, SHINE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  // Включаем shineActive на короткое время при каждом изменении shineIndex
  React.useEffect(() => {
    setShineActive(true);
    const timeout = setTimeout(() => setShineActive(false), SHINE_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [shineIndex]);

  return (
    <div suppressHydrationWarning={true}>
      {/* Шапка сайта: содержит основной заголовок, статичный и анимированный текст, а также информацию о районе и логотип */}
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
            <Image src="/Логотип.svg" width={34} height={34} alt="Логотип" style={{ marginLeft: 8 }} />
          </div>
        </div>
      </header>

      {/* Секция карточек: три тематические карточки с разными иконками, цветами и переходами */}
      <section
        style={{
          marginTop: 52,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: 24,
          justifyContent: 'center',
        }}
      >
        {/* shine=true только для одной карточки за раз, но теперь каждая карточка обёрнута в ссылку */}
        <Link href="/invest" style={{ textDecoration: 'none' }}>
          <InvestCard shine={shineActive && shineIndex === 0} />
        </Link>
        <Link href="/rayon" style={{ textDecoration: 'none' }}>
          <RayonCard shine={shineActive && shineIndex === 2} />
        </Link>
        <Link href="/turizm" style={{ textDecoration: 'none' }}>
          <TurizmCard shine={shineActive && shineIndex === 1} />
        </Link>
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
      </div>
    </div>
  );
}
