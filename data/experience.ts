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
      '인력이 크게 줄어든 영업관리팀에 들어가 계약·주문·반품·법정 보고 업무를 다시 세웠습니다. 회생 절차 실무와 부광약품 인수 뒤 통합(PMI)을 거쳤고, 2026-08부터 영업본부를 겸직하며 분석·기획과 SFE(영업력 분석)를 맡고 있습니다. 필요한 시스템은 직접 만들어 운영했습니다.',
    highlights: [
      '거래약정서 전자계약 재체결, 거래처 직접 주문(이오더) 도입, 반품 입력 기준으로 인원이 빠진 영업관리 업무를 다시 정해진 경로로 돌림',
      '법정 공급내역보고 지연 사고의 경위·감경을 정리해 판매업무정지 1개월을 10일로 감경받고, 30분 걸리던 보고를 업로드 한 번 2~3분으로 줄임',
      '회생 절차에서 채권 신고·거래처 안내·영업부 동원을 맡고, 회계감사·재고 실사 등 감사 대응 자료를 냄',
      '부광약품 통합에서 부광 영업관리·기획·정보전략팀의 영업 부문 창구를 맡아 사전 점검 답변부터 부광 양식 월간 KPI, 품목 표준코드 전수표까지 냄',
      '구 ERP 폐기(2026-08) 전에 원장을 월×전표 806그룹 단위로 전수 대조(차이 0)하고, 새 ERP 전환 뒤 두 달간 데이터 오류 속에서도 법정 보고를 멈추지 않음',
      '영업부 일보(방문)와 ERP 매출·목표를 이은 SFE 분석을 업계 표준 6단계로 세우고, 2026-10 월간 영업부 회의에서 영업사원별 행동 지시를 담아 첫 발표',
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
