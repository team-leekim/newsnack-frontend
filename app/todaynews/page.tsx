'use client';
import NewsnackSlider from '@/components/slider/NewsnackSilder';
import { useEffect, useRef, useState } from 'react';
import { getTodayNewsSnack } from '@/api/newsnack';
import { TodayNewsSnackResponse } from '@/types/newsnack';
import Image from 'next/image';
import MainHeader from '@/components/header/MainHeader';

export default function TodayNewsPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const directionRef = useRef<'forward' | 'backward'>('forward');
  const isPlayingVideoRef = useRef(false);
  const loopIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const backwardIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startMarquee, setStartMarquee] = useState(false);
  const [data, setData] = useState<TodayNewsSnackResponse | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    getTodayNewsSnack()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const startVideoLoop = () => {
    const video = videoRef.current;
    if (!video) return;

    if (loopIntervalRef.current) {
      clearInterval(loopIntervalRef.current);
    }
    if (backwardIntervalRef.current) {
      clearInterval(backwardIntervalRef.current);
    }

    loopIntervalRef.current = setInterval(() => {
      if (!isPlayingVideoRef.current) {
        if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
        return;
      }

      const current = video.currentTime;
      const duration = video.duration;
      const direction = directionRef.current;

      if (direction === 'forward' && current >= duration - 0.1) {
        directionRef.current = 'backward';
        video.pause();

        if (backwardIntervalRef.current) {
          clearInterval(backwardIntervalRef.current);
        }

        backwardIntervalRef.current = setInterval(() => {
          if (!isPlayingVideoRef.current || directionRef.current !== 'backward') {
            if (backwardIntervalRef.current) clearInterval(backwardIntervalRef.current);
            return;
          }

          const curr = video.currentTime;

          if (curr <= 0.05) {
            if (backwardIntervalRef.current) clearInterval(backwardIntervalRef.current);
            directionRef.current = 'forward';
            video.currentTime = 0;
            video.play().catch((e) => console.error(e));
            return;
          }

          video.currentTime = Math.max(0, curr - 0.033);
        }, 33);
      }
    }, 100);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !data?.script || data.script.length === 0) return;

    const onTimeUpdate = () => {
      const currentTime = audio.currentTime;
      const scripts = data.script;
      const index = scripts.findIndex(
        (item) => currentTime >= item.startTime && currentTime < item.endTime
      );
      if (index !== -1 && index !== activeIndex) {
        setActiveIndex(index);
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    return () => audio.removeEventListener('timeupdate', onTimeUpdate);
  }, [data, activeIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (!audio || !video) return;

    const onAudioEnded = () => {
      isPlayingVideoRef.current = false;

      if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
      if (backwardIntervalRef.current) clearInterval(backwardIntervalRef.current);

      video.pause();
      video.currentTime = 0;
      directionRef.current = 'forward';

      setIsPlaying(false);
      setStartMarquee(false);
      setActiveIndex(0);
      setIsPaused(false);
    };

    audio.addEventListener('ended', onAudioEnded);
    return () => audio.removeEventListener('ended', onAudioEnded);
  }, [data]);

  const handlePlay = async () => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video || !audio || !data) return;

    try {
      directionRef.current = 'forward';
      isPlayingVideoRef.current = true;
      video.currentTime = 0;
      audio.currentTime = 0;

      await audio.play();
      await video.play();

      setIsPlaying(true);
      setStartMarquee(true);

      startVideoLoop();
    } catch (e) {
      console.error(e);
      isPlayingVideoRef.current = false;
    }
  };

  const handleTogglePause = async () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    if (!isPaused) {
      // pause
      video.pause();
      audio.pause();
      isPlayingVideoRef.current = false;

      if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
      if (backwardIntervalRef.current) clearInterval(backwardIntervalRef.current);

      setIsPaused(true);
    } else {
      // resume
      if (!video || !audio) return;

      // 항상 루프 가능한 정상 상태로 복구
      directionRef.current = 'forward';
      isPlayingVideoRef.current = true;

      if (video.duration && video.currentTime >= video.duration - 0.1) {
        video.currentTime = 0;
      }

      await audio.play();
      await video.play();

      startVideoLoop();
      setIsPaused(false);
    }
  };

  const items =
    data?.articles.map((article) => ({
      id: article.id,
      title: article.title,
      publishedAt: article.publishedAt,
    })) ?? [];

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        @keyframes news-marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes title-fade {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-news-marquee {
          display: inline-flex;
          white-space: nowrap;
          left: 100%;
          animation: news-marquee 10s linear infinite;
        }

        .animate-title-fade {
          animation: title-fade 0.4s ease;
        }
      `}</style>

      <div className="mx-auto w-[390px]">
        <MainHeader />
        <div
          className="relative aspect-[390/495] w-full overflow-hidden"
          onClick={() => {
            if (isPlaying) handleTogglePause();
          }}
        >
          <video
            ref={videoRef}
            src="/news.mp4"
            muted
            playsInline
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
          />

          <div
            className="absolute top-[200px] left-1/2 flex h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{
              background: 'rgba(148, 169, 206, 0.9)',
              boxShadow: '0px 1.45522px 14.5522px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              border: '10px solid rgba(255, 255, 255, 0.6)',
            }}
          >
            {isPlaying && (
              <Image
                src={data?.articles?.[activeIndex]?.imageUrl}
                alt="Newsnack"
                width={200}
                height={200}
                className="object-cover"
              />
            )}
          </div>

          {activeIndex > 0 && (
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                const audio = audioRef.current;
                if (!audio) return;
                const prevIndex = activeIndex - 1;
                audio.currentTime = data?.script?.[prevIndex]?.startTime ?? 0;
                setActiveIndex(prevIndex);
              }}
              className="absolute top-[200px] left-4 flex h-[48px] w-[48px] -translate-y-1/2 items-center justify-center rounded-full bg-black/40"
            >
              <Image
                alt="prev button"
                src={'/left_arrow.svg'}
                width={24}
                height={24}
                className="-translate-x-0.5 opacity-100"
              />
            </button>
          )}

          {activeIndex < (data?.articles.length ?? 0) - 1 && (
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                const audio = audioRef.current;
                if (!audio) return;
                const nextIndex = activeIndex + 1;
                audio.currentTime = data?.script?.[nextIndex]?.startTime ?? 0;
                setActiveIndex(nextIndex);
              }}
              className="absolute top-[200px] right-4 flex h-[48px] w-[48px] -translate-y-1/2 items-center justify-center rounded-full bg-black/40"
            >
              <Image alt="next button" width={24} height={24} src={'/right_arrow.svg'} />
            </button>
          )}

          {isPaused && (
            <>
              <div className="pointer-events-none absolute inset-0 z-20 bg-black/40" />
              <button
                onClick={handleTogglePause}
                className="pointer-events-auto absolute top-1/2 left-1/2 z-30 flex h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40"
              >
                <Image alt="pause" src="/pause.svg" width={40} height={40} />
              </button>
            </>
          )}

          {!isPlaying && (
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.3)_100%)]" />
          )}

          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="pointer-events-auto absolute top-1/2 left-1/2 z-30 flex h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40"
            >
              <Image alt="start button" width={20} height={20} src="/start.svg" className="ml-1" />
            </button>
          )}
        </div>

        <div className="relative h-[80px] w-full overflow-hidden border-t-2 border-b-2 border-white bg-[linear-gradient(90deg,#DCEFFF_0%,#DCEFFF_100%)]">
          {startMarquee && (
            <div className="typo-h1 text-navy-500 absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-hidden">
              <div className="animate-news-marquee">
                <span
                  key={`title-a-${activeIndex}`}
                  className="animate-title-fade inline-block flex-shrink-0 pr-16"
                >
                  {data?.articles?.[activeIndex]?.title}
                </span>
              </div>
            </div>
          )}
        </div>

        <audio ref={audioRef} src={data?.audioUrl} preload="auto" playsInline />
        <p className="typo-h3 text-black-900 px-4 pt-3">오늘의 TOP5 뉴스 바로가기</p>
        <NewsnackSlider items={items} />
      </div>
    </>
  );
}
