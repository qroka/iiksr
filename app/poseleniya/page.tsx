"use client";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

// CSS для анимации загрузки
const loadingStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Добавляем стили в head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = loadingStyles;
  document.head.appendChild(style);
}

// Типы для данных поселения


const settlements = [
  "Лянтор", "Сытомино", "Лямина", "Тундрино", "Солнечный", "Барсово", "Белый Яр", "Угут", "Локосово", "Ульт-Ягун", "Фёдоровский", "Русскинская",  "Нижнесортымский", 
];



const RADIUS = 300;
const CENTER = 500;

function getClosestIndex(rotation: number, count: number) {
  // 0 градусов — это горизонтально справа
  // rotation в градусах
  let minDiff = 360;
  let minIdx = 0;
  for (let i = 0; i < count; i++) {
    const angle = ((360 / count) * i + rotation) % 360;
    const diff = Math.abs((angle + 360) % 360);
    if (diff < minDiff) {
      minDiff = diff;
      minIdx = i;
    }
  }
  return minIdx;
}

function getActiveIndex(rotation: number, count: number) {
  const angleStep = 360 / count;
  for (let i = 0; i < count; i++) {
    // угол центра поселения относительно 0
    let angle = ((360 / count) * i + rotation) % 360;
    if (angle > 180) angle -= 360; // приводим к диапазону [-180, 180]
    if (angle >= -angleStep / 2 && angle < angleStep / 2) {
      return i;
    }
  }
  // fallback: ближайшее к 0°
  let minDiff = 360;
  let minIdx = 0;
  for (let i = 0; i < count; i++) {
    let angle = ((360 / count) * i + rotation) % 360;
    if (angle > 180) angle -= 360;
    let diff = Math.abs(angle);
    if (diff < minDiff) {
      minDiff = diff;
      minIdx = i;
    }
  }
  return minIdx;
}

// Координаты городов на PNG-карте (адаптированы под transform)
const cityCoords: Record<string, { x: number; y: number }> = {
  "Лянтор": { x: 3180.035, y: 3576.92 },
  "Белый Яр": { x: 4150.915, y: 4296.505 },
  "Барсово": { x: 4095.745, y: 4303.12 },
  "Сытомино": { x: 2332, y: 4104 },
  "Фёдоровский": { x: 4616.335, y: 3634.4 },
  "Русскинская": { x: 4268.38, y: 2300.8 },
  "Ульт-Ягун": { x: 5066, y: 3675.18 },
  "Нижнесортымский": { x: 2795, y: 1993},
  "Тундрино": { x: 3072.395, y: 4331.535 },
  "Угут": { x: 4535.065, y: 6660 },
  "Локосово": { x: 4782.58, y: 4886.29 },
  "Солнечный": { x: 3966.93, y: 4244.395 },
  "Лямина": { x: 2751.6, y: 4256.395 },
};

const MAP_WIDTH = 7313.63;
const MAP_HEIGHT = 9086.15;

