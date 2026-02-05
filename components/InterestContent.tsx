'use client';
import { InterestItem } from '@/types/CurationContent';
import { formatPublishedAt } from '@/utils/time';
import Image from 'next/image';

interface InterestContentProps {
  item: InterestItem;
}

export default function InterestContent({ item }: InterestContentProps) {
  return (
    <div className="border-black-0 relative flex h-[118px] w-[358px] border-b py-5 last:border-b-0">
      <div>
        <h4 className="typo-body-2-m text-black-900 line-clamp-2 w-66">{item.title}</h4>
        <div className="typo-body-4-r text-navy-300 mt-2">
          <span>{item.editorName}</span>
          <span className="mx-1">·</span>
          <span>{formatPublishedAt(item.publishedAt)}</span>
        </div>
      </div>
      <div className="absolute right-0 left-auto">
        <Image
          src={item.imageUrl}
          alt={item.title}
          className="h-19.5 w-19.5 rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
