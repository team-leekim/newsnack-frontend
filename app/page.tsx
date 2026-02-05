'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import RecommendViewer from '@/components/viewer/RecommendViewer';
import MainHeader from '@/components/header/MainHeader';
import NewsDesk from '@/components/NewsDesk';
import Divider from '@/components/section/Divider';
import EmotionNewsSection from '@/components/section/EmotionNewsSection';
import Tooltip from '@/components/Tooltip';
import WebtoonItem from '@/components/WebtoonItem';
import { getCategoryBest, getEmotionBest } from '@/api/curation';
import { CategoryBestItem } from '../types/categoryBest';
import { EmotionBestItem } from '../types/emotionBest';
import { getContents } from '@/api/content';
import { ContentItem } from '@/types/content';
import { getTodayNewsSnack } from '@/api/newsnack';

export default function Home() {
  // 홈 상단 추천(카테고리 / 감정) 데이터
  const [categoryBest, setCategoryBest] = useState<CategoryBestItem[]>([]);
  const [emotionBest, setEmotionBest] = useState<EmotionBestItem[]>([]);
  const [todayArticles, setTodayArticles] = useState<{ id: number; title: string }[]>([]);
  const router = useRouter();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false);

  // 무한 스크롤용 뉴스 콘텐츠 상태
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // 카테고리별 / 감정별 추천 데이터 조회
  useEffect(() => {
    getCategoryBest()
      .then((res) => {
        setCategoryBest(res.data);
      })
      .catch(console.error);

    getEmotionBest()
      .then((res) => {
        setEmotionBest(res.data);
      })
      .catch(console.error);

    getTodayNewsSnack()
      .then((res) => {
        setTodayArticles(
          res.data.articles.map((a) => ({
            id: a.id,
            title: a.title,
          }))
        );
      })
      .catch(console.error);
  }, []);

  // 최초 진입 시 첫 페이지 로드
  useEffect(() => {
    loadMore();
  }, []);

  // 커서 기반 무한 스크롤 데이터 로딩
  const loadMore = async () => {
    if (!hasNext || isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);
    try {
      const res = await getContents({
        cursor: cursor ?? undefined,
        size: 10,
      });

      setContents((prev) => {
        const merged = [...prev, ...res.data.contents];
        const uniqueMap = new Map<number, ContentItem>();
        merged.forEach((item) => {
          uniqueMap.set(item.id, item);
        });
        return Array.from(uniqueMap.values());
      });
      setCursor(res.data.nextCursor);
      setHasNext(res.data.hasNext);
    } catch (e) {
      console.error(e);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  };

  // 화면 하단 감지 시 다음 페이지 요청
  useEffect(() => {
    const currentLoader = loaderRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (currentLoader) observer.observe(currentLoader);
    return () => observer.disconnect();
  }, [hasNext, cursor]);

  // RecommendViewer에서 쓰기 위한 카테고리 큐레이션 데이터 가공
  const categoryCurationItems = categoryBest.map((item) => ({
    id: item.article.id,
    title: item.article.title,
    thumbnailUrl: item.article.thumbnailUrl,
    imageUrl: item.article.thumbnailUrl,
    editorName: item.categoryName,
    publishedAt: '',
    category: item.categoryName,
    reactionCount: 0,
  }));

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
            <NewsDesk articles={todayArticles} />
          </div>
        </div>
        <Divider />
        <div className="py-6">
          <h3 className="typo-h3 mx-auto max-w-97.5 px-4 pb-6">분야별 인기 추천</h3>
          <RecommendViewer items={categoryCurationItems} />
        </div>
        <Divider />
        <EmotionNewsSection items={emotionBest} />
        <Divider />
        <section className="flex flex-col gap-10 py-6">
          {/* 전체 최신 뉴스 무한 피드 렌더링 */}
          {contents.map((item) => (
            <WebtoonItem
              key={item.id}
              id={item.id}
              editor={item.editor}
              title={item.title}
              publishedAt={item.publishedAt}
              images={item.imageUrls.map((url, index) => ({
                order: index,
                imageUrl: url,
              }))}
              onArticleClick={() => {
                router.push(`/news/${item.id}`);
              }}
            />
          ))}
          <div ref={loaderRef} className="h-10" />
        </section>
      </div>
    </main>
  );
}
