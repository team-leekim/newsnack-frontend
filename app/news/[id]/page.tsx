// app/news/[id]/page.tsx
import MainViewer from '@/components/viewer/MainViewer';
import { newsDetailMock } from '@/mocks/newsDetail.mock';
import { Icon } from '@iconify/react';
import EditorSection from '@/components/section/EditorSection';
import Divider from '@/components/section/Divider';

const formatDateTime = (value: string) => {
  const [date, time] = value.split(' ');
  const formattedDate = date.replace(/-/g, '.');
  return `${formattedDate}. ${time}`;
};

type Props = {
  params: {
    id: string;
  };
};

export default function NewsDetailPage({ params }: Props) {
  const data = newsDetailMock; // 나중에 fetch로 교체

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="w-[390px] px-4 py-6">
        {/* Webtoon */}
        <section className="w-full">
          <MainViewer
            items={data.content.images.map((img) => (
              <img
                key={img.order}
                src={img.imageUrl}
                alt={`content-image-${img.order}`}
                className="h-[358px] w-[358px] rounded-2xl object-cover"
              />
            ))}
          />
        </section>

        {/* Title, Editor */}
        <header className="border-navy-100 mb-4 border-b">
          <h1 className="typo-h2 py-4">{data.title}</h1>
          <div className="flex items-center gap-[6px] pb-4 text-sm text-gray-500">
            <img
              src={data.editor.imageUrl}
              alt={data.editor.name}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="text-text-1 typo-subtitle-1 flex items-center">
              {data.editor.name}
            </span>
            <span className="typo-body-5-r text-text-3"> {formatDateTime(data.publishedAt)}</span>
          </div>
        </header>

        {/* Summary */}
        <section className="flex flex-col gap-2 rounded-sm bg-[#F0F2F4] px-4 py-6">
          <h2 className="text-text-1 typo-btn-1-b rounded-sm">
            💡 바쁜 당신을 위한 핵심체크! AI 3줄 핵심 브리핑
          </h2>
          <ul className="text-text-2 typo-body-2-r px-2">
            {data.summary.map((s, i) => (
              <li key={i} className="typo-body-2-r">
                • {s}
              </li>
            ))}
          </ul>
        </section>

        {/* Body */}
        <article className="typo-body-1-r text-text-1 mt-6 mb-4 whitespace-pre-line">
          {data.body}
        </article>
        <span className="text-text-3 typo-body-5-m mb-4 flex items-center gap-1">
          <Icon icon="mingcute:ai-fill" width={14} height={14} className="text-navy-600" />
          AI의 도움을 받아 작성된 글입니다.
        </span>
        {/* Editor Info */}
        <EditorSection editor={data.editor} />

        {/* Reaction Stats */}
        <section>
          <h2 className="typo-h3 my-6 text-black">이 기사에 대해 어떻게 생각하시나요?</h2>
          <ul className="my-6 grid grid-cols-5 gap-2 text-sm">
            {(
              [
                { key: 'ANGRY', label: '화나요', image: '/angry.svg' },
                { key: 'SURPRISED', label: '놀라워요', image: '/surprised.svg' },
                { key: 'HAPPY', label: '행복해요', image: '/happy.svg' },
                { key: 'EMPATHY', label: '공감돼요', image: '/empathy.svg' },
                { key: 'SAD', label: '슬퍼요', image: '/sad.svg' },
              ] as const
            ).map(({ key, label, image }) => (
              <li key={key} className="flex flex-col items-center justify-center gap-1 rounded-lg">
                <img src={image} alt={label} className="h-11 w-11 object-contain" />
                <span className="typo-body-5-m text-text-1">{label}</span>
                <span className="typo-body-5-m text-text-1">{data.reactionStats[key] ?? 0}</span>
              </li>
            ))}
          </ul>
        </section>
        <Divider />
        {/* Origin Articles */}
        <section>
          <h2 className="typo-h3 my-6 text-black">연관 기사를 더 보고 싶어요</h2>
          <ul className="space-y-2">
            {data.originArticles.map((article, i) => (
              <li key={i} className="last:[&>a]:border-b-0">
                <a
                  href={article.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-divider-1 block border-b py-2"
                >
                  <p className="typo-body-2-m text-text-1 line-clamp-2">{article.title}</p>
                  <p className="typo-body-5-r text-text-3 mt-1">
                    {formatDateTime(article.publishedAt)}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
