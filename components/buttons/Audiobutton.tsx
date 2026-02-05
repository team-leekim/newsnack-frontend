'use client';
import Image from 'next/image';

const AudioButton = () => {
  return (
    <div className="mt-4 ml-[23px] box-border flex h-[48px] w-[127px] items-center justify-center gap-2 rounded-full border border-[#DBDBDB] bg-white px-[16px] py-[12px]">
      <Image src="/headphones.svg" alt="info" height={24} width={24} />
      <p className="typo-btn-1-b text-text-1">뉴스 듣기</p>
    </div>
  );
};

export default AudioButton;
