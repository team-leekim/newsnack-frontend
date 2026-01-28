export interface Editor {
  id: number;
  name: string;
  imageUrl: string;
}

export interface WebtoonContent {
  id: number;
  title: string;
  publishedAt: string;
  imageUrls: string[];
  editor: Editor;
}
