import type { AxGrounding, AxMethodStep, AxPillar, AxStackGroup } from './ax-types'

export const AX_HERO = {
  /** 이력서 사이트라 누구의 것인지 첫 화면에서 보여야 한다 (푸터 저작권만으로는 부족). */
  name: '권대환',
  role: '제약 영업관리 · 영업 분석·기획',
  /** 구조화 데이터(Person)용 — 경력 표(data/experience.ts)와 같은 사실 */
  jobTitle: '영업관리팀 과장 · 영업본부 겸직(분석·기획)',
  employer: '부광유니파마',
  eyebrow: 'Sales Operations & Analytics',
  title: '영업 현장의 숫자 문제를, 직접 만든 시스템으로 풉니다.',
  subhead:
    '영업관리팀 과장으로 정산·법정 보고·영업 데이터 시스템을 기획부터 운영까지 직접 만들어 왔고, 지금은 영업본부를 겸직하며 SFE(영업력 분석)를 맡고 있습니다.',
  summary:
    '한국유니온제약 영업관리팀에서 정산·보고 업무의 병목을 겪으며 직접 도구를 만들기 시작했습니다. 2026년 부광약품 인수 뒤 구 ERP가 폐기될 때는 원장을 전수 대조해 영업 숫자를 새 원천으로 옮겼고, 그 위에 영업지원팀 마감과 영업본부 SFE를 올렸습니다. AI는 일하는 방법입니다 — 숫자는 DB에서 계산하고, AI에는 해석만 맡깁니다.',
  evidence: [
    {
      label: '숫자의 원천부터',
      text: '어떤 숫자를 어느 원천에서 어떻게 셀지 먼저 정합니다. ERP가 바뀔 때도 원장을 전수 대조해 숫자를 이어 붙였습니다.',
    },
    {
      label: '쓰는 것만 남김',
      text: '실제로 쓰지 않는 화면은 지웁니다. 원천이 끊긴 분석 화면을 정리하고 부서가 매일 보는 마감·실매출에 집중했습니다.',
    },
    {
      label: '혼자 만들고 운영',
      text: '기획·구현·배포·운영을 직접 합니다. 배포 서비스 16개를 빌드 검증·상태 점검·실패 시 자동 롤백을 거쳐 운영합니다.',
    },
    {
      label: 'AI는 해석만',
      text: '매출·수금 계산은 DB에서 끝내고, AI는 만들어진 숫자를 요약·해석합니다. 법령은 현행 법령 원문만 인용하게 묶었습니다.',
    },
  ],
}

/** 공개 주소 — metadataBase·구조화 데이터가 같은 값을 쓴다. */
export const SITE_URL = 'https://ref.dvsharp.com'

/** 연락처 단일 출처 — 히어로·연락 섹션이 같은 값을 쓴다. */
export const AX_CONTACT = {
  email: 'ssmtransite@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yurielk82',
  github: 'https://github.com/yurielk82',
}

export const AX_PILLARS: AxPillar[] = [
  {
    label: '01',
    title: '업무 진단',
    description:
      '반복 입력, 승인 대기, 데이터 불일치처럼 현장에서 시간이 새는 지점을 먼저 찾고, 자동화보다 기준 정리를 우선합니다.',
  },
  {
    label: '02',
    title: '데이터·ERP 통합',
    description:
      'ERP 조회 인터페이스, 공공 데이터, 업무 시트처럼 흩어진 자료를 정의가 같은 하나의 원천으로 묶습니다.',
  },
  {
    label: '03',
    title: 'AI 자동화·에이전트',
    description:
      'Claude, Gemini, GPT, Vision OCR, 워커, 검증 규칙을 조합해 반복 판단과 리포팅을 업무 흐름 안으로 끌어옵니다.',
  },
  {
    label: '04',
    title: '도입·운영·거버넌스',
    description:
      'AI가 전부 판단하는 구조보다 사람이 최종 책임지는 검수 지점, 로그, 문서화, 예외 처리를 함께 설계합니다.',
  },
]

// 랜딩에 노출할 대표 사례 (나머지는 /projects 상세에서 서사 노출)
export const FEATURED_CASE_SLUGS = [
  'pharmkpi',
  'sales-hq-sfe',
  'kpis-dsr-api',
  'sales-strategy-portal',
  'pharmkpi-exec',
  'csoweb',
] as const

