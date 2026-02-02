export type ContentType = 'WEBTOON' | 'CARDNEWS';

export interface ContentEditor {
  id: number;
  name: string;
  imageUrl: string;
}

export interface ContentItem {
  id: number;
  title: string;
  contentType: ContentType;
  publishedAt: string;
  imageUrls: string[];
  editor: ContentEditor;
}

export interface ContentsResponse {
  contents: ContentItem[];
  nextCursor: number | null;
  hasNext: boolean;
}
