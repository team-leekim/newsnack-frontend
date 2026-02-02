export interface EditorRecentNews {
  id: number;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
}

export interface EditorDetailResponse {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  keywords: string[];
  recentNews: EditorRecentNews[];
}
