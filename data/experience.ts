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
    period: '2025 — 2026',
    title: '한국유니온제약(주) 영업관리팀',
    role: '운영 체계 재정비 · 시스템 기획·구축',
    kind: 'employment',
    description:
      '회생절차와 인수 과정에서 불안정해진 운영 기준을 재정비하고, 부서 간 협업 구조를 실무적으로 재설계했습니다. CSO 정산 시스템을 AI로 기획·구축하여 수기 정산을 자동화했고, ERP 신규 전환에서 현업·전산팀·외부 파트너 간 조율을 담당했습니다.',
    highlights: [
      'CSO 300여 거래처 처방통계 전수 육안 검토(매달 15영업일)를 위변조 4종 동시 탐지 + 사람 검수 구조로 재설계 — 회사가 상용 도입을 결정하며 개발 파트너로 참여',
      '법정 의약품 공급내역보고의 매일 엑셀 수작업을 KPIS API 자동 검수·교정으로 대체, 자동 신고 직전 단계까지 구현',
      'PMI 경영 보고를 ERP 직접 조회 대신 스냅샷 기반 자체 BI로 전환해 일·주·월 보고 주기 지원',
      '인수사 IT팀 인계를 위해 Oracle ERP 785개 테이블 중 648개(82.5%)의 관계를 탐색 가능한 웹 레퍼런스로 정리',
    ],
    projects: ['pharmkpi', 'csoweb', 'kpis-dsr-api', 'erp-spec'],
  },
  {
    period: '2025',
    title: 'AI 기반 개발 환경 구축',
    role: '개인 연구 · 도구 개발',
    kind: 'independent',
    description:
      '규칙 22개·훅 48개·스킬 128개로 구성된 AI 페어 프로그래밍 자동화 하네스를 설계하고, SRT 열차 자동 예매 시스템을 Next.js + FastAPI + Redis 풀스택으로 구축했습니다. 완료를 자기보고가 아닌 독립 재검증으로 막는 게이트와 야간 자율 수정 루프를 실제로 운영합니다.',
    highlights: [
      '무엇을 만들고 무엇을 만들지 않을지를 교차-벤더 적대 감사와 측정으로 결정하는 증거 게이트(har_eval) 운영',
      'Cloudflare·Nginx·systemd·Docker 위에서 self-host Supabase를 포함한 프로덕션 서비스 20여 개를 단독 구축·운영',
    ],
    projects: ['claude-dotfiles', 'har-eval', 'srt'],
  },
  {
    period: '2024',
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
