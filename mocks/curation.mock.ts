export interface EmotionNewsItem {
  id: number;
  title: string;
  editorName: string;
  publishedAt: string;
  imageUrl: string;
  category: string;
  reactionCount: number;
}

export const curationMock: EmotionNewsItem[] = [
  {
    id: 101,
    title: '엔비디아 역대급 실적 발표, AI 반도체 시장 주도',
    editorName: '에디터A',
    publishedAt: '2026-01-22 10:00',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEwMTZfMTUz%2FMDAxNzI5MDUzMTY2MzUw.LogQtODfY6TgUCBh_w_XvYl9Xi_EXAs11ElsRWK3Fm0g.e71EMKo9UQaNIwJB5oaYIK28Uo9adCLaHpITn18-UWEg.PNG%2Fimage.png&type=a340',
    category: '경제',
    reactionCount: 150,
  },
  {
    id: 102,
    title: '한국은행 기준금리 동결, 금융시장 안정세',
    editorName: '에디터B',
    publishedAt: '2026-01-22 09:30',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEwMTZfMTUz%2FMDAxNzI5MDUzMTY2MzUw.LogQtODfY6TgUCBh_w_XvYl9Xi_EXAs11ElsRWK3Fm0g.e71EMKo9UQaNIwJB5oaYIK28Uo9adCLaHpITn18-UWEg.PNG%2Fimage.png&type=a340',
    category: '국제',
    reactionCount: 98,
  },
  {
    id: 103,
    title: 'AI 기술 확산으로 개발자 수요 급증',
    editorName: '에디터C',
    publishedAt: '2026-01-21 22:10',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEwMTZfMTUz%2FMDAxNzI5MDUzMTY2MzUw.LogQtODfY6TgUCBh_w_XvYl9Xi_EXAs11ElsRWK3Fm0g.e71EMKo9UQaNIwJB5oaYIK28Uo9adCLaHpITn18-UWEg.PNG%2Fimage.png&type=a340',
    category: 'IT/과학',
    reactionCount: 210,
  },
  {
    id: 104,
    title: '친환경 에너지 투자 확대, 글로벌 트렌드로',
    editorName: '에디터D',
    publishedAt: '2026-01-21 18:45',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEwMTZfMTUz%2FMDAxNzI5MDUzMTY2MzUw.LogQtODfY6TgUCBh_w_XvYl9Xi_EXAs11ElsRWK3Fm0g.e71EMKo9UQaNIwJB5oaYIK28Uo9adCLaHpITn18-UWEg.PNG%2Fimage.png&type=a340',
    category: '사회',
    reactionCount: 76,
  },
  {
    id: 105,
    title: '스타트업 생태계 회복 조짐, 투자 심리 개선',
    editorName: '에디터E',
    publishedAt: '2026-01-20 14:20',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEwMTZfMTUz%2FMDAxNzI5MDUzMTY2MzUw.LogQtODfY6TgUCBh_w_XvYl9Xi_EXAs11ElsRWK3Fm0g.e71EMKo9UQaNIwJB5oaYIK28Uo9adCLaHpITn18-UWEg.PNG%2Fimage.png&type=a340',
    category: '경제',
    reactionCount: 132,
  },
];
