// 근무 기간 표시. 화면(브라우저)에서도 쓰므로 파일 입출력(versions.ts)과 나눠 둔다.

/** 사람인 방식의 근무 개월 수 — 시작 달과 끝 달을 모두 센다. 재직 중이면 기준 달까지. */
export function careerMonths(
  start: string,
  end: string | null,
  today: Date = new Date(),
): number {
  const [sy, sm] = start.split(".").map(Number);
  const [ey, em] = end
    ? end.split(".").map(Number)
    : [today.getFullYear(), today.getMonth() + 1];
  if (!sy || !sm || !ey || !em) return 0;
  return Math.max(0, (ey - sy) * 12 + (em - sm) + 1);
}

export function monthsLabel(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${rest}개월`;
  return rest === 0 ? `${years}년` : `${years}년 ${rest}개월`;
}
