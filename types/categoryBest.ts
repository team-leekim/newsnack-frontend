export interface CategoryBestArticle {
  id: number;
  title: string;
  thumbnailUrl: string;
}

export interface CategoryBestItem {
  categoryName: string;
  article: CategoryBestArticle;
}

export type CategoryBestResponse = CategoryBestItem[];
