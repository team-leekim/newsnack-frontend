'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

interface MainViewerProps {
  items: React.ReactNode[];
}

export default function MainViewer({ items }: MainViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <Swiper
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-[390px] w-[390px]"
      >
        {items.map((item, idx) => (
          <SwiperSlide key={idx} className="flex justify-center">
            {item}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-2 flex gap-[6px]">
        {items.map((_, idx) => (
          <span
            key={idx}
            className={`h-[6px] w-[6px] rounded-full transition-colors ${
              idx === activeIndex ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
