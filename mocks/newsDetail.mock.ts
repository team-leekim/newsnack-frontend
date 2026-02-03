// mocks/newsDetail.mock.ts
import { ContentDetailResponse } from '@/types/contentDetail';

export const newsDetailMock: ContentDetailResponse = {
  id: 101,
  category: 'IT과학',
  title: '캄보디아 한국인 스캠 조직원 73명 강제송환…"역대 최대 규모"',
  publishedAt: '2026-01-22 08:30',
  contentType: 'WEBTOON',
  summary: ['첫 번째 요약 문장입니다.', '두 번째 요약 문장입니다.', '세 번째 요약 문장입니다.'],
  body: `두쫀쿠가 K-푸드야?

지난 연말, 일본에 사는 친구가 ‘두바이쫀득쿠키’를 사달라고 했다. 왜 그걸 한국에서 찾느냐고 되물었더니 한국 디저트란다. 두바이 초콜릿이 유행이라기에, ‘두쫀쿠’ 역시 당연히 해외에서 건너온 디저트일 거라 짐작했지만, 알아보니 정말 국산(?)이다.

뉴스와 SNS는 물론, 편의점과 카페, 배달앱까지 특정 디저트 이름이 이렇게 자주 보인 적이 있었나 싶었다. 시작은 2023년 말 두바이의 한 인플루언서가 올린 먹방 영상이었다. 한국에서 ‘두바이 초콜릿’으로 불리며 화제가 된 ‘픽스 디저트 쇼콜라티에’의 초콜릿은 현지에서도 1∼2분 안에 완판될 정도로 귀해졌다. 그러자 한국 사람들은 기다리지 않았다. 대신 만들었다.

2025년 4월, 한 국내 베이커리가 중동 디저트에 주로 쓰이는 카다이프와 피스타치오를 마시멜로로 감싼 동그란 쫀득쿠키를 선보였다. 그렇게 탄생한 두바이쫀득쿠키, 일명 두쫀쿠는 정작 두바이 사람들은 모르는 이름이지만, 한국에서 가장 힙한 디저트가 됐다.

인기가 폭발하자 피스타치오와 카다이프 가격은 치솟았고, 예약은 몇 주씩 밀렸다. 이내 기발한 대체 버전들이 쏟아졌다. 카다이프 대신 국수 소면이나 라면을 쓰는 ‘짭쫀쿠’ 레시피가 등장했고, 두바이 크레페, 두바이 케이크, 두바이 소금빵을 거쳐 급기야 두바이 김밥까지 등장했다. DIY 키트와 원데이 클래스도 생겨났다. 줄을 서고, 한정 수량을 구매하고, 단면을 자르고, 인증하는 과정 자체가 하나의 놀이이자 콘텐츠가 됐다.`,
  editor: {
    id: 1,
    name: '에디터A',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEwMTZfMTUz%2FMDAxNzI5MDUzMTY2MzUw.LogQtODfY6TgUCBh_w_XvYl9Xi_EXAs11ElsRWK3Fm0g.e71EMKo9UQaNIwJB5oaYIK28Uo9adCLaHpITn18-UWEg.PNG%2Fimage.png&type=a340',
    keywords: ['#친절한', '#IT전문', '#쉽게설명'],
    description: '복잡한 IT 기술과 기후 변화의 핵심 로직을 분석하는 데 특화된 에디터입니다.',
  },
  imageUrls: [
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA0MDRfMTg3%2FMDAxNzEyMjE5MzM4NTE0.1wQ_s3DiszczjWw7ivmMi2s-4npgnpAgjpQCwQf4_4Eg.nAKOHKojSmjHuJSHOFr8c7xkDxmSL8nzUSa9mN5qAukg.PNG%2Fimage.png&type=a340',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MjFfMjY5%2FMDAxNzU4NDI0NzA3MzA0.tzdTWRxxru7vsY-7GOAH-HrqqKuhT2axUrS7BiP2Lbog.BCcljARu8-jaBmADIlAnLg2giOfymqJKYwgvmSbI6F8g.PNG%2Fimage.png&type=a340',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEwMTJfMjI0%2FMDAxNzI4NzEzNDkzMTgz.0hT6ISzuCMl4iPN6Wtj6Jl3m-d7NLnMnbT_Xl7OmjzYg.SFlouxKP2FBrvEMoFahvXeQvUaOK-wx2O3VTgq_0xFYg.PNG%2Fimage.png&type=sc960_832',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjExMjdfMTMz%2FMDAxNjY5NTU5OTg2MTE4.8U6-gDsjL1pbB63ngBNWEo_UC9E3lxvrSC4cWgcd340g.kUQQsfP_gMwf9m_J_ohF9ObVftQfVRIaJ-bauM1A-L4g.JPEG.rlachdnjs28%2FScreenshot%25A3%25DF20221109%25A3%25DF172506%25A3%25DFSamsung_Internet.jpg&type=a340',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MjFfMjY5%2FMDAxNzU4NDI0NzA3MzA0.tzdTWRxxru7vsY-7GOAH-HrqqKuhT2axUrS7BiP2Lbog.BCcljARu8-jaBmADIlAnLg2giOfymqJKYwgvmSbI6F8g.PNG%2Fimage.png&type=a340',
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEwMTJfMjI0%2FMDAxNzI4NzEzNDkzMTgz.0hT6ISzuCMl4iPN6Wtj6Jl3m-d7NLnMnbT_Xl7OmjzYg.SFlouxKP2FBrvEMoFahvXeQvUaOK-wx2O3VTgq_0xFYg.PNG%2Fimage.png&type=sc960_832',
  ],
  reactionStats: {
    HAPPY: 10,
    SURPRISED: 5,
    SAD: 2,
    ANGRY: 1,
    EMPATHY: 20,
  },
  originalArticles: [
    {
      title: '엔비디아 역대급 실적 발표',
      publishedAt: '2026-01-22 09:30',
      url: 'https://...',
    },
    {
      title: '한국은행 기준금리 동결',
      publishedAt: '2026-01-22 09:30',
      url: 'https://...',
    },
    {
      title:
        ' 어르신의 경험을 일자리로, 서울 금천구에 문 연 타ㅓㅏㅓㅏㅓ리ㅏ어리ㅓ니ㅏ른ㅁ이ㅑ런ㅇ먀ㅣ룽너리ㅏㅜㄴ미ㅏ러;냐ㅣ러ㅣ나루.ㅏㅓㅁ뇌;',
      publishedAt: '2026-01-22 09:30',
      url: 'https://...',
    },
  ],
};
