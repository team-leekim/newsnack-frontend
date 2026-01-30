export function convertUTCtoKST(utcString: string): Date {
  const match = utcString.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/);
  if (!match) return new Date(utcString); // fallback
  const [_, year, month, day, hour, minute] = match;
  const kstDate = new Date(Date.UTC(+year, +month - 1, +day, +hour + 9, +minute));
  return kstDate;
}

// UTC 문자열 → KST Date → YYYY.MM.DD HH:mm 문자열
export function formatKSTDateTime(utcString: string): string {
  // "YYYY-MM-DD HH:mm" → [year, month, day, hour, minute]
  const match = utcString.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/);
  if (!match) return utcString;

  const [_, year, month, day, hour, minute] = match.map(Number);

  let adjustedHour = hour + 9;
  let adjustedDay = day;
  let adjustedMonth = month;
  let adjustedYear = year;

  if (adjustedHour >= 24) {
    adjustedHour -= 24;
    adjustedDay += 1;
    // 월, 연도 계산 필요
    const daysInMonth = new Date(adjustedYear, adjustedMonth, 0).getDate();
    if (adjustedDay > daysInMonth) {
      adjustedDay = 1;
      adjustedMonth += 1;
      if (adjustedMonth > 12) {
        adjustedMonth = 1;
        adjustedYear += 1;
      }
    }
  }

  const yyyy = adjustedYear;
  const mm = String(adjustedMonth).padStart(2, '0');
  const dd = String(adjustedDay).padStart(2, '0');
  const hh = String(adjustedHour).padStart(2, '0');
  const mi = String(minute).padStart(2, '0');

  return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
}

// 상대 시간 함수
export function formatPublishedAt(publishedAt: string): string {
  const kstDate = convertUTCtoKST(publishedAt);
  const now = new Date();
  const diffMs = now.getTime() - kstDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours >= 24) {
    return `${kstDate.getFullYear()}.${String(kstDate.getMonth() + 1).padStart(2, '0')}.${String(kstDate.getDate()).padStart(2, '0')}`;
  }
  if (diffHours >= 1) return `${diffHours}시간 전`;
  return `${Math.max(diffMinutes, 1)}분 전`;
}

// 절대 시간 함수 (뉴스 페이지용)
export function formatAbsoluteDateTime(publishedAt: string): string {
  const kstDate = convertUTCtoKST(publishedAt);
  const yyyy = kstDate.getFullYear();
  const mm = String(kstDate.getMonth() + 1).padStart(2, '0');
  const dd = String(kstDate.getDate()).padStart(2, '0');
  const hh = String(kstDate.getHours()).padStart(2, '0');
  const mi = String(kstDate.getMinutes()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
}
