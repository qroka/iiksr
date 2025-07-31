"use client";
// Импорт React для использования хуков и JSX-компонентов
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Тип пропсов для универсальной карточки Card
// Позволяет гибко настраивать внешний вид и поведение карточки через параметры
export type CardProps = {
  title: React.ReactNode;         // Основной заголовок карточки (может быть JSX)
  iconSrc: string;               // Путь к иконке (SVG/PNG/JPG)
  iconAlt?: string;              // Альтернативный текст для иконки
  iconSize?: number;             // Размер иконки (ширина и высота в px)
  iconFill?: string;             // Цвет заливки SVG-иконки (если поддерживается)
  gradient?: string;             // Градиент или цвет фона карточки
  buttonText?: string;           // Текст на кнопке
  buttonColor?: string;          // Цвет фона кнопки
  onButtonClick?: () => void;    // Обработчик клика по кнопке (если нет buttonHref)
  buttonHref?: string;           // Ссылка для перехода по кнопке (если есть)
  shine?: boolean;               // Флаг для включения shine-эффекта
  shineDuration?: number;       // Длительность shine-анимации в секундах (по умолчанию 0.8)
};

// Универсальная карточка с иконкой, заголовком, кнопкой и декоративной сеткой
export function Card({
  title,
  iconSrc,
  iconAlt = '',
  iconSize = 100,
  iconFill = '#fff',
  gradient = 'var(--card-gradient)',
  buttonText = 'узнать больше',
  buttonColor = 'rgba(0,0,0,0.20)',
  onButtonClick,
  buttonHref,
  shine = false,
  shineDuration = 1.5, // длительность shine-анимации в секундах (по умолчанию 0.8)
}: CardProps & { shine?: boolean }) {
  // Стили для кнопки (общие для <a> и <button>)
  const buttonStyle = {
    background: buttonColor,
    color: '#fff',
    border: 'none',
    borderRadius: 999,
    padding: '24px 32px',
    fontFamily: 'ACTAY',
    fontWeight: 400,
    fontSize: 24,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    zIndex: 2,
    width: 'fit-content',
    height: '72px',
    textDecoration: 'none',
  } as React.CSSProperties;

  // Если это SVG, можно попытаться применить цвет заливки через style (работает только если SVG поддерживает currentColor/fill)
  const isSvg = iconSrc.endsWith('.svg');
  const iconProps = isSvg
    ? { style: { fill: iconFill, width: iconSize, height: iconSize }, width: iconSize, height: iconSize }
    : { width: iconSize, height: iconSize };

  return (
    <div
      // Основной контейнер карточки с градиентом, скруглением и декоративным clip-path
      style={{
        position: 'relative',
        width: 539,
        height: 718,
        background: gradient,
        borderRadius: 0,
        clipPath: 'polygon(0 0, calc(100% - 60px) 0, 100% 60px, 100% 100%, 60px 100%, 0 calc(100% - 60px))',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '101px 0 102px 49px'
      }}
    >
      {/* Shine-эффект поверх карточки */}
      {shine && (
        <div
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              left: 0,
              width: '100px',
              height: '140%',
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8))',
              borderRadius: 16,
              transform: 'rotate(20deg) translateX(-220%)',
              animation: `shine-x-move ${shineDuration}s linear`,
            }}
          />
          <style>{`
            @keyframes shine-x-move {
              0% { transform: rotate(20deg) translateX(-220%); }
              100% { transform: rotate(20deg) translateX(700%); }
            }
          `}</style>
        </div>
      )}
      {/* SVG-сетка из квадратов 8x10, центрированная на карточке */}
      <svg
        width={73.6 * 8} height={73.6 * 11} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        <defs>
          {/* Определение паттерна сетки: квадрат 73.6x73.6, прозрачная заливка, белая линия */}
          <pattern id="grid" width={73.6} height={73.6} patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width={73.6} height={73.6} fill="none" stroke="#fff" strokeOpacity="0.1" strokeWidth="1" />
          </pattern>
        </defs>
        {/* Прямоугольник, заполняющий всю карточку сеткой */}
        <rect
          width={73.6 * 8}
          height={73.6 * 11}
          fill="url(#grid)"
        />
      </svg>
      {/* Контейнер для иконки, заголовка и кнопки */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 130,
        zIndex: 2,
      }}>
        {/* Иконка в квадрате с полупрозрачным фоном */}
        <div style={{ width: 147, height: 147, background: 'rgba(255,255,255,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={iconSrc} alt={iconAlt} {...iconProps} />
        </div>
        {/* Текстовый блок и кнопка */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 24,
        }}>
          {/* Заголовок карточки (может быть с переносом строки) */}
          <div style={{
            color: '#fff',
            fontFamily: 'ACTAYWIDE',
            fontWeight: 700,
            fontSize: '80px',
            lineHeight: '1',
            textAlign: 'left',
            height: '142px',
          }}>
            {title}
          </div>
          {/* Кнопка: всегда <button> */}
          <button
            style={buttonStyle}
            onClick={onButtonClick}
          >
            {buttonText}
            <img src="/arrow.svg" width={22.5} height={20} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Карточка "Инвест-Атлас" с предустановленными параметрами (зелёная)
export function InvestCard(props: { shine?: boolean; shineDuration?: number }) {
  return (
    <Card
      title={<>ИНВЕСТ-<br />АТЛАС</>}
      iconSrc="/business_center.svg"
      iconAlt="Иконка"
      iconSize={100}
      iconFill="#fff"
      gradient="var(--card-gradient-green)"
      buttonText="узнать больше"
      buttonColor="rgba(0,0,0,0.20)"
      buttonHref="/atlas"
      shineDuration={props.shineDuration}
      {...props}
    />
  );
}

// Карточка "Наш район" с предустановленными параметрами (синяя)
export function RayonCard(props: { shine?: boolean; shineDuration?: number }) {
  return (
    <Card
      title={<>НАШ<br />РАЙОН</>}
      iconSrc="/rayon.svg"
      iconAlt="Логотип"
      iconSize={75}
      iconFill="#fff"
      gradient="var(--card-gradient-blue)"
      buttonText="узнать больше"
      buttonColor="rgba(0,0,0,0.20)"
      buttonHref="/tourism"
      shineDuration={props.shineDuration}
      {...props}
    />
  );
}

// Карточка "Туризм Сор-Кут" с предустановленными параметрами (зелёная)
export function TurizmCard(props: { shine?: boolean; shineDuration?: number }) {
  return (
    <Card
      title={<>ТУРИЗМ<br />СОР-КУТ</>}
      iconSrc="/map.svg"
      iconAlt="Туризм"
      iconSize={100}
      iconFill="#fff"
      gradient="var(--card-gradient-green)"
      shineDuration={props.shineDuration}
      {...props}
    />
  );
}

// Карточка с фотографией главы, текстом и кнопкой 'Подписаться'
export function GlavaCard() {
  // Стили для кнопки (как в Card)
  const buttonStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    border: 'none',
    borderRadius: 999,
    padding: '24px 32px',
    fontFamily: 'ACTAY',
    fontWeight: 400,
    fontSize: 24,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    zIndex: 2,
    width: 'fit-content',
    height: '72px',
    textDecoration: 'none',
    marginTop: 0,
  } as React.CSSProperties;

  return (
    <div
      style={{
        position: 'relative',
        width: 539,
        height: 718,
        background: "url('/Глава.png') center/cover no-repeat, linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
        borderRadius: 0,
        clipPath: 'polygon(0 0, calc(100% - 60px) 0, 100% 60px, 100% 100%, 60px 100%, 0 calc(100% - 60px))',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '101px 0 27.8px 49px',
      }}
    >
      {/* Градиент поверх фото */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        background: 'linear-gradient(180deg,rgba(42, 48, 80, 0) 50%, rgba(42, 48, 80, 1) 100%)',
        pointerEvents: 'none',
      }} />
      {/* SVG-сетка как в Card, теперь поверх градиента и с маской */}
      <svg
        width={73.6 * 8} height={73.6 * 11}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
          maskImage: 'linear-gradient(180deg,rgba(42, 48, 80, 0) 50%, rgba(42, 48, 80, 1) 100%)',
          WebkitMaskImage: 'linear-gradient(180deg,rgba(42, 48, 80, 0) 50%, rgba(42, 48, 80, 1) 100%)',
        }}
      >
        <defs>
          <pattern id="grid-glava" width={73.6} height={73.6} patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width={73.6} height={73.6} fill="none" stroke="#fff" strokeOpacity="0.2" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="0" y="0" width={73.6 * 8} height={73.6 * 11} fill="url(#grid-glava)" />
      </svg>
      <div style={{
        color: '#fff',
        fontFamily: 'ACTAYWIDE',
        fontWeight: 700,
        fontSize: '80px',
        lineHeight: '1',
        textAlign: 'left',
        height: '142px',
        zIndex: 3,
        marginBottom: 24,
      }}>
        ГЛАВА<br />В РАЙОНЕ
      </div>
      <button style={buttonStyle}>
        подписаться
        <img src="/arrow.svg" width={22.5} height={20} alt="" />
      </button>
    </div>
  );
}

