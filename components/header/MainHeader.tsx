'use client';
import Image from 'next/image';
import Link from 'next/link';

const MainHeader = () => {
  return (
    <header className="mx-auto flex w-[390px] cursor-pointer items-end gap-2 p-4">
      <Link href="/">
        <Image src="/logo-navy.svg" height={32} width={152} alt="logo" />
      </Link>
      <p className="typo-body-4-r text-navy-400 bottom-0">세상을 만나는 가벼운 시작</p>
    </header>
  );
};

export default MainHeader;
