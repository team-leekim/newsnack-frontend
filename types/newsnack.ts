export interface NewsSnackScript {
  startTime: number;
  endTime: number;
  title: string;
}

export interface TodayNewsSnackContent {
  audioUrl: string;
  script: NewsSnackScript[];
  imageUrls: string[];
}

export interface NewsSnackArticle {
  id: number;
  title: string;
  publishedAt: string;
}

export interface TodayNewsSnackResponse {
  content: TodayNewsSnackContent;
  articles: NewsSnackArticle[];
}
