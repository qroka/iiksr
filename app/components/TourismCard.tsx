import React from 'react';
import Image from 'next/image';
import { TourismCategory } from '../utils/tourism';

interface TourismCardProps {
  category: TourismCategory;
  onClick?: () => void;
}

export default function TourismCard({ category, onClick }: TourismCardProps) {
  return (
         <div 
       className="relative w-[820px] h-[306px] cursor-pointer overflow-hidden"
       onClick={onClick}
     >
             {/* Фоновое изображение */}
       <Image
         src={category.mainPhoto}
         alt={category.name}
         fill
         sizes="(max-width: 1024px) 100vw, 820px"
         className="object-cover"
         priority={false}
       />
      
      {/* Черный оверлей для лучшей читаемости текста */}
      <div className="absolute inset-0 bg-black/20" />
      
             {/* Контент карточки */}
       <div className="absolute bottom-0 left-0 right-0 px-[30px] py-[20px]">
         <div className="flex items-center gap-5">
           {/* Название категории */}
           <h3 className="text-white text-4xl font-['ACTAYWIDE'] leading-none">
             {category.name}
           </h3>
           
                       {/* Количество объектов */}
            <div className="bg-[var(--red)] text-white rounded-full h-10 px-6 flex items-center justify-center text-2xl font-['ACTAYWIDE']">
              {category.count}
            </div>
         </div>
       </div>
    </div>
  );
} 