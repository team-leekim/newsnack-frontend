'use client';
import AudioButton from './buttons/Audiobutton';
import HeadlineSlider from './slider/HeadlineSlider';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  articles: {
    id: number;
    title: string;
  }[];
};

export default function NewsDesk({ articles }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/todaynews')}
      className="bg-navy-500 relative block h-101.5 w-89.5 cursor-pointer rounded-2xl"
    >
      <p className="text-text-1-w mt-8 ml-6 h-[108px] w-[215px] text-left text-[26px] leading-[36px] font-extrabold">
        오늘의 핵심 뉴스
        <br />
        지금 바로
        <br />
        들어보세요
      </p>

      <AudioButton />
      <Image
        alt="otter"
        src="/otter.png"
        width={235}
        height={261}
        className="absolute top-0 right-0"
      />
      <div onClick={(e) => e.stopPropagation()}>
        <HeadlineSlider items={articles.map(({ id, title }) => ({ id, title }))} />
      </div>
    </div>
  );
}
