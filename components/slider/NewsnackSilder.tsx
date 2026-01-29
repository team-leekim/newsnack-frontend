'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';

interface NewsnackItem {
  id: number;
  title: string;
}

interface NewsnackSliderProps {
  items: NewsnackItem[];
}

export default function NewsnackSlider({ items }: NewsnackSliderProps) {
  return (
    <div className="mx-auto h-[163px] w-[390px] px-4 py-6">
      <Swiper
        direction="horizontal"
        slidesPerView={1.2}
        spaceBetween={12}
        centeredSlides={false}
        loop={false}
        allowTouchMove
        className="h-full"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="w-auto">
            <Link href={`/news/${item.id}`} className="block">
              <div className="flex h-[72px] w-[300px] flex-col justify-center gap-3 rounded-lg border border-[#D4D7DC] bg-white px-4 py-3 shadow-[0_2px_6px_rgba(0,0,0,0.08),0_6px_16px_rgba(0,0,0,0.12)]">
                <p className="typo-body-2-m line-clamp-2 w-full">{item.title}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
