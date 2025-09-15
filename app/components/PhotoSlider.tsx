import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Photo {
  id: number;
  url: string;
  title: string;
  alt: string;
}

interface PhotoSliderProps {
  photos: Photo[];
}

export default function PhotoSlider({ photos }: PhotoSliderProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(true);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const manualInteractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const AUTO_PLAY_INTERVAL = 3000; // 3 секунд между автоматическими переходами
  const MANUAL_INTERACTION_DELAY = 8000; // 8 секунд задержки после ручного взаимодействия

  // Функция для перехода к следующему слайду
  const goToNext = () => {
    const nextIndex = (currentPhotoIndex + 1) % photos.length;
    setCurrentPhotoIndex(nextIndex);
  };

  // Функция для перехода к предыдущему слайду
  const goToPrev = () => {
    const prevIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    setCurrentPhotoIndex(prevIndex);
  };

  // Функция для обработки ручного взаимодействия
  const handleManualInteraction = () => {
    setIsAutoPlayActive(false);
    
    // Очищаем предыдущий таймаут
    if (manualInteractionTimeoutRef.current) {
      clearTimeout(manualInteractionTimeoutRef.current);
    }
    
    // Устанавливаем таймаут для возобновления автоплея
    manualInteractionTimeoutRef.current = setTimeout(() => {
      setIsAutoPlayActive(true);
    }, MANUAL_INTERACTION_DELAY);
  };

  // Автоматическое перелистывание
  useEffect(() => {
    if (isAutoPlayActive) {
      autoPlayTimeoutRef.current = setTimeout(() => {
        goToNext();
      }, AUTO_PLAY_INTERVAL);
    }

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [currentPhotoIndex, isAutoPlayActive]);

  // Очистка таймаутов при размонтировании компонента
  useEffect(() => {
    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
      if (manualInteractionTimeoutRef.current) {
        clearTimeout(manualInteractionTimeoutRef.current);
      }
    };
  }, []);

  const onChange = (index: number) => {
    setCurrentPhotoIndex(index);
  };

  if (!photos.length) {
    return (
      <div style={{
        background: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        fontSize: 16,
        width: 961,
        height: 540,
      }}>
        Нет доступных изображений
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Основное изображение */}
      <div style={{
        marginBottom: 24,
        width: 961,
        height: 540,
      }}>
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
          infiniteLoop={true}
          autoPlay={false}
          interval={3000}
          transitionTime={500}
          onChange={(index) => {
            onChange(index);
            handleManualInteraction();
          }}
          selectedItem={currentPhotoIndex}
          width={961}
          dynamicHeight={false}
          emulateTouch={true}
          swipeable={true}
          useKeyboardArrows={true}
          onClickItem={() => handleManualInteraction()}
        >
          {photos.map((photo) => (
            <div key={photo.id} style={{ position: 'relative', width: 961, height: 540 }}>
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                style={{ objectFit: 'cover' }}
                sizes="961px"
                priority={photo.id === 1}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Подпись к изображению с кнопками навигации */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{
          background: '#D9EDF2',
          color: '#03515c',
          borderRadius: 999,
          fontSize: 24,
          fontFamily: 'ACTAY',
          padding: '18px 32px',
          width: 'fit-content',
          transition: 'all 0.3s ease-in-out',
          transform: 'scale(1)',
        }}>
          {photos[currentPhotoIndex].title}
        </span>
        
        {/* Навигационные кнопки */}
        <div style={{
          display: 'flex',
          gap: 12
        }}>
          <button
            onClick={() => {
              handleManualInteraction();
              goToPrev();
            }}
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: '#03515c',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
            }}
          >
            <img 
              src="/arrow_back.svg" 
              alt="Назад" 
              style={{ width: 32, height: 32 }}
            />
          </button>
          <button
            onClick={() => {
              handleManualInteraction();
              goToNext();
            }}
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: '#03515c',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
            }}
          >
            <img 
              src="/arrow_forward.svg" 
              alt="Вперед" 
              style={{ width: 32, height: 32 }}
            />
          </button>
        </div>
      </div>
    </div>
  );
} 