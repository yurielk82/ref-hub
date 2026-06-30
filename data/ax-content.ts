import type { AxGrounding, AxMethodStep, AxPillar, AxStackGroup } from './ax-types'

export const AX_HERO = {
  eyebrow: 'AI Transformation Reference',
  title: '현업이 못 풀던 문제를 AI로 풀어, 프로덕션 서비스로 만들고 직접 운영합니다.',
  subhead: 'AI를 빌려 매번 토큰(AI 호출 비용)을 쓰는 게 아니라, AI로 만들어 자산으로 소유합니다.',
  summary:
    '영업관리 현장에서 반복 정산, 데이터 검증, 리포트 작성의 병목을 직접 겪었습니다. 그 문제를 현업 팀장·담당자와 함께 AI 기반 자동화와 데이터 시스템으로 풀었고, 업무 외 시간까지 들여 직접 설계·검증했습니다. 같은 접근을 제약 영업관리에서 시작해 엔지니어링 시험·팀 진단·사내 복지 같은 다른 도메인으로, 그리고 그 작업을 돌리는 자기 운영 도구로 넓혔습니다. 핵심은 사람이 검수할 지점과 시스템이 처리할 지점을 나누는 것입니다.',
  evidence: [
    {
      label: '단독 구축·운영',
      text: 'Cloudflare·Nginx·systemd·Docker 위에서 self-host Supabase를 포함한 프로덕션 서비스 20여 개를 직접 구축·운영합니다. 대부분 현업 팀장·담당자와 함께 시작한 일입니다.',
    },
    {
      label: '안전한 배포',
      text: '모든 변경은 빌드 검증·헬스체크·실패 시 자동 롤백 게이트를 통과해야 라이브가 됩니다.',
    },
    {
      label: '비용 규율',
      text: '대시보드 숫자는 미리 계산해 저장한 스냅샷으로 토큰 없이 돌고, AI 해석은 필요한 화면·질문에만 얹힙니다.',
    },
    {
      label: '서버 상주',
      text: '코드가 실제로 도는 OCI 서버에서, 어디서든 SSH로 구현·검증·배포를 그 자리에서 끝냅니다.',
    },
  ],
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
      'Oracle ERP, Supabase, MSSQL, 수기 문서처럼 흩어진 업무 데이터를 분석 가능한 기준과 조회 흐름으로 연결합니다.',
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
  'kpis-dsr-api',
  'csoweb',
  'sales-strategy-portal',
  'pharmkpi-exec',
  'team-pulse',
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
    items: ['Oracle ERP', 'Supabase', 'MSSQL', 'Prisma', 'ETL'],
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