// Крупный заголовок для главной страницы
export function HeaderTitle() {
  return (
    <span
      style={{
        fontFamily: 'ACTAYWIDE',
        fontSize: '72px',
        color: 'var(--main-text)',
        fontWeight: 700,
        lineHeight: 1.1,
      }}
    >
      Сургутский район
    </span>
  );
}

// Статичный текст "для" для главной страницы
export function StaticLabel() {
  return (
    <span
      style={{
        fontFamily: 'ACTAYWIDE',
        fontSize: '72px',
        color: 'var(--gray-text)',
        fontWeight: 700,
        lineHeight: 1.1,
      }}
    >
      для
    </span>
  );
}

// Анимированный текст для главной страницы
// Принимает массив строк и плавно меняет их с анимацией
export function AnimatedText({ texts }: { texts: string[] }) {
  const boxHeight = 84; // высота контейнера для текста
  const [currentIndex, setCurrentIndex] = React.useState(0); // индекс текущего текста
  const [prevIndex, setPrevIndex] = React.useState<number | null>(null); // индекс предыдущего текста для анимации
  const [animating, setAnimating] = React.useState(false); // флаг анимации
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState<number | undefined>(undefined); // ширина контейнера
  const textRefs = React.useRef<(HTMLSpanElement | null)[]>([]); // ссылки на элементы текста

  // Измеряем ширину активного текста и плавно меняем ширину контейнера
  React.useEffect(() => {
    const node = textRefs.current[currentIndex];
    if (node) {
      setWidth(node.offsetWidth);
    }
  }, [currentIndex, texts]);

  // Таймер для смены текста с анимацией
  React.useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setPrevIndex(null);
      }, 500); // длительность анимации
    }, 2000);
    return () => clearInterval(interval);
  }, [currentIndex, texts.length]);

  return (
    <div
      ref={containerRef}
      style={{
        height: boxHeight,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        width: width ? width : 'auto',
      }}
    >
      {/* Текущий текст (с анимацией появления) */}
      <span
        ref={el => { textRefs.current[currentIndex] = el; }}
        style={{
          background: 'var(--button-bg)',
          color: 'var(--button-text)',
          borderRadius: '48px',
          padding: '0 40px',
          height: boxHeight,
          display: 'inline-flex',
          alignItems: 'center',
          fontFamily: 'ACTAY',
          fontSize: '72px',
          fontWeight: 400,
          lineHeight: 1,
          whiteSpace: 'nowrap',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 2,
          transition: 'transform 0.3s, opacity 0.3s',
          transform: animating ? `translateY(100%)` : 'translateY(0%)',
          opacity: animating && prevIndex !== null ? 0 : 1,
        }}
      >
        {texts[currentIndex]}
      </span>
      {/* Предыдущий текст (анимируется вверх при смене) */}
      {prevIndex !== null && (
        <span
          ref={el => { textRefs.current[prevIndex] = el; }}
          style={{
            background: 'var(--button-bg)',
            color: 'var(--button-text)',
            borderRadius: '48px',
            padding: '0 40px',
            height: boxHeight,
            display: 'inline-flex',
            alignItems: 'center',
            fontFamily: 'ACTAY',
            fontSize: '72px',
            fontWeight: 400,
            lineHeight: 1,
            whiteSpace: 'nowrap',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 1,
            transition: 'transform 0.3s, opacity 0.3s',
            transform: animating ? 'translateY(-100%)' : 'translateY(0%)',
            opacity: animating ? 1 : 0,
          }}
        >
          {texts[prevIndex]}
        </span>
      )}
    </div>
  );
}

