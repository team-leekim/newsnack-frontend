// components/card/EditorNewsCard.tsx
import Link from 'next/link';
import { formatPublishedAt } from '@/utils/time';
import Image from 'next/image';

interface EditorNewsCardProps {
  id: number;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  editorName: string;
}

export default function EditorNewsCard({
  id,
  title,
  thumbnailUrl,
  publishedAt,
  editorName,
}: EditorNewsCardProps) {
  return (
    <Link href={`/news/${id}`} className="flex flex-col gap-2">
      <Image
        src={thumbnailUrl}
        alt={title}
        className="h-[171px] w-[171px] rounded-lg object-cover"
      />
      <div className="flex flex-col gap-1">
        <h3 className="typo-body-2-m line-clamp-2 text-black">{title}</h3>
        <div className="flex items-center gap-1">
          <span className="typo-body-4-r text-navy-300">{editorName}</span>
          <span className="text-gray-300">·</span>
          <span className="typo-body-4-r text-navy-300">{formatPublishedAt(publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
