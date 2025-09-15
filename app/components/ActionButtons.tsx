import React, { useState, useEffect } from 'react';

interface ActionButtonsProps {
  onHistory?: () => void;
  onInvestments?: () => void;
  onTourism?: () => void;
  onBack?: () => void;
  disabledHistory?: boolean;
  disabledInvestments?: boolean;
  disabledTourism?: boolean;
}

export default function ActionButtons({
  onHistory,
  onInvestments,
  onTourism,
  onBack,
  disabledHistory = false,
  disabledInvestments = false,
  disabledTourism = false
}: ActionButtonsProps) {
  const [shineIndex, setShineIndex] = useState(0);
  const [shineActive, setShineActive] = useState(false);
  const SHINE_INTERVAL_MS = 4000; // 3 секунды эффект + 1 секунда задержка
  const SHINE_DURATION_MS = 1000;

  // Меняем shineIndex с нужной частотой
  useEffect(() => {
    const interval = setInterval(() => {
      setShineIndex((prev) => (prev + 1) % 3);
    }, SHINE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  // Включаем shineActive на короткое время при каждом изменении shineIndex
  useEffect(() => {
    setShineActive(true);
    const timeout = setTimeout(() => setShineActive(false), SHINE_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [shineIndex]);

  return (
    <>
      <div className="flex justify-between items-center gap-6">
        <div className="flex items-center gap-6"> 
          {/* Кнопка ИСТОРИЯ */}
          <div className="relative">
            <button 
              onClick={disabledHistory ? undefined : onHistory}
              className={`
                w-[398px] h-[139px] border-none flex items-center justify-center gap-3 font-['ACTAYWIDE'] text-3xl relative overflow-hidden
                ${disabledHistory 
                  ? 'bg-[#D9EDF2] text-[#014B56] cursor-default opacity-100' 
                  : 'bg-[var(--button-bg)] text-white cursor-pointer'
                }
              `}
            >
                             <img 
                 src={disabledHistory ? "/history-disabled.svg" : "/history.svg"}
                 alt="История" 
                 className="w-[70px] h-[70px]"
               />
              ИСТОРИЯ
            </button>
                         {/* Shine эффект для кнопки ИСТОРИЯ - только если кнопка активна */}
             {shineActive && shineIndex === 0 && !disabledHistory && (
               <div className="pointer-events-none absolute left-0 top-0 w-full h-[380%] z-10 overflow-hidden">
                 <div 
                   className="absolute -top-[20%] left-0 w-[100px] h-[220%] bg-gradient-to-r from-white/40 to-white/80 rounded-2xl animate-[shine-x-move_2s_linear]"
                   style={{
                     transform: 'rotate(20deg) translateX(-280%)'
                   }}
                 />
               </div>
             )}
          </div>

          {/* Кнопка ИНВЕСТИЦИИ */}
          <div className="relative">
            <button 
              onClick={disabledInvestments ? undefined : onInvestments}
              className={`
                w-[398px] h-[139px] border-none flex items-center justify-center gap-3 font-['ACTAYWIDE'] text-3xl relative overflow-hidden
                ${disabledInvestments 
                  ? 'bg-[#D9EDF2] text-[#014B56] cursor-default opacity-100' 
                  : 'bg-[var(--button-bg)] text-white cursor-pointer'
                }
              `}
            >
                             <img 
                 src={disabledInvestments ? "/business_center-disabled.svg" : "/business_center.svg"}
                 alt="Инвестиции" 
                 className="w-[70px] h-[70px]"
               />
              ИНВЕСТИЦИИ
            </button>
                         {/* Shine эффект для кнопки ИНВЕСТИЦИИ - только если кнопка активна */}
             {shineActive && shineIndex === 2 && !disabledInvestments && (
               <div className="pointer-events-none absolute left-0 top-0 w-full h-[380%] z-10 overflow-hidden">
                 <div 
                   className="absolute -top-[20%] left-0 w-[100px] h-[220%] bg-gradient-to-r from-white/40 to-white/80 rounded-2xl animate-[shine-x-move_2s_linear]"
                   style={{
                     transform: 'rotate(20deg) translateX(-280%)'
                   }}
                 />
               </div>
             )}
          </div>

          {/* Кнопка ТУРИЗМ */}
          <div className="relative">
            <button 
              onClick={disabledTourism ? undefined : onTourism}
              className={`
                w-[398px] h-[139px] border-none flex items-center justify-center gap-3 font-['ACTAYWIDE'] text-3xl relative overflow-hidden
                ${disabledTourism 
                  ? 'bg-[#D9EDF2] text-[#014B56] cursor-default opacity-100' 
                  : 'bg-[var(--button-bg)] text-white cursor-pointer'
                }
              `}
            >
                             <img 
                 src={disabledTourism ? "/map-disabled.svg" : "/map.svg"}
                 alt="Туризм" 
                 className="w-[70px] h-[70px]"
               />
              ТУРИЗМ
            </button>
                         {/* Shine эффект для кнопки ТУРИЗМ - только если кнопка активна */}
             {shineActive && shineIndex === 1 && !disabledTourism && (
               <div className="pointer-events-none absolute left-0 top-0 w-full h-[380%] z-10 overflow-hidden">
                 <div 
                   className="absolute -top-[20%] left-0 w-[100px] h-[220%] bg-gradient-to-r from-white/40 to-white/80 rounded-2xl animate-[shine-x-move_2s_linear]"
                   style={{
                     transform: 'rotate(20deg) translateX(-280%)'
                   }}
                 />
               </div>
             )}
          </div>
        </div>
        {/* Кнопка НАЗАД */}
        <button 
          onClick={onBack || (() => window.history.back())}
          className="w-[257px] h-[139px] text-3xl bg-[var(--white)] text-[var(--button-bg)] border-none flex items-center justify-center font-['ACTAYWIDE'] cursor-pointer"
        >
          НАЗАД
        </button>
      </div>
      <style>{`
        @keyframes shine-x-move {
          0% { transform: rotate(20deg) translateX(-220%); }
          100% { transform: rotate(20deg) translateX(700%); }
        }
      `}</style>
    </>
  );
} 