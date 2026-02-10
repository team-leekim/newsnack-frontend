// components/WebtoonItem.tsx
'use client';

import { formatPublishedAt } from '@/utils/time';
import MainViewer from './viewer/MainViewer';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface WebtoonImage {
  order: number;
  imageUrl: string;
}

interface Editor {
  id: number;
  name: string;
  imageUrl: string;
}

interface WebtoonItemProps {
  editor: Editor;
  title: string;
  publishedAt: string;
  images: WebtoonImage[];
  id: number;
  onArticleClick?: () => void;
}

export default function WebtoonItem({
  editor,
  title,
  publishedAt,
  images,
  id,
  onArticleClick,
}: WebtoonItemProps) {
  const router = useRouter();

  return (
    <article
      className="flex cursor-pointer flex-col gap-3"
      onClick={() => {
        if (onArticleClick) {
          onArticleClick();
        } else {
          router.push(`/news/${id}`);
        }
      }}
    >
      {/* editor info */}
      <div
        onClick={(e) => {
          e.stopPropagation(); // 뉴스 페이지 이동 방지
          router.push(`/editor/${editor.id}`);
        }}
        className="flex cursor-pointer items-center gap-3 px-4"
      >
        <Image
          src={editor.imageUrl}
          alt={editor.name}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="typo-h4 text-sm text-gray-700">{editor.name}</span>
          <span className="typo-body-4-r text-[#757575]">{formatPublishedAt(publishedAt)}</span>
        </div>
      </div>

      <section className="w-full overflow-hidden">
        <MainViewer
          items={images
            .sort((a, b) => a.order - b.order)
            .map((img) => (
              <Image
                key={img.order}
                src={img.imageUrl}
                width={390}
                height={390}
                alt={`webtoon-${img.order}`}
                className="object-cover"
              />
            ))}
        />
      </section>

      {/* title */}
      <h2 className="text-black-900 typo-body-1-m mx-4">{title}</h2>
    </article>
  );
}
