'use client';
import Image from 'next/image';

const MainHeader = () => {
  return (
    <header className="mx-auto flex w-[390px] items-end gap-2 p-4">
      <Image src="/logo-navy.png" height={32} width={152} alt="logo" />
      <p className="typo-body-4-r text-navy-400 bottom-0">세상을 만나는 가벼운 시작</p>
    </header>
  );
};

export default MainHeader;