// Кнопка с иконкой info.svg
export function InfoButton({ whiteBg = false }: { whiteBg?: boolean }) {
  return (
    <button
      type="button"
      style={{
        width: 72,
        height: 72,
        background: whiteBg ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
        border: 'none',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        cursor: 'pointer',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
      }}
    >
      <img src="/info.svg" width={48} height={48} alt="Инфо" />
    </button>
  );
}

// Кнопка с иконкой RU.svg
export function RuButton({ whiteBg = false }: { whiteBg?: boolean }) {
  return (
    <button
      type="button"
      style={{
        width: 72,
        height: 72,
        background: whiteBg ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
        border: 'none',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        cursor: 'pointer',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
      }}
    >
      <img src="/RU.svg" width={48} height={48} alt="RU" />
    </button>
  );
}

// Кнопка с иконкой home.svg, переход на главную
export function HomeButton({ whiteBg = false }: { whiteBg?: boolean }) {
  return (
    <Link
      href="/"
      style={{
        width: 72,
        height: 72,
        background: whiteBg ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
        border: 'none',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        cursor: 'pointer',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        textDecoration: 'none',
      }}
    >
      <img src="/home.svg" width={48} height={48} alt="Домой" />
    </Link>
  );
}

// Контейнер с текстом и группой кнопок
export function GlavaContainer() {
  // Для shine на кнопке "ПОСЕЛЕНИЯ"
  const shineRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const interval = setInterval(() => {
      const node = shineRef.current;
      if (node) {
        node.style.animationPlayState = 'running';
        node.style.animation = 'none'; // restart
        // eslint-disable-next-line
        void node.offsetWidth; // force reflow
        node.style.animation = 'shine-x-move-btn 2s linear';
        setTimeout(() => {
          node.style.animationPlayState = 'paused';
        }, 2000);
      }
    }, 6000); // каждые 6 секунд
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Белый информационный контейнер с текстом */}
      <div
        style={{
          width: 1101,
          height: 555,
          padding: 50,
          background: '#fff',
          borderRadius: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          position: 'relative',
        }}
      >
        {/* Заголовок */}
        <div
          style={{
            color: 'var(--button-bg)',
            fontFamily: 'ACTAYWIDE',
            fontWeight: 700,
            fontSize: 64,
            lineHeight: '96%',
            zIndex: 2,
            height: '106px',
          }}
        >
          Трубецкой Андрей Александрович
        </div>
        
        {/* Основной текст */}
        <div
          style={{
            color: 'var(--main-text)',
            fontFamily: 'ACTAY',
            fontWeight: 400,
            fontSize: 20,
            lineHeight: 1.3,
            zIndex: 2,
            flex: 1,
          }}
        >
          <p style={{ margin: '0 0 20px 0' }}>
            Сургутский район является самым крупным районом в Ханты-Мансийском автономном округе - Югре по численности населения и объёму промышленного производства. Его площадь составляет 105,5 тысяч кв.км., протяженность границ - 1800 км., с Севера на Юг - 560 км, с Запада на Восток 400 км.
          </p>
          <p style={{ margin: '0 0 20px 0' }}>
            Сегодня Сургутский район - одна из наиболее динамично развивающихся территорий ХМАО-Югры. Основой экономического благополучия района является топливно-энергитический комплекс, который включает в себя геологоразведочные, нефтегазодобывающие, трубопроводные предприятия, нефтегазоперерерабатывающие заводы.
          </p>
          <p style={{ margin: 0 }}>
            Предлагаю ознакомиться с потенциалом района с помощью Интерективной карты и надеюсь, что представленный проект будет не только основным источником информации, для гостей, но и путеводителем для деловых и предприимчивых людей, потенциальных инвесторов.
          </p>
        </div>
      </div>

      {/* Группа кнопок */}
      <div style={{ display: 'flex', gap: 24 }}>
        {/* Кнопка "О РАЙОНЕ" */}
        <Link
          href="/"
          style={{
            width: 398,
            height: 139,
            background: 'var(--button-bg)',
            color: '#fff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            fontFamily: 'ACTAYWIDE',
            fontSize: 32,
            cursor: 'pointer',
          }}
        >
          <img src="/info.svg" width={70} height={70} alt="" />
          О РАЙОНЕ
        </Link>

        {/* Кнопка "ПОСЕЛЕНИЯ" */}
        <Link
          href="/poseleniya"
          style={{
            width: 398,
            height: 139,
            background: 'var(--button-bg)',
            color: '#fff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            fontFamily: 'ACTAYWIDE',
            fontSize: 32,
            cursor: 'pointer',
            position: 'relative', // Для shine-оверлея
            overflow: 'hidden',   // Для shine-оверлея
          }}
        >
          {/* Shine-эффект поверх кнопки */}
          <div
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '500%',
              zIndex: 10,
              overflow: 'hidden',
            }}
          >
            <div
              ref={shineRef}
              style={{
                position: 'absolute',
                top: '-20%',
                left: 0,
                width: '100px',
                height: '140%',
                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8))',
                borderRadius: 16,
                transform: 'rotate(20deg) translateX(-220%)',
                animation: 'shine-x-move-btn 2s linear',
                animationDelay: '0s',
                animationFillMode: 'forwards',
                animationPlayState: 'paused',
              }}
              className="shine-poseleniya"
            />
            <style>{`
              @keyframes shine-x-move-btn {
                0% { transform: rotate(20deg) translateX(-220%); }
                100% { transform: rotate(20deg) translateX(700%); }
              }
            `}</style>
          </div>
          <img src="/villa.svg" width={70} height={70} alt="" />
          ПОСЕЛЕНИЯ
        </Link>

        {/* Кнопка "НАЗАД" */}
        <Link
          href="/"
          style={{
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
          }}
        >
          НАЗАД
        </Link>
      </div>
    </div>
  );
}
