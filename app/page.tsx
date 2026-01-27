'use client';

import { useEffect, useRef, useState } from 'react';
import { webtoonFeedMock } from '@/mocks/webtoonFeed';
import WebtoonItem from '@/components/WebtoonItem';
import RecommendViewer from '@/components/viewer/RecommendViewer';
import MainHeader from '@/components/header/MainHeader';
import NewsDesk from '@/components/NewsDesk';
import Divider from '@/components/section/Divider';
import EmotionNewsSection from '@/components/section/EmotionNewsSection';
import { curationMock } from '@/mocks/curation.mock';

export default function Home() {
  const [webtoons, setWebtoons] = useState(webtoonFeedMock.contents.slice(0, 5));

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
            <div className="h- mb-4 flex h-[26px] items-center">
              <h3 className="typo-h3">오늘의 뉴스낵</h3>
              <img src="/info.svg" alt="info" className="ml-1 h-6 w-6" />
            </div>
            <NewsDesk />
          </div>
        </div>
        <Divider />
        <div className="h-108 py-4">
          <h3 className="typo-h3 mx-auto mb-6 max-w-97.5 px-4">분야별 인기 추천</h3>
          <RecommendViewer items={curationMock} />
        </div>
        <Divider />
        <EmotionNewsSection />
        <Divider />

        <section className="flex flex-col gap-10 px-4 py-6">
          {webtoons.map((item, index) => (
            <WebtoonItem
              key={item.title + index}
              editor={item.editor}
              title={item.title}
              publishedAt={item.publishedAt}
              images={item.content.images}
            />
          ))}
          <div ref={loaderRef} className="h-10" />
        </section>
      </div>
    </main>
  );
}
