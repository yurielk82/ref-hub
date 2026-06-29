// 별첨 예시 화면 데이터 — 100% 합성·가명. Claude Design 시안 CASES 포팅.

export type Severity = '심각' | '주의'
export type Kind = '입력형' | '분석형'

export interface CaseItem {
  readonly id: string
  readonly nm: string
  readonly cat: string
  readonly sev: Severity
  readonly kind: Kind
  readonly meas: string
  readonly sabun: string
  readonly date: string
  /** [라벨, 시각] — 시스템 측정(잠금) 트랙 */
  readonly times: readonly (readonly [string, string])[]
  readonly ref: string
  readonly legal: string
}

const D_THU = '2026-06-25 (목)'

export const CASES: readonly CaseItem[] = [
  {
    id: 'kim',
    nm: '김민준',
    cat: '결재 불일치',
    sev: '심각',
    kind: '입력형',
    meas: '외출 결재 없음 · 출입 14:03–15:38 (1h35m)',
    sabun: 'M-2041',
    date: D_THU,
    times: [
      ['최초 입실', '08:52'],
      ['외출', '14:03'],
      ['복귀', '15:38'],
      ['퇴실', '18:11'],
    ],
    ref: '근로기준법 제50조(근로시간)',
    legal:
      '근로시간 중 외출은 결재 근거가 있어야 시간 공제가 가능합니다. 출입 기록만으로 자동 차감하지 않고, 본인 기안과 결재로 사유를 확정합니다.',
  },
  {
    id: 'lee',
    nm: '이서연',
    cat: '기록 없음',
    sev: '심각',
    kind: '입력형',
    meas: '출입·결재 모두 없음 · 무단결근 후보',
    sabun: 'M-3318',
    date: D_THU,
    times: [
      ['당일 출입 기록', '없음'],
      ['전자결재', '없음'],
    ],
    ref: '근로기준법 — 무단결근 판단',
    legal:
      '무단결근은 출입·결재 부재만으로 단정할 수 없습니다. 시스템이 본인에게 확인을 요청하고, 사유 확인 후 담당자가 판단합니다.',
  },
  {
    id: 'park',
    nm: '박도윤',
    cat: '자리비움 과다',
    sev: '주의',
    kind: '분석형',
    meas: '미승인 이탈 누적 1h12m (임계 30m 초과)',
    sabun: 'M-1156',
    date: D_THU,
    times: [
      ['이탈 ①', '10:22 → 10:54 (32m)'],
      ['이탈 ②', '15:40 → 16:20 (40m)'],
      ['누적', '1h12m'],
    ],
    ref: '근로기준법 제54조(휴게)',
    legal:
      '근로시간 중 짧은 대기·자리비움은 사용자의 지휘·감독 아래 있는 한 근로시간으로 인정될 수 있습니다. 누적 수치는 임금 차감 근거가 아니라 관리자가 검토할 대상을 좁히는 모니터링 지표입니다.',
  },
  {
    id: 'choi',
    nm: '최지우',
    cat: '52시간 임박',
    sev: '심각',
    kind: '분석형',
    meas: '주 실근로 48h20m (목 기준 잔여 3h40m)',
    sabun: 'M-0925',
    date: D_THU,
    times: [
      ['월', '9h10m'],
      ['화', '10h20m'],
      ['수', '9h50m'],
      ['목', '9h00m'],
      ['주 누적', '48h20m'],
    ],
    ref: '근로기준법 제53조(연장 근로의 제한)',
    legal:
      '1주 총 근로시간은 연장 포함 52시간을 초과할 수 없습니다(제53조). 위반 여부는 1주 총 실근로시간 기준으로 판단합니다(대법원 2020도15393). 시스템은 임계 도달 전 사전 경고만 제공합니다.',
  },
  {
    id: 'jung',
    nm: '정하준',
    cat: '심야 출입',
    sev: '주의',
    kind: '분석형',
    meas: '23:47 출입 · 평소 18–19시 퇴근 패턴 이탈',
    sabun: 'M-2207',
    date: D_THU,
    times: [
      ['최초 입실', '08:40'],
      ['퇴실', '18:35'],
      ['재입실', '23:47'],
      ['재퇴실', '01:12 (익일)'],
    ],
    ref: '근로기준법 제56조(연장·야간 및 휴일 근로)',
    legal:
      '22시~익일 6시 근로는 야간근로 가산 대상이나, 출입 기록만으로 실제 근로 여부를 단정할 수 없습니다. 본인·관리자 확인 후 판단합니다.',
  },
  {
    id: 'han',
    nm: '한서윤',
    cat: '휴일근무 미신청',
    sev: '주의',
    kind: '입력형',
    meas: '토 09:05–13:10 출입 · 결재 없음',
    sabun: 'M-1842',
    date: '2026-06-27 (토)',
    times: [
      ['입실', '09:05'],
      ['퇴실', '13:10'],
    ],
    ref: '근로기준법 제55·56조(휴일·가산수당)',
    legal:
      '휴일근로는 사전 승인과 가산수당 산정이 필요합니다. 미신청 휴일 출입은 자동 인정하지 않고, 본인 기안과 결재로 휴일근로 여부를 확정합니다.',
  },
]
