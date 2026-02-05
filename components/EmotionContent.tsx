'use client';
import { formatPublishedAt } from '@/utils/time';
import Image from 'next/image';

type EmotionType = 'HAPPY' | 'SURPRISED' | 'EMPATHY' | 'SAD' | 'ANGRY';

const emotionConfig: Record<EmotionType, { src: string; className: string }> = {
  HAPPY: {
    src: '/otter_happy.png',
    className: 'top-16 h-[115px] left-0 w-auto',
  },
  SURPRISED: {
    src: '/otter_surprised.png',
    className: 'top-19 left-0 h-[101px]',
  },
  EMPATHY: {
    src: '/otter_empathy.png',
    className: 'top-18 left-0 h-[107px]',
  },
  SAD: {
    src: '/otter_sad.png',
    className: 'top-18 -left-0.5 h-[105px]',
  },
  ANGRY: {
    src: '/otter_angry.png',
    className: 'top-16 left-0 h-[117px] -z-1',
  },
};

interface EmotionContentProps {
  title: string;
  imageUrl: string;
  editorName: string;
  publishedAt: string;
  emotion: EmotionType;
}

export default function EmotionContent({
  title,
  editorName,
  imageUrl,
  publishedAt,
  emotion,
}: EmotionContentProps) {
  return (
    <div className="relative flex h-[262px] w-[230px]">
      <div className="w-[50px]">
        <img
          src={emotionConfig[emotion].src}
          className={`absolute ${emotionConfig[emotion].className}`}
          alt={emotion}
        />
      </div>
      <div className="flex w-[180px] flex-col gap-2">
        <Image
          alt="thumbnail image"
          src={imageUrl}
          width={180}
          height={180}
          className="rounded-lg border-2 border-white/60 bg-cover"
        />
        <h4 className="typo-body-2-m line-clamp-2 w-[180px] break-words whitespace-normal">
          {title}
        </h4>
        <div className="typo-body-4-r text-navy-300 flex">
          <p>{editorName}</p>
          <span className="mx-1">·</span>
          <span>{formatPublishedAt(publishedAt)}</span>
        </div>
      </div>
    </div>
  );
}
