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
  title: '현업이 못 풀던 문제를 AI로 풀어, 프로덕션 서비스로 만들고 직접 운영합니다.',
  subhead: 'AI를 빌려 매번 토큰을 쓰는 게 아니라, AI로 만들어 자산으로 소유합니다.',
  summary:
    '영업관리 현장에서 반복 정산, 데이터 검증, 리포트 작성의 병목을 직접 겪었고, 업무 외 시간까지 활용해 AI 기반 자동화와 데이터 시스템을 자발적으로 설계·검증했습니다. 단순 학습용 프로젝트가 아니라 실제 운영 문제를 구조화하고, 사람이 검수할 지점과 시스템이 처리할 지점을 나누는 AX 실험으로 확장했습니다.',
  evidence: [
    {
      label: '단독 운영',
      text: 'Cloudflare·Nginx·systemd·Docker 위에서 self-host Supabase를 포함한 프로덕션 서비스 20여 개를 혼자 운영합니다.',
    },
    {
      label: '안전한 배포',
      text: '모든 변경은 빌드 검증·헬스체크·실패 시 자동 롤백 게이트를 통과해야 라이브가 됩니다.',
    },
    {
      label: '비용 규율',
      text: '대시보드 숫자는 미리 계산된 스냅샷으로 토큰 없이 돌고, AI 해석은 필요한 화면·질문에만 얹힙니다.',
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

export const AX_CASE_STUDIES: AxCaseStudy[] = [
  {
    projectSlug: 'pharmkpi',
    label: 'ERP + Multi-AI Analytics',
    problem:
      '매출, 수금, 마진, 흡수율 지표가 ERP와 업무 문맥에 흩어져 있어 추세 파악과 보고가 개인 경험에 의존했습니다.',
    intervention:
      'Oracle ERP 데이터를 Supabase 기반 분석 흐름으로 정리하고, Claude·Gemini·GPT 분석을 붙여 KPI 해석과 리포트 생성을 자동화했습니다.',
    outcome: '영업관리 데이터를 조회용 표에서 의사결정용 대시보드와 AI 분석 흐름으로 확장했습니다.',
    disclosure: 'range',
    evidenceLabel: '프로젝트 상세',
  },
  {
    projectSlug: 'kpis-dsr-api',
    label: 'Excel Labor → Automated Compliance Reporting',
    problem:
      '회사 ERP가 내보내는 데이터로는 법정 의약품 공급내역보고를 그대로 제출할 수 없었습니다. 당시 전산팀은 막내 한 명만 남아 손댈 여력이 없었고, ERP 원본 데이터 수정도 극도로 꺼리던 시기였습니다. 그래서 보고서는 매번 엑셀 수식으로 손수 만들어야 했고, 매일 적지 않은 업무시간이 이 반복 작업에 사라졌습니다.',
    intervention:
      'ERP 원본은 건드리지 않고 내려받은 데이터를 후처리로 무결하게 만드는 길을 택했습니다 — 전산 여력도 ERP 수정 여지도 없는 제약 안에서의 현실적인 해법이었습니다. 이 엑셀 수작업을 단계적으로 시스템으로 옮겨, 처음에는 스프레드시트 복사·붙여넣기만으로 되도록 반자동화했고, 지금은 표준코드·규격과 거기서 파생되는 수량·단가 오류까지 의약품관리종합정보센터(KPIS) API 조회로 모두 자동 검수·교정해 무결한 공급내역보고를 산출합니다. 신고 API까지 연결해, 사람이 최종 확인만 하면 자동 보고되는 직전 단계까지 구현했습니다.',
    outcome:
      '전산 인력도 ERP 수정 여지도 없던 상황에서, 매일 시간을 잡아먹던 엑셀 수작업을 ERP를 건드리지 않는 무결 보고서 자동 산출로 바꾸고, 자동 신고 직전 단계까지 끌어왔습니다.',
    disclosure: 'withheld',
    evidenceLabel: '프로젝트 상세',
  },
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
    projectSlug: 'erp-spec',
    label: 'ERP Discovery + IT Handover',
    problem:
      '인수사 IT팀은 내부 Oracle ERP 구조, 테이블 관계, 데이터 출처를 빠르게 파악해야 했지만 구두 설명과 원본 DB 접근만으로는 공통 기준을 만들기 어려웠습니다.',
    intervention:
      'Oracle ERP 785개 테이블의 스키마·컬럼·인덱스·관계를 검색 가능한 웹 문서와 React Flow 관계 그래프로 전환해 ERP 구조 분석 포털로 제공했습니다.',
    outcome:
      '개인에게 묶여 있던 ERP 구조 지식을 인수사 IT팀과 현업이 함께 탐색할 수 있는 웹 레퍼런스로 바꿔 인계, 영향 범위 검토, 커뮤니케이션 기준을 만들었습니다.',
    disclosure: 'withheld',
    evidenceLabel: '프로젝트 상세',
  },
  {
    projectSlug: 'claude-dotfiles',
    label: 'Claude/Codex AX Delivery Harness',
    problem:
      '코드는 싸지 않다. AX 프로젝트를 빠르게 구현해도 품질, 리뷰, 배포 안전장치, 반복 실수 방지, 맥락 기억이 남지 않으면 현업 적용 속도는 유지되지 않았습니다.',
    intervention:
      'mattpocock/skills의 작은 스킬·공유 언어·피드백 루프 철학을 참고해 Claude Code와 Codex 작업 방식을 규칙, 훅, 에이전트, 온디맨드 스킬로 묶고, wiki·그래프·문서 검색 기반 RAG 기억으로 프로젝트 맥락을 계속 회수하게 만들었습니다.',
    outcome:
      '개인 생산성 도구를 AX 프로젝트를 계속 납품할 수 있는 재사용 가능한 운영 규칙, 검증 루프, 장기 기억 체계로 바꿨습니다.',
    disclosure: 'public',
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
