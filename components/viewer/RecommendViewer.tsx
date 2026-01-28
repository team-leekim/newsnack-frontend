'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { CurationItem } from '@/types/CurationContent';
import RecommendCard from './RecommendCard';
import Link from 'next/link';

interface RecommendViewerProps {
  items: CurationItem[];
}

export default function RecommendViewer({ items }: RecommendViewerProps) {
  return (
    <div className="mx-auto w-full max-w-[390px] overflow-hidden">
      <Swiper
        slidesPerView={1.45}
        centeredSlides
        spaceBetween={0}
        loop
        watchSlidesProgress
        className="flex justify-center overflow-visible!"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={`/news/${item.id}`} className="block">
              <RecommendCard
                title={item.title}
                category={item.category}
                coverImage={item.imageUrl}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper {
          overflow: visible !important;
        }

        .swiper-wrapper {
          align-items: center;
        }

        .swiper-slide {
          transition:
            transform 0.3s ease,
            opacity 0.3s ease;
          transform: scale(0.9);
          opacity: 0.3;
        }

        .swiper-slide-active {
          transform: scale(1);
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
