'use client';

import { useEffect, useRef, useState } from 'react';

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
      <img
        src="/info.svg"
        alt="info"
        className="h-6 w-6 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="absolute top-4 z-20 -translate-x-12">
          <div className="relative h-[138px] w-[180px]">
            <img src="/tooltip.png" alt="tooltip" className="h-full w-full" />

            {/* text container */}
            <div className="absolute top-[75px] left-1/2 h-[66px] w-[124px] -translate-x-1/2 -translate-y-1/2">
              <p className="typo-body-4-r text-navy-900 flex h-full w-full items-center justify-center text-center">
                오늘의 가장 핫한 이슈 TOP5를 선정 후 AI로 요약하여 제공합니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