export default function PoseleniyaCircle() {
  // Убираем margin у body только на этой странице
  useEffect(() => {
    const prevMargin = document.body.style.margin;
    document.body.style.margin = "0";
    return () => {
      document.body.style.margin = prevMargin;
    };
  }, []);

  const [rotation, setRotation] = useState(0); // в градусах
  const [markersVisible, setMarkersVisible] = useState(false);
  const dragging = useRef(false);
  const lastY = useRef(0);
  const lastRotation = useRef(0);

  // --- ДОБАВЛЕНО: refs для карты ---
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapImageRef = useRef<HTMLImageElement>(null);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });

  // --- ДОБАВЛЕНО: useEffect для центрирования карты ---
  // Центрировать на Лянтор при первой загрузке
  useEffect(() => {
    if (mapContainerRef.current) {
      const container = mapContainerRef.current;
      const coord = { x: 3180.035, y: 3576.92 };
      const targetX = container.clientWidth / 2 - coord.x;
      const targetY = container.clientHeight / 2 - coord.y;
      setMapPosition({ x: targetX, y: targetY });
    }
  }, []);

  // Показываем маркеры с задержкой
  useEffect(() => {
    const timer = setTimeout(() => {
      setMarkersVisible(true);
    }, 1000); // Задержка 1 секунда

    return () => clearTimeout(timer);
  }, []);

  // Определяем активное поселение
  const activeIdx = getActiveIndex(rotation, settlements.length);

  // useEffect для перемещения карты
  useEffect(() => {
    const activeCity = settlements[activeIdx];
    const coord = cityCoords[activeCity];
    
    // Анимируем перемещение карты через transform
    if (coord && mapContainerRef.current) {
      const container = mapContainerRef.current;
      const targetX = container.clientWidth / 2 - coord.x;
      const targetY = container.clientHeight / 2 - coord.y;
      
      // Плавная анимация через transform
      setMapPosition({ x: targetX, y: targetY });
    }
  }, [activeIdx]);

  // Drag handlers
  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    lastY.current = e.clientY;
    lastRotation.current = rotation;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    const deltaY = e.clientY - lastY.current;
    // 1 пиксель = 0.4 градуса (можно настроить)
    setRotation((lastRotation.current + deltaY * 0.4) % 360);
  }
  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    dragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    // Магнитим к ближайшему элементу
    const baseAngle = (360 / settlements.length) * activeIdx;
    // Нужно довести rotation так, чтобы baseAngle + rotation === 0 (mod 360)
    let targetRotation = (360 - baseAngle) % 360;
    // Анимируем быстро
    animateTo(targetRotation);
  }

  // Оптимизированная плавная анимация вращения
  function animateTo(target: number) {
    let start = rotation;
    // Кратчайший путь (например, с 350 до 10 — не через 0, а назад)
    let diff = ((target - start + 540) % 360) - 180;
    
    // Адаптивная длительность в зависимости от расстояния
    const distance = Math.abs(diff);
    const duration = Math.max(150, Math.min(400, distance * 1.5)); // Оптимизированная длительность
    
    let startTime: number | null = null;
    let animationId: number | null = null;
    
    function step(ts: number) {
      if (startTime === null) startTime = ts;
      let progress = Math.min((ts - startTime) / duration, 1);
      let next = (start + diff * easeOutCubic(progress)) % 360;
      setRotation(next);
      if (progress < 1) {
        animationId = requestAnimationFrame(step);
      } else {
        setRotation(target);
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      }
    }
    
    // Отменяем предыдущую анимацию если она есть
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    
    animationId = requestAnimationFrame(step);
  }
  
  function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }
  
  // Более плавная функция easing
  function easeOutQuart(t: number) {
    return 1 - Math.pow(1 - t, 4);
  }

  return (
    <>
      {/* Кнопка НАЗАД */}
      <button
        onClick={() => window.history.back()}
        style={{
          position: 'fixed',
          right: 128,
          bottom: 64,
          width: 257,
          height: 139,
          background: '#fff',
          color: 'var(--button-bg)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'ACTAYWIDE',
          fontSize: 32,
          cursor: 'pointer',
          zIndex: 1001,
        }}
      >
        НАЗАД
      </button>


      {/* --- КАРТА С ГОРОДАМИ --- */}
      <div
        ref={mapContainerRef}
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
          background: '#03515c',
          zIndex: 0,
        }}
        className="map-container"
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `translate(${mapPosition.x}px, ${mapPosition.y}px)`,
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform',
          }}
        >

        <img
          ref={mapImageRef}
          src="/map_sr.svg"
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          style={{ display: 'block', pointerEvents: 'none', userSelect: 'none', maxWidth: 'none' }}
          alt="Карта района"
          loading="eager"
          decoding="async"

        />
        {/* Маркеры городов */}
        {markersVisible && settlements.map((name, i) => {
          const coord = cityCoords[name];
          if (!coord) return null;
          const isActive = i === activeIdx;
          // fade-in/out через opacity и transition
          const svgSizes: Record<string, {w: number, h: number}> = {
            "Лянтор": { w: 226, h: 200 },
            "Белый Яр": { w: 74, h: 51 },
            "Солнечный": { w: 362, h: 141 },
            "Барсово": { w: 101, h: 119 },
            "Сытомино": { w: 378, h: 770 },
            "Тундрино": { w: 220, h: 175 },
            "Лямина": { w: 330, h: 247 },
            "Фёдоровский": { w: 153, h: 175 },
            "Ульт-Ягун": { w: 211, h: 396 },
            "Русскинская": { w: 517, h: 624 },
            "Нижнесортымский": { w: 97, h: 145 },
            "Угут": { w: 810, h: 2592 },
            "Локосово": { w: 436, h: 132 },
          };
          const size = svgSizes[name] || { w: 64, h: 64 };
          const fadeStyle: React.CSSProperties = {
            opacity: isActive ? 1 : 0,
            transition: 'opacity 1s cubic-bezier(0.4,0,0.2,1)', // Оптимизированная анимация
            pointerEvents: isActive ? 'auto' : 'none',
            willChange: 'opacity', // Оптимизация для GPU
          };
          return (
            <img
              key={name}
              src={`/${name}.svg`}
              alt={name}
              style={{
                position: 'absolute',
                left: coord.x - size.w / 2,
                top: coord.y - size.h / 2,
                width: size.w,
                height: size.h,
                zIndex: 2,
                cursor: 'pointer',
                transform: 'translateZ(0)', // Аппаратное ускорение
                ...fadeStyle,
              }}
              className="fade-marker"
              title={name}
              loading="lazy"
              decoding="async"
            />
          );
        })}
        </div>
      </div>
      {/* --- КОЛЕСО ВЫБОРА --- */}
      <div
        style={{
          position: "fixed",
          left: "50%",
          top: 980,
          height: "72px",
          transform: "translate(-50%, -50%)",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          borderRadius: 9999,
          padding: "24px 48px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          zIndex: 1000,
        }}
      >
        <img src="/rotate-left-03.svg" width={40} height={40} alt="rotate"/>
        <span style={{ color: "#fff", fontFamily: "ACTAYWIDE", fontSize: 24, fontWeight: 700, textAlign: "center" }}>
          Выберите населённый пункт
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          width: CENTER * 2,
          height: CENTER * 2,
          borderRadius: "50%",
          touchAction: "none",
          userSelect: "none",
          left: -150,
          top: 0,
        }}
        className="wheel-container"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {settlements.map((name, i) => {
          // Учитываем общий rotation
          const baseAngle = (360 / settlements.length) * i;
          const angle = ((baseAngle + rotation) % 360) * (Math.PI / 180);
          const x = CENTER + RADIUS * Math.cos(angle);
          const y = CENTER + RADIUS * Math.sin(angle);
          const deg = (baseAngle + rotation) % 360;0
          const isActive = i === activeIdx;
          return (
            <div
              key={name}
              style={{
                position: "absolute",
                left: `${(x - CENTER).toFixed(2)}px`, // всегда строка с px
                top: `${y.toFixed(2)}px`, // всегда строка с px
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isActive ? "#fff" : "#01353D",
                color: isActive ? "#03515c" : "#fff",
                borderRadius: 9999,
                fontSize: 64,
                padding: "12px 32px",
                fontFamily: "sans-serif",
                transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                cursor: "pointer",
                userSelect: "none",
                whiteSpace: "nowrap",
                // Центрируем относительно центра кнопки, как было раньше
                transform: `translate(0%, 0%) rotate(${deg}deg)` ,
                transformOrigin: "0% 0%",
                zIndex: isActive ? 2 : 1,
              }}
            >
              {name}
            </div>
          );
        })}
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          width: 0px;
          height: 0px;
        }
        .fade-marker {
          opacity: 0;
          transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .fade-marker[style*="opacity: 1"] {
          opacity: 1;
        }
        
        /* Оптимизация для плавной анимации */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Оптимизация для карты */
        .map-container {
          will-change: scroll-position;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        /* Оптимизация для колеса выбора */
        .wheel-container {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        /* Оптимизация для маркеров */
        .fade-marker {
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </>
  );
}

