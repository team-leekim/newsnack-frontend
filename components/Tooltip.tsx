'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Tooltip() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <Image
        src="/info.svg"
        alt="info"
        width={24}
        height={24}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="absolute top-4 z-20 -translate-x-12">
          <div className="relative h-[138px] w-[180px]">
            <Image src="/tooltip.png" alt="tooltip" height={137} width={180} />
            <p className="typo-body-4-r text-navy-900 absolute top-[40px] left-1/2 w-[148px] -translate-x-1/2 text-center break-keep whitespace-pre-line">
              오늘의 가장 핫한 이슈 TOP5를 선정 후 AI로 요약하여 제공합니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
