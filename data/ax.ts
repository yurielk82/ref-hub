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
    projectSlug: 'pharmkpi-exec',
    label: 'Executive iPad BI + Metric Reframe',
    problem:
      '경영진이 매출·채권·KPI 정기보고를 회의실 PC가 아니라 손에 든 태블릿으로 바로 보고 싶어 했습니다. 기존 PharmKPI는 실무자용 화면이라 임원이 보려는 숫자·흐름과 맞지 않았고, 그대로 태블릿에 올리는 것만으로는 답이 아니었습니다.',
    intervention:
      'PharmKPI를 기반으로 임원용을 따로 세우되 세 가지를 의식적으로 결정했습니다. ① iPad 우선이라 iOS 네이티브(애플 개발자 비용·macOS 빌드)를 버리고 홈 화면에 추가하는 PWA로 앱 경험을 비용 없이 냈고, ② 라이브 사이트를 얇게 감싸 웹 배포가 곧 앱 갱신이 되게 했으며, ③ 숫자를 그대로 옮기지 않고 경영진 기준으로 재정의 — 채권 회전일을 납기 기준으로 보정하고 실청구액(VAT 포함)으로 통일하고 소송채권을 별도로 분리해, 승인 아래 지표 정의 자체를 바로잡았습니다.',
    outcome:
      '실무자용 대시보드를 임원이 태블릿에서 바로 보는 읽기 전용 KPI 보고로 재구성하고, 역할(대표·영업임원)별로 보는 숫자를 나눴습니다. exec.dvsharp.com 라이브이며, 웹 한 번 배포로 임원 단말까지 갱신됩니다.',
    disclosure: 'withheld',
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
    label: '4-Layer Forgery Defense + HITL',
    problem:
      'CSO 300여 개사가 매월 보내는 처방통계표는 원본 데이터에 접근할 수 없어 사진·PDF가 유일한 근거였고, 팀원이 사진을 한 장씩 열어 자사 품목을 골라 수량·금액을 수기로 합산하고 위변조까지 눈으로 확인해 정산에 입력했습니다 — 매달 영업일 15일이 드는 일이었습니다.',
    intervention:
      '두 가지를 의식적으로 결정했습니다. ① 위변조는 글자만 읽는 OCR로는 못 잡으니, 서로 다른 조작 방식을 각각 노리는 네 기법을 겹쳤습니다 — ELA(일부 영역 재편집), EXIF(편집 소프트웨어 흔적), SHA-256(정확한 중복), 지각 해시(복제·축소판). ② 약품 정산이라 틀리면 책임이 커, 전부 자동화하지 않고 기계가 1차로 걸러 후보를 만들고 위험·금액 의심 건만 사람이 최종 검수(확정·수정·제외)하도록 나눴으며, 이해충돌을 막으려 업로더와 판정자를 분리했습니다.',
    outcome:
      '사진 한 장씩 눈으로 보던 매달 15일짜리 수작업을, 4단계 위변조 방어가 1차로 걸러내고 사람은 의심 건만 검수하는 증거 기반 워크플로우로 재설계했습니다. 이 검증은 자료검토·자동 정산서·조회/발송(메일머지)·필터링·흡수율 분석으로 이뤄진 시스템의 일부이며, 업계 상용 프로그램과 비교 가능한 수준에 이르러 회사가 상용 도입을 결정하면서 그 개발 파트너로 기능을 함께 만들고 있습니다.',
    disclosure: 'range',
    evidenceLabel: '프로젝트 상세',
  },
  {
    projectSlug: 'erp-spec',
    label: 'ERP Discovery + IT Handover',
    problem:
      '인수사 IT팀은 내부 Oracle ERP 구조(785개 테이블·4,462개 컬럼·약 4,900만 행)와 테이블 관계, 데이터 출처를 빠르게 파악해야 했지만 구두 설명과 원본 DB 접근만으로는 공통 기준을 만들기 어려웠습니다.',
    intervention:
      '세 가지를 결정했습니다. ① 정적 다이어그램(Mermaid)은 수십 개 군집을 못 그려 한계가 명확해, dagre 자동 배치 + React Flow로 클릭·탐색되는 관계 그래프로 갈아탔습니다. ② Oracle엔 외래키 제약이 거의 없어 관계를 컬럼명·타입으로 추론해야 했고, 확실한 관계와 추정 관계를 강·약 선으로 구분 표기 — PK 충돌 58건을 잡아 고친 뒤 96.5% 정확도까지 끌어올렸습니다. ③ 이관 대상 스키마는 Oracle→MariaDB 타입 매핑을 한 곳(SSOT)에 두고 클라이언트에서 DDL을 생성, 메타데이터 파이프라인은 ERP 릴레이와 분리했습니다.',
    outcome:
      '개인에게 묶여 있던 ERP 구조 지식을, 785개 테이블 중 648개의 관계가 탐색되고 추정 정확도가 표기되는 웹 레퍼런스로 바꿔 인계·영향 범위 검토·커뮤니케이션 기준을 만들었습니다.',
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
  {
    projectSlug: 'har-eval',
    label: 'Evidence-Gated Build/Buy Decisions',
    problem:
      '"이거 만들까, 도입할까"를 의견과 열정으로 결정하면 잘못된 yes가 실제 빌드 시간을 통째로 태웁니다. 정직한 답이 "지금 것으로 충분"일 때가 많은데, 측정 없이는 그걸 지나치기 쉬웠습니다.',
    intervention:
      '세 가지를 원칙으로 박았습니다. ① 만들기 전에 측정 — 현재(공짜)부터 기성 도구 순으로 싸게 게이팅하고, 기성을 실제로 붙여보고도 부족할 때만 직접 만듭니다(buy-before-build). ② 자기감사로 끝내지 않고 다른 벤더 모델로 교차 적대감사 — 한 모델은 자기 맹점을 못 보기 때문입니다(실제로 자기감사 8건 위에 교차감사가 13건을 더 찾음). ③ 모든 결론에 "실측(n)·추론·메커니즘" 신뢰도 라벨을 붙여, 안 돌려본 것을 판정으로 둔갑시키지 않았습니다.',
    outcome:
      '여러 실제 결정을 데이터로 내렸고, 흔한 정직한 결론은 "안 만든다"였습니다 — 기억 도구는 안 만들고, 코드 심볼 도구는 범위를 한정해 유지하고, 토큰 프록시는 안전한 명령에만 조건부로. 열정이 아니라 측정이 빌드 시간을 지켰습니다.',
    disclosure: 'public',
    evidenceLabel: '프로젝트 상세',
  },
  {
    projectSlug: 'ev-motor-reliability',
    label: 'Reliability Automation + Auditable Stats',
    problem:
      '전기차 구동 모터 신뢰성 시험은 시뮬 검증 → 펌웨어 → 빌드 → 플래싱 → 장기 수집 → 분석 → 리포트가 순차 수작업이었고, 24시간 무인 시험과 수명·고장모드 판정을 사람이 매번 처리해야 했습니다.',
    intervention:
      '네 가지를 결정했습니다. ① 상용 시뮬(PSIM/Simulink) 대신 Python 자체 시뮬로 자동화 파이프라인에 통합 — 24V·26W 저전력 보드라 전력단 상세 모델링이 불필요했습니다. ② 24시간 수집은 저지연 UART, 실시간 모니터링은 WebSocket으로 채널을 분리해 둘이 서로 방해하지 않게 했습니다. ③ Weibull·Coffin-Manson 수명 통계를 라이브러리 블랙박스가 아니라 직접 구현 — 자동차/규제 환경의 감사 추적성 때문입니다. ④ AI 해석은 클라우드 API 직접 호출 대신 서버 상주 로컬 에이전트로 붙여 오프라인·계측장비 직접 접근을 확보했습니다.',
    outcome:
      '빌드 → 플래싱 → 수집 → 분석 → 리포트를 한 파이프라인으로 자동화하고, 신뢰성 계산식을 코드로 보유해 결과를 추적·재현할 수 있는 무인 시험 플랫폼으로 만들었습니다.',
    disclosure: 'public',
    evidenceLabel: '프로젝트 상세',
  },
  {
    projectSlug: 'srt',
    label: 'Internal Benefit + Concurrency-Safe Engineering',
    problem:
      '직원들이 주말 기차표(SRT)를 구하기 힘들어했습니다 — 인기 노선은 판매 직후 몇 초 만에 매진이라 손으로는 못 잡고, 여러 직원이 한 서버에서 동시에 자동 조회하면 SRT의 속도 제한·봇 탐지에 IP가 통째로 차단돼 모두가 막힙니다.',
    intervention:
      '직원 복지로 만들되, 여러 명이 동시에 써도 안 막히게 하는 게 핵심이라 상충 요구(속도 vs 차단 회피 vs 비용)를 동시성 규칙으로 풀었습니다. ① 모든 요청을 Redis 전역 FIFO 큐에 모아 최소 1초 간격을 강제해 차단을 회피하고, ② 동시에 도는 매크로가 있을 때만 sticky 프록시를 쓰고 단독이면 직결해 프록시 비용·지연을 아끼며, ③ 50회마다 세션을 갱신하고 0.1~0.5초 랜덤 간격으로 탐지 패턴을 흩뜨리고, ④ 동시 6개 + 대기열 5개로 직원 간 공정성과 차단 한도를 동시에 지켰습니다.',
    outcome:
      '주말 예매로 고생하던 직원들의 고충을, 여러 명이 동시에 써도 차단되지 않는 사내 예매 자동화 도구(복지)로 풀어 실제 운영 중입니다.',
    disclosure: 'public',
    evidenceLabel: '프로젝트 상세',
  },
  {
    projectSlug: 'team-pulse',
    label: 'Stigma-Safe Diagnostics + RLS',
    problem:
      '심리·성향 진단은 "회사가 내 약점을 들여다본다"는 낙인 두려움이 큽니다. HR 평가로 오인되면 솔직한 응답이 안 나오고 팀 심리 안전이 깨져, 도구 자체가 무용해집니다.',
    intervention:
      '세 가지를 의식적으로 결정했습니다. ① 문항을 추상적 성격이 아니라 일터 행동("새 협업 툴 시도", "팀 갈등 상황")으로 한정해 평가가 아닌 협업 맥락임을 드러냈습니다. ② 노출을 계층화 — 개인 결과는 RLS로 본인만, 팀 집계는 최소 3명이 응답하기 전엔 개인 역산이 불가능하도록 구간으로만 보이고 소유자 화이트리스트만 접근하게 했습니다. ③ 동의 모달·결과 고지·용어("진단" 대신 "협업 카테고리 추정")로 "HR·임상 평가가 아니다"를 일관되게 반복했습니다.',
    outcome:
      '진단의 낙인 위험을 기능 설계로 눌러, 개인은 본인 결과만 보고 팀은 역산이 불가능한 집계만 보는 협업 워크숍용 자가진단 SaaS로 운영 중입니다.',
    disclosure: 'public',
    evidenceLabel: '프로젝트 상세',
  },
  {
    projectSlug: 'naver-place-collector',
    label: 'Block-Resilient Collection + Auto Grading',
    problem:
      '업종별 B2B 영업 타겟을 네이버 플레이스에서 모으려면 장시간(24시간+) 수집이 필요한데, 한 서버 IP로 계속 조회하면 속도 제한·봇 탐지로 IP가 통째로 차단돼 잡 전체가 재시작됩니다.',
    intervention:
      '세 가지를 결정했습니다. ① 공식 API용 클라이언트와 크롤링용 클라이언트를 분리하고, 크롤링은 TLS 핑거프린트(JA3)를 위장하는 라이브러리로 봇 탐지를 우회했습니다. ② 동시 워커 수를 고정 상수가 아니라 가용 IP 풀 크기 기반으로 동적 산출해 IP 고갈을 막았습니다. ③ 세션 교체 시점을 요청 수가 아니라 wall-clock 랜덤(분 단위)으로 바꿔 예측 가능하게 만들어 반복 차단을 줄였습니다.',
    outcome:
      '장시간 수집의 차단 문제를 구체적 회피 규칙으로 풀어, 검색→활동성 판정→노출·체인 분류→등급(A/B/C/F) 스코어링까지 자동화하고 이전 수집 대비 증감까지 추적하는 영업 타겟 DB SaaS로 운영 중입니다.',
    disclosure: 'public',
    evidenceLabel: '프로젝트 상세',
  },
  {
    projectSlug: 'apinfy-lab',
    label: 'Actor Model + Execution Isolation',
    problem:
      '여러 조직·여러 액터·스케줄·동시 실행·장시간 작업이 모두 필요한 크롤링 플랫폼을 self-host로 만들되, 나중에 분산 워커(Docker/k8s)로 확장할 수 있게 설계해야 했습니다.',
    intervention:
      '세 가지를 결정했습니다. ① 액터를 코드가 아니라 선언식 메타데이터(진입점·입출력 스키마·CPU/메모리/타임아웃)로 추상화해 컴파일 없이 추가·버전 관리되게 했습니다. ② 실행(run)마다 dataset·KV·요청 큐를 즉시 격리 프로비저닝하고, 동시성은 DB 유니크 제약으로 lock-free 처리해 run 간 결과가 섞이지 않게 했습니다. ③ Local·Docker 실행기를 같은 인터페이스의 전략 패턴으로 두어, 개발은 in-process·운영은 컨테이너로 바꾸고 향후 k8s 실행기를 코드 변경 최소로 붙일 확장점을 고정했습니다.',
    outcome:
      '단일 노드에서 멀티테넌시·동시성·스케줄·웹훅·재시도·프록시 풀을 갖춘, 분산 크롤링 플랫폼의 레퍼런스 구현으로 만들었습니다.',
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
