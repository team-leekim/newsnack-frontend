// UTC 문자열을 Date 객체로 변환 (변환 없이 그대로)
export function parseUTCString(utcString?: string): Date {
  if (!utcString) return new Date();

  const match = utcString.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/);
  if (!match) return new Date(utcString);

  const [_, year, month, day, hour, minute] = match;

  // UTC 그대로 Date 객체 생성
  const utcDate = new Date(Date.UTC(+year, +month - 1, +day, +hour, +minute));

  return utcDate;
}

// 상대 시간만 표시 (n분 전, n시간 전, 날짜)
export function formatPublishedAt(publishedAt: string): string {
  const publishedDate = parseUTCString(publishedAt);
  const now = new Date();
  const diffMs = now.getTime() - publishedDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);

  // 24시간 이상 지났으면 날짜만 표시
  if (diffHours >= 24) {
    const yyyy = publishedDate.getUTCFullYear();
    const mm = String(publishedDate.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(publishedDate.getUTCDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  }

  // 1시간 이상 지났으면 n시간 전
  if (diffHours >= 1) return `${diffHours}시간 전`;

  // 1시간 이내면 n분 전
  return `${Math.max(diffMinutes, 1)}분 전`;
}

// 절대 시간 표시 (뉴스 상세 페이지용)
export function formatAbsoluteDateTime(publishedAt: string): string {
  const publishedDate = parseUTCString(publishedAt);
  const yyyy = publishedDate.getUTCFullYear();
  const mm = String(publishedDate.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(publishedDate.getUTCDate()).padStart(2, '0');
  const hh = String(publishedDate.getUTCHours()).padStart(2, '0');
  const mi = String(publishedDate.getUTCMinutes()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
}
