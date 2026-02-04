'use client';
import NewsnackSlider from '@/components/slider/NewsnackSilder';
import { useEffect, useRef, useState } from 'react';
import { getTodayNewsSnack } from '@/api/newsnack';
import { TodayNewsSnackResponse } from '@/types/newsnack';

export default function TodayNewsPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const directionRef = useRef<'forward' | 'backward'>('forward');
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startMarquee, setStartMarquee] = useState(false);
  const [data, setData] = useState<TodayNewsSnackResponse | null>(null);

  useEffect(() => {
    getTodayNewsSnack()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // use rafRef instead of local variable

    const playBackward = () => {
      if (!video) return;

      if (video.currentTime <= 0) {
        directionRef.current = 'forward';
        video.play();
        return;
      }

      video.currentTime -= 0.016;
      rafRef.current = requestAnimationFrame(playBackward);
    };

    const onEnded = () => {
      directionRef.current = 'backward';
      video.pause();
      rafRef.current = requestAnimationFrame(playBackward);
    };

    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('ended', onEnded);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      const currentTime = audio.currentTime;
      const scripts = data?.content.script ?? [];

      const index = scripts.findIndex(
        (item) => currentTime >= item.startTime && currentTime < item.endTime
      );

      if (index !== -1 && index !== activeIndex) {
        setActiveIndex(index);
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [activeIndex, data]);

  useEffect(() => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (!audio || !video) return;

    const onAudioEnded = () => {
      video.pause();
      directionRef.current = 'forward';
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      setIsPlaying(false);
      setStartMarquee(false);
    };

    audio.addEventListener('ended', onAudioEnded);

    return () => {
      audio.removeEventListener('ended', onAudioEnded);
    };
  }, []);

  const handlePlay = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    video.play();
    audio.play();
    setIsPlaying(true);
    setStartMarquee(true);
  };

  const items =
    data?.articles.map((article) => ({
      id: article.id,
      title: article.title,
    })) ?? [];

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
        {' '}
        <div className="relative aspect-[390/495] w-full overflow-hidden">
          <img src="/logo-white.png" className="absolute top-[15px] left-[115px] z-10" />
          <video
            ref={videoRef}
            src="/news.mp4"
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* image frame */}
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
              <img
                src={data?.content.imageUrls?.[activeIndex]}
                alt=""
                className="h-[200px] w-[200px] object-cover"
              />
            )}
          </div>

          {/* navigation buttons */}
          {activeIndex > 0 && (
            <button
              onClick={() => {
                const audio = audioRef.current;
                if (!audio) return;
                const prevIndex = activeIndex - 1;
                audio.currentTime = data?.content.script?.[prevIndex]?.startTime ?? 0;
                setActiveIndex(prevIndex);
              }}
              className="absolute top-[200px] left-4 flex h-[48px] w-[48px] -translate-y-1/2 items-center justify-center rounded-full bg-black/40"
            >
              <img src={'/left_arrow.svg'} className="-translate-x-0.5 opacity-100" />
            </button>
          )}

          {activeIndex < (data?.articles.length ?? 0) - 1 && (
            <button
              onClick={() => {
                const audio = audioRef.current;
                if (!audio) return;
                const nextIndex = activeIndex + 1;
                audio.currentTime = data?.content.script?.[nextIndex]?.startTime ?? 0;
                setActiveIndex(nextIndex);
              }}
              className="absolute top-[200px] right-4 flex h-[48px] w-[48px] -translate-y-1/2 items-center justify-center rounded-full bg-black/40"
            >
              <img src={'/right_arrow.svg'} />
            </button>
          )}

          {/* gradient overlay */}
          {!isPlaying && (
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.3)_100%)]" />
          )}

          {/* play button */}
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute top-1/2 left-1/2 flex h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40"
            >
              <img src="/start.svg" className="ml-1" />
            </button>
          )}
        </div>
        {/* marquee title */}
        <div className="relative h-[80px] w-full overflow-hidden border-t-2 border-b-2 border-white bg-[linear-gradient(90deg,#DCEFFF_0%,#FFFFFF_50%,#DCEFFF_100%)]">
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
        <audio ref={audioRef} src={data?.content.audioUrl ?? ''} playsInline />
        <NewsnackSlider items={items} />
      </div>
    </>
  );
}
