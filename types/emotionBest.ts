// types/emotionBest.ts

export type EmotionType = 'ANGRY' | 'HAPPY' | 'SAD' | 'EMPATHY' | 'SURPRISED';

export interface EmotionBestArticle {
  id: number;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  editorName: string;
}

export interface EmotionBestItem {
  emotionType: EmotionType;
  article: EmotionBestArticle;
}

export type EmotionBestResponse = EmotionBestItem[];
