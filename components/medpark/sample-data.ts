// 메드파크 사전과제 — 라이브 샘플용 합성·가명 데이터.
// 100% 가짜 데이터입니다. 실제 직원·실데이터·실연동 없음.

export type CaseKind = 'input' | 'analysis'
export type Severity = 'low' | 'med' | 'high'

export interface TimelineEntry {
  /** 최초 입실 · 외출 · 복귀 · 퇴실 */
  readonly label: string
  /** monospace 로 표시. null = 기록 없음 */
  readonly time: string | null
}

export interface LegalInsight {
  /** 근거 조문 목록 */
  readonly statutes: readonly string[]
  /** 판례(있을 때) */
  readonly precedent?: string
  /** 한 줄 해석 */
  readonly note: string
}

export interface AttendanceCard {
  readonly id: string
  readonly kind: CaseKind
  /** 유형 배지 텍스트 */
  readonly category: string
  readonly employee: string
  /** 가명 사번 */
  readonly empNo: string
  /** 일자 (요일 포함) */
  readonly date: string
  /** 카드에 보이는 결정론 측정값 한 줄 (mono) */
  readonly measure: string
  readonly severity: Severity
  /** 카드에 보이는 법령 인사이트 한 줄 */
  readonly insightLine: string
  /** 액션 라벨 */
  readonly actionLabel: string
  /** 입력형: 출입 타임라인 (측정 트랙) */
  readonly timeline: readonly TimelineEntry[]
  /** 분석형: 추세 한 줄 */
  readonly trend?: string
  readonly legal: LegalInsight
}

/** 근태유형 드롭다운 옵션 — 미리 채우지 않음(본인 선택) */
export const ATTENDANCE_TYPES: readonly string[] = [
  '외출',
  '조퇴',
  '지각',
  '반차(오전)',
  '반차(오후)',
  '연차',
  '출장',
  '재택근무',
  '휴일근무',
  '기타',
]

/** 결재선 (고정) */
export const APPROVAL_LINE: readonly string[] = ['본인', '팀장', '인사팀']

/** 법령 자문 패널 공통 디스클레이머 — 항상 표시 */
export const LEGAL_DISCLAIMER =
  '법령 해석을 돕는 참고 정보입니다. 시스템이 자동으로 판정하거나 임금을 차감하지 않습니다. 최종 판단은 담당자·노무가 합니다.'

/** 법령 자문 패널 공통 푸터 — 법령 기준 자동 반영(실호출 아님) */
export const LEGAL_FOOTER =
  '현행 기준 자동 반영: 근로기준법(시행 2025-10-23). 법령 개정 시 기준이 갱신됩니다.'

