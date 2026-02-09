'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import type { Swiper as SwiperType } from 'swiper';

interface HeadlineSliderProps {
  items: { id: number; title: string }[];
  disableLink?: boolean;
}

export default function HeadlineSlider({ items, disableLink = false }: HeadlineSliderProps) {
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
      {disableLink ? (
        <div className="border-navy-100 shadow-card pointer-events-auto absolute top-1/2 left-1/2 z-20 flex h-[48px] w-[300px] -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center rounded-lg border bg-white px-3 py-3">
          <p className="typo-body-2-m w-[278px] truncate text-center text-black">
            {items[activeIndex]?.title}
          </p>
        </div>
      ) : (
        <Link
          href={`/news/${items[activeIndex]?.id}`}
          className="border-navy-100 shadow-card pointer-events-auto absolute top-1/2 left-1/2 z-20 flex h-[48px] w-[300px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border bg-white px-3 py-3"
        >
          <p className="typo-body-2-m w-[278px] truncate text-center text-black">
            {items[activeIndex]?.title}
          </p>
        </Link>
      )}
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
        className="pointer-events-none h-full"
        speed={800}
        spaceBetween={10}
      >
        {items.map((item, idx) => (
          <SwiperSlide key={idx}>
            {({ isActive }) => (
              <div
                className={`flex h-[38.4px] w-full items-center justify-center text-[12.8px] ${isActive ? 'text-black-700 cursor-default' : 'text-navy-900 pointer-events-none cursor-default'} `}
              >
                <p className="w-[278px] truncate text-center whitespace-nowrap">{item.title}</p>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
