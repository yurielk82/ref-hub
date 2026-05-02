export type MetricDisclosure = 'public' | 'range' | 'withheld'

export interface AxPillar {
  label: string
  title: string
  description: string
}

export interface AxCaseStudy {
  projectSlug: string
  label: string
  problem: string
  intervention: string
  outcome: string
  disclosure: MetricDisclosure
  evidenceLabel: string
}

export interface AxMethodStep {
  title: string
  description: string
}

export interface AxStackGroup {
  label: string
  items: string[]
}

export const AX_HERO = {
  eyebrow: 'AI Transformation Reference',
  title: '현업 프로세스를 AI 워크플로우로 전환하는 AX 실무자',
  summary:
    '영업관리 현장에서 반복 정산, 데이터 검증, 리포트 작성의 병목을 직접 겪었고, 업무 외 시간까지 활용해 AI 기반 자동화와 데이터 시스템을 자발적으로 설계·검증했습니다. 단순 학습용 프로젝트가 아니라 실제 운영 문제를 구조화하고, 사람이 검수할 지점과 시스템이 처리할 지점을 나누는 AX 실험으로 확장했습니다.',
  focus: [
    '현업 병목 진단',
    'ERP·운영 데이터 정리',
    'LLM/Vision 기반 자동화',
    'Human-in-the-loop 운영 설계',
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

export const AX_CASE_STUDIES: AxCaseStudy[] = [
  {
    projectSlug: 'csoweb',
    label: 'AI Vision + HITL',
    problem:
      'CSO 정산과 EDI 문서 확인은 이미지 품질, 위변조 가능성, 승인 흐름이 섞여 수작업 검토 부담이 큰 업무였습니다.',
    intervention:
      'Claude Vision OCR, ELA, EXIF, Perceptual Hash를 묶어 1차 검증을 자동화하고, 위험 판단은 사람이 최종 검수하는 구조로 나눴습니다.',
    outcome:
      '문서 검토를 단순 확인 업무에서 증거 기반 검수 워크플로우로 바꾸는 기반을 만들었습니다.',
    disclosure: 'range',
    evidenceLabel: '프로젝트 상세',
  },
  {
    projectSlug: 'pharmkpi',
    label: 'ERP + Multi-AI Analytics',
    problem:
      '매출, 수금, 마진, 흡수율 지표가 ERP와 업무 문맥에 흩어져 있어 추세 파악과 보고가 개인 경험에 의존했습니다.',
    intervention:
      'Oracle ERP 데이터를 Supabase 기반 분석 흐름으로 정리하고, Claude·Gemini·GPT 분석을 붙여 KPI 해석과 리포트 생성을 자동화했습니다.',
    outcome:
      '영업관리 데이터를 조회용 표에서 의사결정용 대시보드와 AI 분석 흐름으로 확장했습니다.',
    disclosure: 'range',
    evidenceLabel: '프로젝트 상세',
  },
  {
    projectSlug: 'claude-dotfiles',
    label: 'Agentic DevOps Harness',
    problem:
      'AI 코딩 도구를 빠르게 쓰는 것만으로는 품질, 리뷰, 배포 안전장치, 반복 실수 방지가 안정적으로 남지 않았습니다.',
    intervention:
      '규칙, 훅, 에이전트, 스킬을 계층화해 AI 페어 프로그래밍의 검토·테스트·배포 가드를 하네스로 만들었습니다.',
    outcome:
      '개인 생산성 도구를 재사용 가능한 운영 규칙과 자동화 체계로 바꿨습니다.',
    disclosure: 'public',
    evidenceLabel: '프로젝트 상세',
  },
  {
    projectSlug: 'kpis-dsr-api',
    label: 'Validation Workflow',
    problem:
      '의약품 공급내역 데이터는 형식 오류와 업무 규칙 위반을 사람이 반복 확인해야 해 리포트 품질이 흔들릴 수 있었습니다.',
    intervention:
      '커스텀 검증 규칙 엔진, 대용량 테이블, PDF 리포트 흐름을 묶어 데이터 검증과 일일 보고를 시스템화했습니다.',
    outcome:
      '공급내역 확인을 수기 검토 중심에서 규칙 기반 검증과 재현 가능한 리포팅 흐름으로 전환했습니다.',
    disclosure: 'withheld',
    evidenceLabel: '프로젝트 상세',
  },
]

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
