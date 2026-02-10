// app/news/[id]/NewsDetailClient.tsx
'use client';

import { postContentReaction } from '@/api/content';
import { useState } from 'react';
import MainViewer from '@/components/viewer/MainViewer';
import { Icon } from '@iconify/react';
import EditorSection from '@/components/section/EditorSection';
import Divider from '@/components/section/Divider';
import Link from 'next/link';
import { formatKSTDateTime } from '@/utils/time';
import { ContentDetailResponse } from '@/types/contentDetail';
import Image from 'next/image';
import MainHeader from './header/MainHeader';

export default function NewsDetailClient({ data }: { data: ContentDetailResponse }) {
  const normalizeReactionStats = (stats: Record<string, number>) => ({
    ANGRY: stats.angry ?? 0,
    SURPRISED: stats.surprised ?? 0,
    HAPPY: stats.happy ?? 0,
    EMPATHY: stats.empathy ?? 0,
    SAD: stats.sad ?? 0,
  });
  const [reactionStats, setReactionStats] = useState(normalizeReactionStats(data.reactionStats));
  const handleReactionClick = async (type: 'ANGRY' | 'SURPRISED' | 'HAPPY' | 'EMPATHY' | 'SAD') => {
    try {
      await postContentReaction(Number(data.id), { type });
      setReactionStats((prev) => ({
        ...prev,
        [type]: (prev[type] ?? 0) + 1,
      }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';

    try {
      if (navigator.share) {
        await navigator.share({ url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch (e) {
      // intentionally ignore share errors
    }
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <MainHeader />
      <div className="w-[390px]">
        {/* Webtoon */}
        <section className="w-full">
          <MainViewer
            items={data.imageUrls.map((imgUrl: string, index: number) => (
              <div key={index} className="h-[390px] w-[390px]">
                <Image
                  key={index}
                  src={imgUrl}
                  alt={`content-image-${index}`}
                  fill
                  priority={index === 0}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  className="object-cover"
                />
              </div>
            ))}
          />
        </section>

        {/* Title, Editor */}
        <header className="border-navy-100 mb-4 border-b px-4">
          <h1 className="typo-h2 py-4">{data.title}</h1>
          <div className="flex items-center gap-[6px] pb-4 text-sm text-gray-500">
            <Link href={`/editor/${data.editor.id}`} className="block flex gap-[6px]">
              <Image
                src={data.editor.imageUrl}
                alt={data.editor.name}
                width={24}
                height={24}
                className="rounded-full object-cover"
              />
              <span className="text-text-1 typo-subtitle-1 flex items-center">
                {data.editor.name}
              </span>
            </Link>
            <span className="typo-body-5-r text-text-3">
              {' '}
              {formatKSTDateTime(data.publishedAt)}
            </span>
            <Image
              alt="share"
              src={'/share.svg'}
              width={24}
              height={24}
              onClick={handleShare}
              className="ml-auto cursor-pointer"
            />
          </div>
        </header>

        {/* Summary */}
        <section className="mx-4 flex w-[358px] flex-col gap-2 rounded-sm bg-[#F0F2F4] px-4 py-6">
          <h2 className="text-text-1 typo-btn-1-b rounded-sm">
            💡 바쁜 당신을 위한 핵심체크! AI 핵심 브리핑
          </h2>
          <ul className="text-text-2 typo-body-2-r px-2">
            {data.summary.map((s: string, i: number) => (
              <li key={i} className="typo-body-2-r">
                • {s}
              </li>
            ))}
          </ul>
        </section>

        <div className="px-4">
          {/* Body */}
          <article className="typo-body-1-r text-text-1 mt-6 mb-4 whitespace-pre-line">
            {data.body}
          </article>
          <span className="text-text-3 typo-body-5-m mb-4 flex items-center gap-1">
            <Icon icon="mingcute:ai-fill" width={14} height={14} className="text-navy-600" />
            AI의 도움을 받아 작성된 글입니다.
          </span>
          {/* Editor Info */}
          <Link href={`/editor/${data.editor.id}`}>
            <EditorSection editor={data.editor} />
          </Link>

          {/* Reaction Stats */}
          <section>
            <h2 className="typo-h3 my-6 text-black">이 기사에 대해 어떻게 생각하시나요?</h2>
            <ul className="my-6 grid grid-cols-5 gap-2 text-sm">
              {(
                [
                  { key: 'ANGRY', label: '화나요', image: '/angry.png' },
                  { key: 'SURPRISED', label: '놀라워요', image: '/surprised.png' },
                  { key: 'HAPPY', label: '행복해요', image: '/happy.png' },
                  { key: 'EMPATHY', label: '공감돼요', image: '/empathy.png' },
                  { key: 'SAD', label: '슬퍼요', image: '/sad.png' },
                ] as const
              ).map(({ key, label, image }) => (
                <li
                  key={key}
                  onClick={() => handleReactionClick(key)}
                  className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg"
                >
                  <Image
                    src={image}
                    alt={label}
                    width={44}
                    height={44}
                    className="object-contain"
                  />
                  <span className="typo-body-5-m text-text-1">{label}</span>
                  <span className="typo-body-5-m text-text-1">{reactionStats[key] ?? 0}</span>
                </li>
              ))}
            </ul>
          </section>
          <Divider />
          {/* Origin Articles */}
          <section className="mb-10">
            <h2 className="typo-h3 my-6 text-black">연관 기사를 더 보고 싶어요</h2>
            <ul className="space-y-2">
              {data.originalArticles.map((article, i: number) => (
                <li key={i} className="last:[&>a]:border-b-0">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-divider-1 block border-b py-2"
                  >
                    <p className="typo-body-2-m text-text-1 line-clamp-2">{article.title}</p>
                    <p className="typo-body-5-r text-text-3 mt-1">
                      {formatKSTDateTime(article.publishedAt)}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
