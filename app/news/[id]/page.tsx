import NewsDetailClient from '@/components/NewsDetailClient';
import { newsDetailMock } from '@/mocks/newsDetail.mock';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;

  return <NewsDetailClient id={id} data={newsDetailMock} />;
}
