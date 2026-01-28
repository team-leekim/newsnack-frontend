'use client';

import { useEffect, useRef, useState } from 'react';
import type { WebtoonContent } from '@/types/webtoon';
import { webtoonFeedMock } from '@/mocks/webtoonFeed';
import WebtoonItem from '@/components/WebtoonItem';
import RecommendViewer from '@/components/viewer/RecommendViewer';
import MainHeader from '@/components/header/MainHeader';
import NewsDesk from '@/components/NewsDesk';
import Divider from '@/components/section/Divider';
import EmotionNewsSection from '@/components/section/EmotionNewsSection';
import { curationMock } from '@/mocks/curation.mock';
import Tooltip from '@/components/Tooltip';
import Link from 'next/link';

export default function Home() {
  const [webtoons, setWebtoons] = useState<WebtoonContent[]>(webtoonFeedMock.contents.slice(0, 5));

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWebtoons((prev) => {
            const nextLength = prev.length + 5;
            return webtoonFeedMock.contents.slice(0, nextLength);
          });
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="w-[390px]">
        <MainHeader />
        <div className="mx-auto w-full px-4">
          <div className="flex h-122.5 flex-col justify-center">
            <div className="mb-4 flex h-[26px] items-center gap-1">
              <h3 className="typo-h3">오늘의 뉴스낵</h3>
              <Tooltip />
            </div>
            <NewsDesk />
          </div>
        </div>
        <Divider />
        <div className="py-6">
          <h3 className="typo-h3 mx-auto max-w-97.5 px-4 pb-6">분야별 인기 추천</h3>
          <RecommendViewer items={curationMock} />
        </div>
        <Divider />
        <EmotionNewsSection />
        <Divider />

        <section className="flex flex-col gap-10 px-4 py-6">
          {webtoons.map((item) => (
            <Link
              key={item.id} // ⭐ 여기
              href={`/news/${item.id}`}
              className="block"
            >
              <WebtoonItem
                editor={item.editor}
                title={item.title}
                publishedAt={item.publishedAt}
                images={item.imageUrls.map((url, index) => ({
                  order: index,
                  imageUrl: url,
                }))}
              />
            </Link>
          ))}
          <div ref={loaderRef} className="h-10" />
        </section>
      </div>
    </main>
  );
}
