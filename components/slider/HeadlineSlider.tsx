'use client';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import type { Swiper as SwiperType } from 'swiper';

interface HeadlineSliderProps {
  titles: string[];
}

export default function HeadlineSlider({ titles }: HeadlineSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Swiper 인스턴스가 생성되면 autoplay 강제 시작
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.start();
    }
  }, []);
  return (
    <div className="bg-navy-200 relative mt-6 ml-4 flex h-[147px] w-[326px] justify-center overflow-hidden rounded-lg p-2">
      <div className="border-navy-100 shadow-card pointer-events-none absolute top-1/2 left-1/2 z-10 flex h-[48px] w-[300px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border bg-white px-3 py-3">
        <p className="typo-body-2-m w-[278px] truncate text-center text-black">
          {titles[activeIndex]}
        </p>
      </div>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        direction="vertical"
        slidesPerView={3}
        centeredSlides
        loop
        allowTouchMove={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        modules={[Autoplay]}
        className="h-full"
        speed={800}
        spaceBetween={10}
      >
        {titles.map((title, idx) => (
          <SwiperSlide key={idx}>
            {({ isActive }) => (
              <div
                className={`flex h-[38.4px] w-full items-center justify-center text-[12.8px] ${
                  isActive ? 'text-black-700' : 'text-navy-900'
                }`}
              >
                <p className="w-[278px] truncate text-center whitespace-nowrap">{title}</p>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
