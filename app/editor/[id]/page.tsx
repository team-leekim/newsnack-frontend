// app/editor/[id]/page.tsx
import EditorSection from '@/components/section/EditorSection';
import EditorNewsCard from '@/components/EditorNewsCard';
import { getEditorDetail } from '@/api/editor';
import { EditorDetailResponse } from '@/types/editor';
import MainHeader from '@/components/header/MainHeader';

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let editor: EditorDetailResponse | null = null;

  try {
    const res = await getEditorDetail(Number(id));
    editor = res.data;
  } catch (error) {
    console.error(error);
  }

  if (!editor) {
    return <div>에디터를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="mx-auto w-[390px]">
      <MainHeader />
      <div className="bg-navy-0 px-4 py-2">
        <EditorSection editor={editor} />
      </div>
      <section className="mt-6">
        <div className="mx-auto grid w-[358px] grid-cols-2 gap-6">
          {editor.recentNews.map((news) => (
            <EditorNewsCard
              key={news.id}
              id={news.id}
              title={news.title}
              thumbnailUrl={news.thumbnailUrl}
              publishedAt={news.publishedAt}
              editorName={editor.name}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