// 프로젝트 횡단 원칙 — AI를 믿지 않고, 거짓말 못 하는 환경을 설계 (grounding)
export const AX_GROUNDING: AxGrounding = {
  eyebrow: 'Trust by Design',
  title: 'AI를 믿지 않고, 거짓말 못 하는 환경을 만듭니다',
  summary:
    'AI는 모르는 것도 그럴듯하게 지어냅니다(환각). 그래서 모델을 잘 타이르는 대신, 사실을 실제 소스에 묶어 애초에 지어낼 수 없는 환경을 설계합니다. 이것이 하네스(AI를 정해진 절차 안에서만 돌게 가두는 장치) 엔지니어링입니다. 특정 프로젝트가 아니라 챗봇·대시보드 등 AI를 쓰는 모든 화면에 적용하는 방식입니다.',
  examples: [
    {
      label: '법령',
      text: '제약은 약사법·고시 같은 법령이 의사결정에 직결됩니다. 그냥 물으면 없는 조문을 지어내므로, 현업·경영진 두 KPI 대시보드의 AI가 법령을 물으면 국가법령정보센터의 실제 현행 법령을 먼저 가져와 그것만 인용하도록 묶었습니다. 약사법뿐 아니라 모든 법령에 적용되며, 지금 실제 가동 중입니다.',
    },
    {
      label: '숫자·금액',
      text: '매출·수금·마진 같은 계산은 AI에게 맡기지 않습니다. 수치는 DB·스냅샷에서 계산해 확정하고, AI는 만들어진 숫자를 해석·요약만 하도록 역할을 가둡니다.',
    },
  ],
  spreadLead:
    '이 한 가지 원칙이 제가 쓰는 AI 기법 전체를 관통합니다 — 프롬프트로 행동을 제약하고, 스킬로 절차를 고정하고, 하네스로 검증을 강제하고, 루프로 스스로 고치게 하고, 기억과 위키로 맥락을 남깁니다. 모두 "AI가 제멋대로 못 하게 환경을 설계한다"는 한 뿌리입니다.',
  spreadTags: [
    '프롬프트 엔지니어링',
    '스킬(절차 고정)',
    '하네스',
    '루프 엔지니어링',
    'RAG 기억',
    '지식 그래프',
    '위키·문서화',
  ],
}

export const AX_METHOD: AxMethodStep[] = [
  {
    title: '현업을 먼저 관찰',
    description:
      '도구부터 붙이지 않고, 누가 어떤 입력을 보고 어떤 기준으로 판단하는지 업무 흐름을 먼저 적습니다.',
  },
  {
    title: '기준 데이터를 고정',
    description:
      'ERP, 엑셀, 이미지, 수기 문서 중 무엇을 원천으로 볼지 정하고, 사람이 암묵적으로 처리하던 예외를 드러냅니다.',
  },
  {
    title: '반복 판단을 자동화',
    description:
      'LLM, Vision OCR, 검증 규칙, 워커를 조합해 요약·분류·검증·리포팅처럼 반복되는 판단을 흐름 안에 배치합니다.',
  },
  {
    title: '위험 지점은 사람이 승인',
    description:
      '정산, 문서 위변조, 외부 발송처럼 책임이 필요한 단계는 Human-in-the-loop와 로그를 남기는 구조로 설계합니다.',
  },
  {
    title: '성과와 예외를 문서화',
    description:
      '시간 절감, 오류 감소, 처리량, 예외 유형을 기록해 다음 자동화 범위와 운영 기준을 다시 정합니다.',
  },
]

export const AX_STACK: AxStackGroup[] = [
  {
    label: 'AI Workflow',
    items: ['Claude API', 'Gemini', 'GPT', 'Vision OCR', 'PromptOps'],
  },
  {
    label: 'Data Systems',
    items: ['ERP BI 인터페이스', 'Supabase', 'MSSQL', 'Prisma', '공공 데이터 API'],
  },
  {
    label: 'Product Build',
    items: ['Next.js', 'React', 'TypeScript', 'FastAPI', 'Express'],
  },
  {
    label: 'Operation Guardrails',
    items: ['Human-in-the-loop', 'Validation Rules', 'Git Hooks', 'Docs', 'Monitoring'],
  },
]
