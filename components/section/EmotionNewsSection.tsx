'use client';

import { useState, useRef } from 'react';
import EmotionButton from '../buttons/EmotionButton';
import EmotionContent from '../EmotionContent';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type { Swiper as SwiperClass } from 'swiper';
import Link from 'next/link';
import { EmotionBestItem, EmotionType } from '@/types/emotionBest';

type Emotion = EmotionType;

type Props = {
  items: EmotionBestItem[];
};

const emotionOrder: Emotion[] = ['HAPPY', 'SURPRISED', 'EMPATHY', 'SAD', 'ANGRY'];

const emotionLabelMap: Record<Emotion, string> = {
  HAPPY: '행복해요',
  SURPRISED: '놀라워요',
  EMPATHY: '공감해요',
  SAD: '슬퍼요',
  ANGRY: '화나요',
};

const emotionTitleMap: Record<Emotion, string> = {
  HAPPY: '오늘의 행복한 뉴스',
  SURPRISED: '오늘의 놀라운 뉴스',
  EMPATHY: '오늘의 공감되는 뉴스',
  SAD: '오늘의 슬픈 뉴스',
  ANGRY: '오늘의 화나는 뉴스',
};

export default function EmotionNewsSection({ items }: Props) {
  const [activeEmotion, setActiveEmotion] = useState<Emotion>('HAPPY');
  const swiperRef = useRef<SwiperClass | null>(null);
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToButton = (emotion: Emotion) => {
    const container = buttonContainerRef.current;
    const index = emotionOrder.indexOf(emotion);

    if (container) {
      // 첫 번째 버튼이면 맨 왼쪽으로
      if (index === 0) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      }
      // 마지막 버튼이면 맨 오른쪽으로
      else if (index === emotionOrder.length - 1) {
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
      } else {
        const target = container.children[index] as HTMLElement | undefined;
        if (target) {
          const containerWidth = container.offsetWidth;
          const targetWidth = target.offsetWidth;
          const targetLeft = target.offsetLeft;
          const scrollLeft = targetLeft - containerWidth / 2 + targetWidth / 2;
          container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      }
    }
  };
  return (
    <div className="w-full max-w-[390px]">
      <h3 className="typo-h3 mx-auto mt-6 mb-4 max-w-97.5 px-4">
        {emotionTitleMap[activeEmotion]}
      </h3>

      <div
        ref={buttonContainerRef}
        className="no-scrollbar mx-4 flex gap-3 overflow-x-auto whitespace-nowrap"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {emotionOrder.map((emotion) => (
          <EmotionButton
            key={emotion}
            label={emotionLabelMap[emotion]}
            active={activeEmotion === emotion}
            onClick={() => {
              setActiveEmotion(emotion);
              const index = emotionOrder.indexOf(emotion);
              swiperRef.current?.slideTo(index);
              scrollToButton(emotion);
            }}
          />
        ))}
      </div>

      <div className="mx-4 mt-[26px] mb-4 overflow-hidden">
        <Swiper
          centeredSlides={false}
          slidesPerView={1.5}
          spaceBetween={16}
          touchRatio={1}
          resistance={true}
          resistanceRatio={0.85}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            const emotion = emotionOrder[swiper.activeIndex];
            if (emotion) {
              setActiveEmotion(emotion);
              scrollToButton(emotion);
            }
          }}
        >
          {emotionOrder.map((emotion) => {
            const news = items.find((item) => item.emotionType === emotion);
            if (!news) return null;

            return (
              <SwiperSlide key={emotion}>
                <Link href={`/news/${news.article.id}`} className="block">
                  <EmotionContent
                    emotion={emotion}
                    imageUrl={news.article.thumbnailUrl}
                    title={news.article.title}
                    editorName={news.article.editorName}
                    publishedAt={news.article.publishedAt}
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
