'use client'

import { HeaderTitle, StaticLabel, AnimatedText, InfoButton, RuButton, HomeButton, TurizmCard, GlavaCard, GlavaContainer } from '../components';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

export default function RayonPage() {
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
            <Image src="/Логотип.svg" width={34} height={34} alt="Логотип" style={{ marginLeft: 8 }} />
          </div>
        </div>
      </header>
      <div style={{ display: 'flex', justifyContent: 'start', marginTop: 52, gap: 24 }}>
        <GlavaCard />
        <GlavaContainer />
      </div>
      {/* Фиксированные кнопки Info, RU и Home в правом нижнем углу */}
      <div
        style={{
          position: 'fixed',
          left: 1820,
          top: 776,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          zIndex: 1000,
        }}
      >
      </div>
    </>
  );
}
