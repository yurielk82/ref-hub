import type { Project } from "../project-types";

// 사내 도구·SaaS 실험·AX 운영 하네스 (복지 자동화·진단·수집·크롤링 커널·하네스)
export const TOOLING_PROJECTS: Project[] = [
  {
    slug: "srt",
    name: "SRT 자동예매",
    tagline:
      "휴가철 기차표를 새로고침으로 잡던 동료들을 위해 만든 팀 복지용 예매 자동화 (v1.3)",
    description:
      "휴가 때 지방으로 내려가는 팀 동료들이 기차 예매가 힘들어, 사이트를 매번 새로고침하며 좌석이 열리기를 기다리던 걸 대신하려고 만든 팀 복지용 도구. 매진 좌석을 자동으로 감시하다 조건에 맞는 열차가 열리면 예매를 시도하고, Redis 큐 기반 타이밍 제어와 Rate Limiting 준수, 텔레그램 알림으로 안정적으로 운영합니다.",
    tech: ["Next.js 16", "FastAPI", "Redis", "Tailwind", "Base UI"],
    category: "web",
    scope: "other",
    liveUrl: "https://srt.dvsharp.com",
    screenshot: "/images/portfolio/srt/internal-dashboard.png",
    screensNote:
      "공개용 화면이라 열차 조회 결과·예약·승차권·결제 정보는 가짜 응답으로 채워 찍었습니다.",
    screens: [
      {
        src: "/images/portfolio/srt/train-results.webp",
        title: "열차 조회 결과와 자동조회 선택",
        caption:
          "서울·수서 KTX 검색 결과에서 좌석 상태를 보고, 매진 열차는 자동조회 대상으로 고르고 자리가 있는 열차는 바로 예매합니다. 고른 열차의 좌석이 나면 예매까지 이어 가도록 설정할 수 있습니다.",
      },
      {
        src: "/images/portfolio/srt/search-form.webp",
        title: "열차 검색",
        caption:
          "출발역·도착역·날짜·시간과 좌석 선호(일반실·특실 우선 등)를 정해 코레일+ 기준 KTX 열차를 조회합니다. 자주 쓰는 역은 즐겨찾기로 고정합니다.",
      },
      {
        src: "/images/portfolio/srt/activity-watch.webp",
        title: "진행 상황·승차권·자동조회 작업",
        caption:
          "확인이 필요한 예약과 진행 중인 자동조회를 맨 위에 모아 보여 주고, 코레일에 등록된 승차권과 자동조회 작업의 조회 횟수·대상 열차를 카드로 보여 줍니다.",
      },
      {
        src: "/images/portfolio/srt/reservation-job.webp",
        title: "승객별 예약 작업",
        caption:
          "여러 명 예약을 승객별로 나눠 결제 완료·결제 확인 필요 같은 상태를 따로 관리합니다. 확정 운임이 예상과 다르면 금액을 다시 확인받은 뒤 결제하고, 성공한 승객의 표는 그대로 유지합니다.",
      },
      {
        src: "/images/portfolio/srt/settings-payment.webp",
        title: "결제 설정",
        caption:
          "항상 자동결제 여부와 이 서비스에 저장한 카드를 관리합니다. 카드번호는 끝 네 자리만 보여 주고 전체 번호는 화면과 API 응답에 싣지 않습니다.",
      },
    ],
    emoji: "🚄",
    gradient: "from-sky-500/15 to-teal-500/15",
    features: [
      "SRT 매진 좌석을 주기적으로 감시하고 조건에 맞는 열차가 열리면 자동 예매 시도",
      "Redis 전역 FIFO 큐로 작업 직렬화·최소 1초 간격 강제·중복 실행 방지, 큐 혼잡도 모니터링",
      "Sticky IP 프록시(Bright Data ISP) — 동시 매크로가 있을 때만 계정별 고정 IP로 IP 충돌·차단 회피",
      "동시 6개 + 대기열 5개 슬롯으로 직원 간 공정성과 차단 한도를 동시에 관리",
      "0.1~0.5초 랜덤 간격으로 탐지 패턴 분산, 50회마다 세션 갱신(재로그인)",
      "저장된 카드(AES-256 암호화)로 좌석 확보 시 자동 결제",
      "SSE 실시간 상태 스트림과 사용자별 매크로 작업 목록·상태 조회",
      "텔레그램 봇(웹훅 자동 설정)으로 예매 성공·실패·대기 실시간 알림",
      "즐겨찾기 역 관리, 프록시 토글 상태 조회, 브라우저 확장(srt-extension) 보조",
      "Next.js 웹 UI와 FastAPI 백엔드 분리로 검색 조건·작업 상태·결과 관리",
    ],
    highlight: "팀 복지용 예매 자동화 — 새로고침 대기를 없앰",
    year: "2026",
  },
  {
    slug: "team-pulse",
    name: "Team Pulse",
    tagline: "팀 협업 스타일 진단 미니 SaaS",
    description:
      "서로의 업무 방식을 이해하도록 돕는 팀용 자가진단 도구. 방어기제(Vaillant)부터 의사소통 유형(사티어)·성향(Big Five)까지 협업에 도움이 되는 심리 기법을 자체 문항으로 적용하고, 결과는 단정적 평가가 아니라 위압적이지 않고 부드러운 말투로 풀어 줍니다. HR 평가가 아니라 대면 협업 워크숍 참고용입니다.",
    tech: [
      "Next.js 16",
      "Supabase (RLS)",
      "TypeScript",
      "Tailwind 4",
      "Framer Motion",
    ],
    category: "web",
    scope: "other",
    liveUrl: "https://pulse.dvsharp.com",
    screenshot: "/images/portfolio/team-pulse/hero.png",
    screensNote: "실제 응답 대신 가상 팀 자료로 찍은 화면입니다.",
    screens: [
      {
        src: "/images/portfolio/team-pulse/archetype-poster.webp",
        title: "결과 캐릭터 포스터",
        caption:
          "검사를 마치면 대표·보조 성향 점수를 묶어 캐릭터와 메타포로 보여 줍니다. 종합 추정과 팀에서 나눠 볼 질문을 함께 띄웁니다.",
      },
      {
        src: "/images/portfolio/team-pulse/result-hub.webp",
        title: "결과 허브",
        caption:
          "검사 5종 중 몇 개를 마쳤는지, 누적 응답 수와 팀 비교 여부를 첫 화면에서 보여 줍니다. 다음에 할 검사로 바로 이동할 수 있습니다.",
      },
      {
        src: "/images/portfolio/team-pulse/score-state.webp",
        title: "점수와 축별 해석",
        caption:
          "대표·보조·보완 축 점수를 0~100점 기준으로 보여 주고, 축마다 판정과 이론 렌즈 설명을 붙입니다.",
      },
      {
        src: "/images/portfolio/team-pulse/ai-analysis.webp",
        title: "AI 분석",
        caption:
          "검사 점수를 강한 장면과 마찰 장면으로 나눠 해석하고, 바로 해 볼 행동과 스스로 던질 질문을 제안합니다.",
      },
      {
        src: "/images/portfolio/team-pulse/team-aggregate.webp",
        title: "팀 판독",
        caption:
          "팀원 결과를 모아 팀 프로필과 앞쪽·뒤쪽 결 평균을 보여 주고, 신호·주의·실험 순으로 팀 운영 힌트를 정리합니다. 응답자가 적은 검사는 개인을 추정하지 않도록 평균 해석을 숨깁니다.",
      },
      {
        src: "/images/portfolio/team-pulse/survey-flow.webp",
        title: "검사 진행",
        caption:
          "문항에 5점 척도로 답하는 동안 지금 앞서는 성향 축을 실시간으로 보여 줍니다. 답할 때마다 자동 저장돼 중간에 나가도 이어서 할 수 있습니다.",
      },
    ],
    emoji: "🧭",
    gradient: "from-rose-500/20 to-pink-600/20",
    features: [
      "Big Five·사티어·Vaillant 등 자체 문항 배터리를 Likert로 측정(정·역문항 균형, 역문항 자동 반전)",
      "축별 min-max 정규화(0–100)로 채점하고 대표·보조·보완·대비축 아키타입 뱃지 생성",
      "서로의 업무 방식을 이해하도록, 결과를 단정적 평가가 아닌 부드러운 말투로 풀고 팀 실험 과제를 제안",
      "AI 해석은 백그라운드 작업(Next.after)으로 분리·타임아웃 보호해 프록시/게이트웨이 타임아웃 우회",
      "팀 집계는 최소 3명 응답 전까지 개인 역산 불가(구간 표시)",
      "RLS로 개인 결과는 기본 본인만 보고 본인이 동의하면 팀원도 열람, 팀 집계는 소유자 화이트리스트만 접근",
      '설문 전 동의 모달과 결과의 "HR 평가·임상 진단 아님" 고지로 낙인 방지',
      "Google OAuth 로그인, 관리자 view-as, 인쇄 최적화 결과 화면",
    ],
    highlight: "서로의 업무 방식을 이해하는 팀 진단 — 낙인 방지 설계",
    year: "2026",
    badge: "NEW",
  },
  {
    slug: "naver-place-collector",
    name: "Naver Place Collector",
    tagline: "업종별 B2B 타겟 업체 DB 수집·판정 SaaS",
    description:
      "영업팀이 업종 프로필(키워드·카테고리·필터)과 지역을 지정하면, 비동기 파이프라인이 검색 → 상세 → 리뷰·활동성 판정 → 노출·체인 분류 → 스코어링까지 단계별 병렬 처리해 등급화된 영업 타겟 DB를 산출합니다. 장시간 수집의 차단은 TLS 핑거프린트 위장과 동적 프록시 풀로 견딥니다.",
    tech: ["Next.js 15", "FastAPI", "ARQ + Redis", "curl_cffi", "PostgreSQL"],
    category: "web",
    scope: "other",
    liveUrl: "https://coll.dvsharp.com",
    screenshot: "/images/portfolio/naver-place-collector/hero.png",
    screensNote: "수집 결과의 업체명·주소·전화는 가짜 값으로 바꿔 찍었습니다.",
    screens: [
      {
        src: "/images/portfolio/naver-place-collector/job-results.webp",
        title: "수집 결과와 등급",
        caption:
          "한 번의 수집에서 모은 업체를 점수에 따라 A·B·C·F 등급으로 나누고, 이전 수집과 비교한 신규·제외·점수 변동을 함께 보여 줍니다. 결과는 플랫폼·등급·필터로 좁혀 보고 내려받을 수 있습니다.",
      },
      {
        src: "/images/portfolio/naver-place-collector/job-pipeline.webp",
        title: "수집 파이프라인 진행",
        caption:
          "네이버 검색·상세, 활동성 보강, 카페 노출, 당근 검색·상세처럼 단계별로 처리 건수와 소요 시간, 완료 여부를 확인합니다. 완료된 수집은 고객 화면에 공개하거나 공개를 취소할 수 있습니다.",
      },
      {
        src: "/images/portfolio/naver-place-collector/jobs-list.webp",
        title: "관리자 수집 현황",
        caption:
          "실행 중이거나 끝난 수집을 프로필·지역·플랫폼·진행 건수·소요 시간과 함께 한 목록에서 보고, 상태별로 걸러 결과를 내려받습니다.",
      },
      {
        src: "/images/portfolio/naver-place-collector/profile-keywords.webp",
        title: "업종 프로필 설정",
        caption:
          "업종마다 검색 키워드와 네이버·카페·당근·숨고별 포함 카테고리를 정해 두고, 수집할 때 이 기준으로 업체를 걸러 냅니다.",
      },
      {
        src: "/images/portfolio/naver-place-collector/job-new.webp",
        title: "새 수집 시작",
        caption:
          "업종 프로필을 고르고 시·도 또는 시·군·구 단위로 수집 지역을 선택해 새 수집을 준비하는 화면입니다.",
      },
      {
        src: "/images/portfolio/naver-place-collector/db-interview.webp",
        title: "공개 소개 페이지",
        caption:
          "로그인 없이 볼 수 있는 소개 페이지로, 영업 타깃 데이터를 만드는 방식을 설명하고 설문 참여로 이어집니다.",
      },
    ],
    emoji: "📍",
    gradient: "from-green-600/20 to-emerald-500/20",
    features: [
      "검색·상세수집·리뷰·활동성·카페/블로그 노출·체인 분류·스코어링 다단계 파이프라인을 병렬 처리·중간 실패 재개",
      "최신 리뷰 날짜로 active/inactive/unknown 활동성 자동 판정",
      "업종 프로필 키워드·카테고리 include/exclude 토큰 매칭으로 관련성 필터링",
      "플랫폼별 90일 활동(리뷰·카페·블로그·단골) 합산 점수로 A/B/C/F 등급 부여",
      "네이버 차단 회피 — curl_cffi로 TLS(JA3) 핑거프린트 위장 + 키워드·세션·딜레이 랜덤화",
      "가용 IP 수 기반 동적 워커 풀(min(stage_cap, pool.size))로 IP 고갈 방지",
      "이전 수집 대비 신규·증가·감소 delta 추적으로 영업 인사이트 제공",
      "Raw 수집 데이터와 영업용 DB를 2시트로 동시 산출",
    ],
    highlight: "차단 회피 수집 + 활동성·등급 자동 판정",
    year: "2026",
    badge: "NEW",
  },
  {
    slug: "apinfy-lab",
    name: "Apinfy Lab",
    tagline: "self-host 액터 기반 크롤링 SaaS 커널",
    description:
      "조직·API키 RBAC가 내장된 단일 노드 크롤링 플랫폼 커널. 액터(재사용 크롤링 유닛)를 버전 관리로 등록하고, 실행마다 dataset·KV·요청 큐를 격리해 동시 실행을 안전하게 처리합니다. 스케줄·웹훅·프록시 풀·재시도까지 SaaS 계약을 갖춰 분산 워커로 확장할 기초를 만든 레퍼런스 구현입니다.",
    tech: ["Python", "FastAPI", "SQLAlchemy async", "Docker", "curl_cffi"],
    category: "tool",
    scope: "other",
    // 공개 인스턴스(apin.dvsharp.com)는 2026-06 은퇴 — 코드만 공개 유지
    githubUrl: "https://github.com/yurielk82/apinfy-lab",
    screenshot: "/images/portfolio/apinfy-lab/hero.png",
    screensNote: "실행·데이터셋은 외부 수집 없이 만든 합성 자료입니다.",
    screens: [
      {
        src: "/images/portfolio/apinfy-lab/dashboard.webp",
        title: "콘솔 대시보드",
        caption:
          "대표 액터(네이버 플레이스 검색)의 입력 예시와 액터·실행·데이터셋 수, 최근 실행 상태, 액터 목록을 한 화면에 모아 보여 줍니다.",
      },
      {
        src: "/images/portfolio/apinfy-lab/actor-input.webp",
        title: "액터 입력 설정",
        caption:
          "액터가 정의한 입력 스키마로 검색어·최대 결과 수 같은 값을 폼에 채우면 실행에 보낼 JSON이 함께 만들어집니다. 빌드·제한 시간·메모리 같은 실행 옵션도 여기서 고릅니다.",
      },
      {
        src: "/images/portfolio/apinfy-lab/actor-output.webp",
        title: "액터 실행 결과",
        caption:
          "마지막 실행이 쌓은 데이터셋을 표와 원본 JSON으로 나란히 보여 줍니다. 화면의 행은 외부 수집을 끈 시험(fixture) 모드 출력 형식입니다.",
      },
      {
        src: "/images/portfolio/apinfy-lab/run-dataset.webp",
        title: "실행 상세",
        caption:
          "실행마다 상태와 함께 로그, 데이터셋, 키-값 저장소, 요청 대기열을 탭으로 나눠 확인합니다.",
      },
      {
        src: "/images/portfolio/apinfy-lab/storage.webp",
        title: "저장소",
        caption:
          "실행이 만든 데이터셋·키-값 저장소·요청 대기열을 실행 번호와 API 경로와 함께 모아 보고, 데이터셋은 JSONL·CSV로 내려받습니다.",
      },
      {
        src: "/images/portfolio/apinfy-lab/schedules.webp",
        title: "예약 실행",
        caption:
          "cron 식과 시간대를 지정해 액터 실행 일정을 등록하고 목록으로 관리합니다.",
      },
    ],
    emoji: "🕸️",
    gradient: "from-violet-600/20 to-fuchsia-600/20",
    features: [
      "액터 실행 모델 — 진입점(파이썬 모듈/Docker 이미지)·입출력 스키마·CPU/메모리/타임아웃을 선언식으로 저장하고 버전별 관리",
      "org_id 기반 멀티테넌시로 테넌트 간 행 수준(RLS) 격리",
      "croniter cron 스케줄로 due 판정·자동 큐잉",
      "실행마다 dataset·KV·요청 큐 자동 프로비저닝으로 run 간 격리",
      "요청 큐 unique_key 제약으로 lock-free 중복 제거·재시도",
      "실패 시 자동 재시도(최대 2회)와 버전별 타임아웃 적용",
      "웹훅 이벤트(queued/running/failed/succeeded) HMAC-SHA256 서명 전달",
      "Bright Data 등 프록시 세션 풀(usable/exhausted 상태) 관리",
      "Local/Docker 실행기 전략 패턴으로 개발↔프로덕션 전환과 향후 k8s 확장 대비",
    ],
    highlight: "액터 모델 + 실행 격리 — 확장 가능한 크롤링 커널",
    year: "2026",
    badge: "NEW",
  },
  {
    slug: "claude-dotfiles",
    name: "Claude/Codex Harness",
    tagline:
      "코드는 싸지 않다 — 하네스 · 루프 엔지니어링 · RAG 기억 AX 운영 체계",
    description:
      "Claude Code와 Codex 기반 작업 방식을 규칙·훅·에이전트·스킬·RAG 기억으로 계층화하여 관리하는 AX Delivery 자동화 하네스. 작은 스킬, 공유 언어, 피드백 루프라는 방향은 mattpocock/skills와 결과적으로 맞닿지만, 현업 배포·리뷰·RAG 기억까지 포함한 더 고도화된 운영 체계로 확장했습니다.",
    tech: [
      "Bash",
      "Markdown",
      "YAML",
      "Claude Code",
      "Codex",
      "Git Hooks",
      "RAG Memory",
    ],
    category: "tool",
    scope: "other",
    screensNote:
      "화면이 없는 설정 저장소라 실제 명령 실행 결과를 터미널 화면으로 옮겼습니다.",
    screens: [
      {
        src: "/images/portfolio/claude-dotfiles/hook-guard.webp",
        title: "에이전트 명령 가드 훅",
        caption:
          "Claude·Codex가 Bash 명령을 실행하기 전에 PreToolUse 훅이 명령을 확인합니다. 정해 둔 진입점을 건너뛰는 작업 트리 생성이나 빌드는 막고 올바른 경로를 알려 주며, 일반 명령은 그대로 통과시킵니다.",
      },
      {
        src: "/images/portfolio/claude-dotfiles/precommit-secret.webp",
        title: "커밋 전 서식·비밀 값 검사",
        caption:
          "모든 저장소에 연결된 전역 pre-commit이 스테이징된 파일의 서식을 정리하고 비밀 값을 검사합니다. 토큰처럼 보이는 값이 있으면 커밋을 막습니다(임시 저장소에서 가짜 토큰으로 실행한 화면입니다).",
      },
      {
        src: "/images/portfolio/claude-dotfiles/common-rules.webp",
        title: "공통 지침",
        caption:
          "모든 세션이 읽는 공통 지침이 개발·검사·배포·백업 기준과 스킬·도구 적용 문서를 연결합니다. 규칙은 한 원본에서만 고치고 각 도구는 그 원본을 참조합니다.",
      },
      {
        src: "/images/portfolio/claude-dotfiles/rules-layout.webp",
        title: "규칙·훅·에이전트·스킬 구성",
        caption:
          "지침·정책·참조 문서, 훅, 자체 스킬을 한 저장소에 나눠 관리하고, 역할별 에이전트 정의와 설치된 스킬을 함께 씁니다.",
      },
    ],
    githubUrl: "https://github.com/yurielk82/claude-dotfiles",
    emoji: "🤖",
    gradient: "from-amber-500/15 to-orange-500/15",
    features: [
      "코드는 싸지 않다 — 생성 속도보다 요구 정렬·검증·유지보수 비용 통제를 앞세운 운영 원칙",
      "하네스 — Claude Code·Codex 작업 규칙을 계층화해 코드 원칙·보안·DDD·디자인·배포 기준을 자동 주입",
      "루프 엔지니어링 — 완료를 독립 재검증으로 막는 완료 게이트(kdh), 가정을 먼저 노출하는 진화 루프(ooo), 매일 밤 부채를 자율 수정하는 무인 루프",
      "RAG 기억 — 파일 기반 장기 기억 + 의사결정 자동 회수 훅 + 위키·문서 검색으로 프로젝트 맥락을 세션 간 회수",
      "커밋 전 검증·테스트/빌드 가드·배포 안전장치·반복 실수 방지 훅 체계",
      "architect·reviewer·tester·debugger 에이전트 역할 분리로 계획·리뷰·검증·디버깅 병렬화",
      '트렌드를 좇지 않고 har_eval로 측정 — 전용 그래프 기억 도구는 측정 후 "문서 기반으로 충분"이라 만들지 않음',
      "AI 페어 프로그래밍을 개인 프롬프트가 아니라 AX 납품용 운영 하네스로 표준화",
      "작업 완료 후 검증·커밋·push·배포 흐름까지 규칙화해 구현 속도와 운영 안전성을 동시 확보",
    ],
    highlight:
      "하네스 · 루프 엔지니어링 · RAG 기억 — 데모가 아닌 AX 납품 운영 체계",
    year: "2026",
  },
  {
    slug: "har-eval",
    name: "har_eval",
    tagline: "증거-게이트 역량 결정 하네스 (build/adopt/keep)",
    description:
      '"도구·기능·시스템 X를 만들·도입·유지할까?"를 의견·열정이 아니라 측정과 적대 감사로 결정하는 메타-하네스. 수개월 실 결정(메모리 도구 빌드-안함, serena keep/retire)에서 증류한 7단계 방법론과 자기 실패에서 파생된 가드레일 10개로 구성됩니다.',
    tech: ["Markdown", "Claude Code", "Codex", "Skill", "Evidence-Gate"],
    category: "tool",
    scope: "other",
    screens: [
      {
        src: "/images/portfolio/har-eval/overview.webp",
        title: "har_eval 개요",
        caption:
          '"X를 만들·도입·유지할까?"를 의견이 아니라 측정과 적대 감사로 정하는 평가 하네스의 개요입니다. 먼저 안 만들어도 되는지를 싸게 확인하고, 데이터가 갭을 입증할 때만 빌드합니다.',
      },
      {
        src: "/images/portfolio/har-eval/seven-steps.webp",
        title: "7단계 요약과 산출물",
        caption:
          "Frame부터 Decide·Cleanup까지 7단계로 평가를 진행합니다. 결과는 판정 1건과 측정 수치, 메커니즘, 신뢰도 라벨(measured·inferred·mechanism-backed)로 남깁니다.",
      },
      {
        src: "/images/portfolio/har-eval/guardrails.webp",
        title: "가드레일 H1–H10",
        caption:
          "표본 수 하한, 측정하지 않은 후보 추론 금지, 모델 고정, buy-before-build 같은 하드 룰 10개입니다. 각 규칙에는 그 규칙이 생긴 실제 실패 사례를 함께 적어 둡니다.",
      },
      {
        src: "/images/portfolio/har-eval/examples.webp",
        title: "실전 사례",
        caption:
          '메모리 도구를 새로 만들지 판단한 사례처럼, 이 절차로 실제 결정을 내린 기록입니다. 자기감사 뒤 교차모델 감사로 놓친 문제를 더 찾고, 측정 결과로 "현재로 충분"을 판정했습니다.',
      },
      {
        src: "/images/portfolio/har-eval/templates.webp",
        title: "평가 템플릿",
        caption:
          "저장소의 templates 폴더에 있는 감사·결정 계획·골든셋·측정 템플릿입니다. 측정 템플릿은 Control과 후보 arm을 같은 모델로 비교하고, 판정 기준을 실행 전에 정해 두도록 안내합니다.",
      },
    ],
    githubUrl: "https://github.com/yurielk82/har_eval",
    docsPath: "/har-eval",
    emoji: "⚖️",
    gradient: "from-slate-600/15 to-zinc-400/15",
    features: [
      "7단계(Frame·Inventory·Design·Adversarial audit·Buy-before-build·Measure·Decide+Cleanup)로 잘못된 yes의 빌드 시간 낭비를 차단",
      "교차모델 적대 감사 — 자기감사 위에 다른 벤더(Codex) 모델로 단일모델 구조적 맹점을 포착(실사례 13건 추가 발견)",
      "buy-before-build + 싼것부터 게이팅 — 만들어서 확인하지 않고 기성 도구를 Control에 붙여 실토큰·정답률을 측정",
      "자기 실패에서 파생된 반증가능 가드레일 10개(n≥6, 미측정 arm 추론금지, 모델 고정, 신뢰도 라벨)",
      "모든 판정에 measured(n)/inferred/mechanism-backed 신뢰도 라벨을 붙여 측정과 추론을 분리",
      '첫 임무는 "만들 이유 찾기"가 아니라 "안 만들어도 되는지 싸게 확인" — 흔한 정직한 결과는 "현재로 충분"',
    ],
    highlight: "측정 + 교차모델 적대감사로 내리는 역량 결정 하네스",
    year: "2026",
  },
];
