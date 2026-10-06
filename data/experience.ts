/** 회사 재직 이력과 개인 활동을 구분한다 — 이력서에서 둘을 같은 층에 두면 재직 기간이 왜곡된다. */
export type ExperienceKind = 'employment' | 'independent'

export interface Experience {
  period: string
  title: string
  role: string
  kind: ExperienceKind
  description: string
  /** 정량 성과 — 사례 상세(data/ax.ts)에 근거가 있는 수치만 적는다 */
  highlights: string[]
  projects: string[]
}

export interface SkillCategory {
  label: string
  items: string[]
}

export const EXPERIENCES: Experience[] = [
  {
    period: '2025-03 — 지금',
    title: '부광유니파마(구 한국유니온제약) 영업관리팀',
    role: '과장 · 2026-08부터 영업본부 겸직(분석·기획)',
    kind: 'employment',
    description:
      '영업관리팀에서 정산·법정 보고·영업 데이터 업무의 병목을 직접 시스템으로 풀어 왔습니다. 2026-05 부광약품 인수 뒤에는 영업관리와 함께 영업본부를 겸직하며 분석·기획을 맡아, ERP 교체 속에서 영업 숫자의 원천을 지키고 그 위에 SFE(영업력 분석)를 세우고 있습니다.',
    highlights: [
      '구 ERP 폐기(2026-08) 전에 원장을 월×전표 806그룹 단위로 전수 대조(차이 0)하고, 새 ERP의 BI 인터페이스로 원천을 옮겨 8월 매출·수금을 원 단위로 맞춤 — 영업 숫자가 끊기지 않게 함',
      '영업부 일보(방문)와 ERP 매출·목표를 이은 SFE 분석을 업계 표준 6단계로 세우고, 2026-10 월간 영업부 회의에서 영업사원별 행동 지시를 담아 첫 발표',
      'ERP 전환 뒤 두 달 동안 새 ERP 데이터 오류가 이어질 때, 직접 만든 공급내역 보고 자동화(CSV 입력·10배 금액 자동 보정)로 법정 KPIS 보고를 멈추지 않음',
      '영업지원팀 워크스페이스를 재설계해 월말 마감과 회계 제출용 실매출을 매출할인 반영 상태와 함께 한 화면에서 내게 함',
      '외래키 없는 구 ERP 785개 테이블 중 648개(82.5%)의 관계를 추론해 이관용 구조 포털로 정리',
      'CSO 정산 조회·발송 포털과 처방통계 위변조 1차 선별을 운영했고, 인수 뒤 상용 플랫폼이 도입되자 그 개발에 참여',
    ],
    projects: [
      'pharmkpi',
      'sales-hq-sfe',
      'sales-strategy-portal',
      'pharmkpi-exec',
      'kpis-dsr-api',
      'csoweb',
      'erp-spec',
    ],
  },
  {
    period: '2026',
    title: 'AI 기반 개발 환경 구축',
    role: '개인 연구 · 도구 개발',
    kind: 'independent',
    description:
      '규칙 22개·훅 48개·스킬 128개로 구성된 AI 페어 프로그래밍 자동화 하네스를 설계하고, SRT 열차 자동 예매 시스템을 Next.js + FastAPI + Redis 풀스택으로 구축했습니다. 완료를 자기보고가 아닌 독립 재검증으로 막는 게이트와 야간 자율 수정 루프를 실제로 운영합니다.',
    highlights: [
      '무엇을 만들고 무엇을 만들지 않을지를 교차-벤더 적대 감사와 측정으로 결정하는 증거 게이트(har_eval) 운영',
      'Cloudflare·Nginx·systemd·Docker 위에서 self-host Supabase를 포함한 배포 서비스 16개(2026-10 기준)를 단독 구축·운영',
    ],
    projects: ['claude-dotfiles', 'har-eval', 'srt'],
  },
  {
    period: '2026',
    title: '프리랜서 개발',
    role: '외부 프로젝트',
    kind: 'independent',
    description:
      '전기차 구동 모터 신뢰성 시험 데이터 분석 도구(Python + C DSP)를 개발했습니다. 빌드→플래싱→수집→분석→리포트를 한 파이프라인으로 잇고, Weibull·Coffin-Manson 수명 통계를 감사 추적성을 위해 직접 구현했습니다.',
    highlights: [
      '24시간 무인 시험을 위해 저지연 UART 수집과 WebSocket 실시간 모니터링 채널을 분리',
    ],
    projects: ['ev-motor-reliability'],
  },
]

/**
 * 기술 스택 — 이 사이트의 프로젝트에서 실제로 쓴 것만 올린다.
 * `/ax`의 Proof Stack(AX_STACK)은 같은 역량을 AX 관점으로 묶은 뷰라 항목이 겹친다.
 */
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: '웹 · 앱',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vite', 'PWA · Capacitor'],
  },
  {
    label: '백엔드 · 데이터',
    items: ['FastAPI', 'Express', 'Prisma', 'Supabase', 'PostgreSQL', 'MSSQL', 'Oracle ERP'],
  },
  {
    label: 'AI 워크플로우',
    items: ['Claude API', 'Gemini', 'GPT', 'Vision OCR', '법령 그라운딩(RAG)', '프롬프트 · 하네스'],
  },
  {
    label: '운영 · 인프라',
    items: [
      'Nginx',
      'systemd',
      'Docker',
      'Cloudflare',
      'self-host Supabase',
      'Redis',
      '헬스체크 · 자동 롤백 배포',
    ],
  },
]
