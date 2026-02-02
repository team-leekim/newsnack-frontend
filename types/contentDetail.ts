//뉴스 상세 정보
import { ContentType } from './content';
import { EmotionType } from './emotionBest';

export type CategoryType =
  | '정치'
  | '경제'
  | '사회'
  | '국제'
  | '문화'
  | 'IT과학'
  | '스포츠'
  | '연예'
  | '라이프'
  | '기타';

export interface ContentEditorDetail {
  id: number;
  name: string;
  imageUrl: string;
  keywords: string[];
  description: string;
}

export interface OriginalArticle {
  title: string;
  url: string;
  publishedAt: string;
}

export interface ContentDetailResponse {
  id: number;
  title: string;
  category: CategoryType;
  publishedAt: string;
  contentType: ContentType;

  summary: string[];
  body: string;

  editor: ContentEditorDetail;
  imageUrls: string[];

  reactionStats: Record<EmotionType, number>;

  originalArticles: OriginalArticle[];
}