export const ATTENDANCE_CARDS: readonly AttendanceCard[] = [
  {
    id: 'mismatch-approval',
    kind: 'input',
    category: '결재 불일치',
    employee: '김민준',
    empNo: 'M-2041',
    date: '2026-06-25 (목)',
    measure: '외출 결재 없음 · 출입 14:03–15:38 (1h35m)',
    severity: 'high',
    insightLine: '외출 시간은 결재 근거 없이 자동 차감 불가 — 본인 기안 필요',
    actionLabel: '기안 작성',
    timeline: [
      { label: '최초 입실', time: '08:52' },
      { label: '외출', time: '14:03' },
      { label: '복귀', time: '15:38' },
      { label: '퇴실', time: '18:11' },
    ],
    legal: {
      statutes: ['근로기준법 제50조(근로시간)'],
      note: '근로시간 중 외출은 결재 근거가 있어야 시간 공제가 가능합니다. 출입 기록만으로 자동 차감하지 않고, 본인 기안과 결재로 사유를 확정합니다.',
    },
  },
  {
    id: 'no-record',
    kind: 'input',
    category: '기록 없음',
    employee: '이서연',
    empNo: 'M-1187',
    date: '2026-06-24 (수)',
    measure: '출입·결재 모두 없음 · 무단결근 후보',
    severity: 'high',
    insightLine: '무단결근은 자동 단정 불가 — 본인 확인 후 담당자 판단',
    actionLabel: '본인 확인 요청',
    timeline: [
      { label: '최초 입실', time: null },
      { label: '외출', time: null },
      { label: '복귀', time: null },
      { label: '퇴실', time: null },
    ],
    legal: {
      statutes: ['근로기준법 제42조(계약 서류의 보존)'],
      note: '무단결근 여부는 사용자가 입증해야 합니다. 시스템은 "기록 없음" 사실만 제시하며, 결근 처리는 본인 확인 뒤 담당자가 결정합니다.',
    },
  },
  {
    id: 'idle-excess',
    kind: 'analysis',
    category: '자리비움 과다',
    employee: '박도윤',
    empNo: 'M-3320',
    date: '2026-06-26 (금)',
    measure: '미승인 이탈 누적 1h12m (임계 30m 초과)',
    severity: 'med',
    insightLine: '짧은 자리비움은 근로시간 인정 — 누적값은 모니터링용, 임금 공제 금지',
    actionLabel: '관리자 검토',
    timeline: [],
    trend: '최근 5근무일 평균 이탈 52m · 상승 추세',
    legal: {
      statutes: ['근로기준법 제54조(휴게시간)'],
      note: '휴게시간은 근로시간에서 제외되지만, 짧은 자리비움은 통상 근로시간으로 인정됩니다. 누적값만으로 임금을 공제할 수 없고 모니터링 지표로만 사용합니다.',
    },
  },
  {
    id: 'weekly-52h',
    kind: 'analysis',
    category: '52시간 임박',
    employee: '최지우',
    empNo: 'M-2755',
    date: '2026-06-25 (목) 기준',
    measure: '주 실근로 48h20m (목 기준 잔여 3h40m)',
    severity: 'high',
    insightLine: '주 52시간은 1주 총 실근로 기준 판단(대법원 2020도15393) — 사전 경고용',
    actionLabel: '사전 경고',
    timeline: [],
    trend: '금요일 통상 9h 근무 패턴 → 주간 한도 초과 위험',
    legal: {
      statutes: ['근로기준법 제50조(근로시간)', '근로기준법 제53조(연장 근로의 제한)'],
      precedent: '대법원 2020도15393',
      note: '주 52시간 위반은 하루 단위가 아니라 1주 총 실근로시간을 기준으로 판단합니다(대법원 2020도15393). 한도 임박은 사전 경고 지표로만 쓰고 자동 처리하지 않습니다.',
    },
  },
  {
    id: 'late-night',
    kind: 'analysis',
    category: '심야 출입',
    employee: '정하준',
    empNo: 'M-0962',
    date: '2026-06-24 (수)',
    measure: '23:47 출입 · 평소 18–19시 퇴근 패턴 이탈',
    severity: 'med',
    insightLine: '출입 기록만으로 야간근로 단정 불가 — 실근로 인정 시 가산(제56조)',
    actionLabel: '검토',
    timeline: [],
    trend: '당월 심야 출입 3회째',
    legal: {
      statutes: ['근로기준법 제56조(연장·야간 및 휴일 근로)'],
      note: '야간(22시~익일 06시) 가산수당은 실제 근로가 인정될 때 발생합니다. 출입 기록만으로 야간근로를 단정하지 않고, 사유 확인이 필요합니다.',
    },
  },
  {
    id: 'holiday-unfiled',
    kind: 'input',
    category: '휴일근무 미신청',
    employee: '한서윤',
    empNo: 'M-4108',
    date: '2026-06-21 (토)',
    measure: '토 09:05–13:10 출입 · 결재 없음',
    severity: 'med',
    insightLine: '미신청 휴일 출입은 자동 인정 불가 — 사후 기안으로 확정(제55·56조)',
    actionLabel: '기안 작성',
    timeline: [
      { label: '최초 입실', time: '09:05' },
      { label: '외출', time: null },
      { label: '복귀', time: null },
      { label: '퇴실', time: '13:10' },
    ],
    legal: {
      statutes: ['근로기준법 제55조(휴일)', '근로기준법 제56조(연장·야간 및 휴일 근로)'],
      note: '사전 신청·승인이 없는 휴일 출입은 근로시간으로 자동 인정되지 않습니다. 사후 기안과 결재로 휴일근로 여부를 확정합니다.',
    },
  },
]
