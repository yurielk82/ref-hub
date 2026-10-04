
<!-- agent-governance:managed:start source=ref-hub-claude hash=a84718f2cb03bdb801c7afaf8f3903ad4e92db2ba3881ffda5051aabd9d5de2e -->
# GitHub 워크스페이스 공통 규칙

## 범위

- `/home/ubuntu/GitHub`는 독립 Git 저장소 여럿과 공통 운영 도구를 담은 워크스페이스다. 실제 대상 저장소
  경로를 확인하고 그 안에서만 고친다.
- 기존 프로젝트는 등록된 `/home/ubuntu/GitHub/<repo>`를 우선하고, 격리 실험·작업 트리(worktree)·빌드 검증은
  `/home/ubuntu/codex/repos`를 쓴다.
- 하위 Git 저장소에서는 Claude Code와 Codex의 상위 규칙 로딩 방식이 달라 상속을 가정하지 않는다. 공통 원본
  렌더러가 승인된 프로젝트에 워크스페이스 핵심을 넣어야 한다.

## 작업 시작

- 저장소 상태, 적용되는 네이티브 규칙, `README.md`, 의존성 목록, 관련 설계·도메인 문서를 먼저 확인한다.
- 화면 변경은 가장 가까운 `DESIGN.md`를 확인하고 기존 디자인 시스템·접근성·반응형 동작을 보존한다.
- 읽기 전용 조사·검토는 기존 사본, 종속 변경은 순차, 독립 동시 구현·별도 검토만 분리한다.
  같은 폴더의 순차 수정은 별도 승인 없이 한다. 다른 세션 변경은 올리거나 되돌리지 않는다.
- 생성·표시·집계와 날짜가 필요한 자동 메시지는 `Asia/Seoul`을 쓰고, DB 저장 시각은 UTC와 구분한다.
- KUP 등 ERP 원천은 읽기 전용이다. 별도 명시 권한 없이 SELECT 밖의 쓰기·수정·삭제를 하지 않는다.

## 검증과 완료

- 먼저 프로젝트 자체의 바뀐 부분 테스트를 돌리고, 필요하면 워크스페이스 표준 검증 `bin/verify.sh --changed`를
  더한다. 검증을 저장소 대청소로 넓히지 않는다.
- 새 작업도 목표·대상·성공 기준이 확정되면 바로 구현한다. 파일 수·의존성 조정은 인터뷰·Ouroboros 진입 조건이 아니다.
  모호하거나 되돌리기 어려운 작업 또는 사용자 명시 요청은 Ouroboros CLI를 쓴다.
  `[topic:workspace/workflow]`와 어댑터의 명령·종료 확인을 따른다.
- KDH를 자동 적용하지 않는다. 사용자가 명시하거나, 정상 검증을 거쳤는데도 같은 종류의 완료
  누락이 반복되어 더 엄격한 증거 검사가 필요할 때만 `[topic:workspace/kdh]`를 수동으로 적용한다.
- 완료 보고 전 실행한 명령과 결과를 다시 확인한다. 핵심 검사가 실패했거나 실행할 수 없으면 완료라고
  부르지 않는다.
- 데이터 값·시스템 상태·동작 여부 질문은 추측하지 않고 조회 가능한 원천(서비스 로그, DB, 생성 산출물, 접속
  기록)을 먼저 실측해 답한다. 실측할 수 없는 미래 동작은 예측임을 밝히고 검증 시점·방법을 함께 쓴다. 관측
  시점이 다른 두 값의 차이는 원인 추측 전에 시점 차이부터 확인한다(오너 지시 2026-07-29).
- 운영 상태 점검은 `bin/verify-ops.sh`, 거버넌스 결정 일관성 점검은 `bin/decision_audit.py`의 현재 도움말과
  안전 모드를 확인해 쓴다.
- 빌드·전수 테스트·스캔처럼 무거운 작업은 `/home/ubuntu/GitHub/bin/batch <명령>`으로 실행한다. 직접
  실행하면 자원 상한이 없어 디스크가 포화되고 다른 세션의 터미널이 멈춘다.

## 배포와 운영 사본

- 개발 확인·수정과 통합 검증·인수 뒤 요청한 변경의 마지막 운영 배포는 `[topic:workspace/deploy]`의 경로
  (`bin/deploy-main <project>`, `bin/projects.tsv`)만 쓴다. 프로젝트 승인을 지키며
  직접 재시작으로 빌드·결과물 검증·상태 점검·롤백을 건너뛰지 않는다.
- 운영 사본 `/home/ubuntu/GitHub/*`에서 `.next` 같은 실행 결과물을 쓰는 빌드는 승인된 배포 흐름이 바로
  다시 읽기와 상태 점검까지 할 때만 한다. 빌드만 하는 검증은 격리 작업 트리·복제본에서 한다.
- Docker·Nginx·Cloudflare·systemd·Supabase·포트·도메인·상태 점검·배포 인증 정보의 신설·변경은 자동 배포
  범위 밖이라 별도 승인을 받는다.
- 배포·인프라 전에 `[topic:workspace/deploy]`와 `[topic:workspace/infra]`를 읽는다. DB·스키마 작업은 별도
  승인 뒤에도 `[topic:workspace/database]`를 먼저 읽고 적용 직전 마이그레이션 전 백업 성공을 확인한다.
- 필수 주제 규칙을 찾거나 읽을 수 없으면 관련 작업을 하지 않고 연결 안 된 상태를 보고한다.

## Git 안전

- 승인된 구현은 검증 → 자기 변경만 커밋 → 작업 브랜치 푸시 → PR → 필수 검사·승인 확인 → 병합 →
  원격 병합 완료 확인까지 직접 한다. 푸시 종료·병합 위임은 금지한다.
  PR까지만 요청한 경우·저장소 별도 병합 승인 경계는 지킨다.
- `main`/`master` 직접 푸시는 계속 차단 장치의 보호 대상이다. 작업 트리가 있다는 것은 PR 병합 차단 사유가
  아니다. 직접 푸시와 PR 병합을 구분하고 정상 PR 경로에서 차단 장치 예외를 쓰지 않는다. 충돌, 실패한 필수
  검사, 부족한 권한·필수 승인, 불명확한 대상은 구체적 증거와 함께 보고한다. 대기 중인 검사는 계속 조회하고,
  통과 뒤 최신 커밋 해시를 다시 확인해 병합한다. 병합 대기열에 들어가면 예약을 완료로 보고하지 않고 원격
  병합 완료 상태까지 확인한다.
- 공유·병렬 저장소에서는 파일을 골라 커밋 대상에 올린다. 삭제·이름 변경이나 강제 푸시는 따로 검토한다.
- 자세한 방식은 `[topic:workspace/git]`을 따른다.

## 규칙과 자동 작성자

- 공통 규칙의 편집 원본은 `agent-governance/`다. 생성된 `CLAUDE.md`·`AGENTS.md` 관리 구역을 사람이 직접
  고치지 않는다.
- `harness`와 규칙 개선 도구는 네이티브 파일에 직접 쓰지 않고 공통 원본 변경안을 만든다. 렌더러가 양쪽 파일을
  다시 만들어야 두 런타임에 반영된다.
- `AUTO-HISTORY`, Ouroboros, Next.js, 수정기처럼 등록된 외부 표시 구역 작성자는 자기 구역만 맡는다. 관리
  구역을 건드리거나 모르는 작성자가 나타나면 어긋남으로 보고 멈춘다.
- 같은 이름의 스킬·플러그인이 양쪽에 있어도 해시와 동작을 확인하기 전에는 같다고 보지 않는다.
- 빠르게 변하는 라이브러리 API는 양쪽 런타임에서 `bin/ctx7`로 확인하고 공식 1차 문서와 대조한다.
- 고위험 결과나 한 모델이 만든 결과의 적대 검토에는 가능하면 다른 회사의 읽기 전용 검토자를 쓴다. 모델
  버전보다 독립된 검토 방식을 지킨다.

## 주제 규칙 로딩

- 외부 마이크로서비스 API 작업 전: `[topic:workspace/api]`
- 배포·운영 작업 전: `[topic:workspace/deploy]`, `[topic:workspace/infra]`
- Supabase·스키마·마이그레이션 작업 전: `[topic:workspace/database]`
- 보안·의존성 작업 전: `[topic:workspace/security]`
- Git·병렬 작업 트리 작업 전: `[topic:workspace/git]`
- 테스트·자동 수정기 작업 전: `[topic:workspace/testing]`
- KDH 수동 재검증: 사용자 명시 또는 반복된 완료 누락이 확인된 경우 `[topic:workspace/kdh]`
- 검토·구현·장애 보고: `[topic:workspace/reporting]`
- 새 공통 함수·여러 화면 공통 동작 전: `[topic:workspace/reuse]`
- 진입·위임·대기·마무리 절차: `[topic:workspace/workflow]`

ID는 경로가 아니라 각 런타임의 규칙·스킬로 투영된다. 차단 의무는 항상 로드되는 핵심에도 남긴다.

# 역할

AX 포트폴리오 + 프로젝트 통합 레퍼런스 사이트. 랜딩(`/`)은 쇼케이스 포트폴리오(`data/projects.ts` 카드 + `data/ax.ts`), 하위 경로는 프로젝트별 Nextra 매뉴얼(csoweb · kpis-dsr-api · pharmkpi · ev-motor-reliability · corerx · edi-verification). studiogo는 숨김(카드·문서·nav 제거, repos submodule만 보존). ref.dvsharp.com 공개 서빙.

# 기술 구성

- 언어: TypeScript
- 프레임워크: Next.js 15 + Nextra v4 (App Router, MDX 중심)
- 데이터베이스(DB): 없음 (정적 사이트)
- 문서 수집: Git submodule (`repos/*/docs/manual/`) + `scripts/sync-docs.mjs` → `content/*/` 복사
- 호스팅: systemd standalone (`github-ref-hub.service`, Next.js standalone, 포트 3007) + Nginx (ref.dvsharp.com)
- 인증: 없음 (공개)

# 진입점

| 명령                                                | 용도                                |
| --------------------------------------------------- | ----------------------------------- |
| `npm run dev`                                       | 로컬 개발 (predev가 sync 자동 실행) |
| `npm run sync`                                      | submodule docs 동기화               |
| `git submodule update --remote && npm run sync`     | 최신 문서 가져오기 + 동기화         |

Health URL: http://127.0.0.1:3007/
배포: `[topic:workspace/deploy]`
systemd 유닛: `github-ref-hub.service` (target `github-ref-hub.target`). 관리: `./bin/pmx logs ref-hub`, `./bin/pmx restart ref-hub`

# 관례

- MDX 문서 중심 — 일반 React 컴포넌트 분리 불필요
- 문서는 기존 MDX의 파일 구조·문체를 따르고, 탐색 항목을 바꿀 때 같은 디렉터리의 `_meta.tsx`도 함께 검증한다.
- Tailwind 직접 사용 없음 (Nextra 테마가 스타일 제공)
- 문서 수정 흐름(submodule 프로젝트): 각 프로젝트 리포의 `docs/manual/` 수정·커밋·푸시 → 포털에서 `git submodule update --remote repos/<project>` → `npm run sync` → 커밋·푸시 → 배포
- 직접 관리(submodule 아님): `content/pharmkpi/`·`content/corerx/`·`content/edi-verification/` 는 포털 리포에서 직접 편집 (private/내부)

# 예외

- design-constraints(Tailwind): 미적용 — Nextra 테마가 스타일링 담당
- code-principles(컴포넌트 분리): 미적용 — MDX 문서 중심

# 도메인

- 사이트 구성: 랜딩(`/`) = AX 포트폴리오, 하위 경로 = 프로젝트별 Nextra 매뉴얼
- 포트폴리오 레이어:
  - `data/projects.ts` — 쇼케이스 카드 (pharmkpi · sales-strategy-portal · pharmkpi-exec · csoweb · kpis-dsr-api · ev-motor-reliability · erp-spec · srt · team-pulse · naver-place-collector · apinfy-lab · claude-dotfiles · har-eval; studiogo는 숨김). csoweb 카드는 edi-verification을 featuredModule로 노출
  - `data/ax.ts`·`data/experience.ts` — AX 역량·이력 데이터
  - `app/(portfolio)/` — 랜딩·프로젝트 상세(`projects/[slug]`)·ax 페이지
- 문서(매뉴얼) 레이어:
  - `repos/` — Git submodule (csoweb, kpis-dsr-api, ev-motor-reliability; studiogo submodule은 보존하되 sync 목록에서 제외)
  - `scripts/sync-docs.mjs` — submodule `docs/manual/` → `content/{csoweb,kpis-dsr-api,ev-motor-reliability}/` 복사
  - `content/{pharmkpi,corerx,edi-verification}/` — 포털 리포 직접 관리 (submodule 아님)
  - `content/_meta.tsx` — 매뉴얼 사이드바 네비게이션 (포털 리포 관리). `content/index.mdx`는 없음 — 랜딩은 포트폴리오가 대체
  - `content/*` 는 git 추적 (Vercel 빌드용, sync는 빌드 전 로컬 갱신) — `.gitignore` 의 content 항목은 주석 처리됨
  - `app/(docs)/` — 매뉴얼 라우팅 (Nextra catch-all), `app/layout.tsx` — 루트 레이아웃 (Nextra 테마)
  - `public/images/{project}/`, `public/images/portfolio/{project}/` — 스크린샷·다이어그램

## 트러블슈팅

<!-- 반복 장애 발생 시 1줄씩 추가: 증상 → 원인 → 해결책 -->

# ref-hub Claude 어댑터

- Claude Code 기본 프로젝트 탐색으로 공통 프로젝트 규칙을 적용한다.
<!-- agent-governance:managed:end -->

<!-- AUTO-HISTORY:START -->
_자동 생성 — `.claude/scripts/sync-claude-md.sh`. 수동 편집 금지 (append-only 로 .claude/SESSION_LOG.md 가 원본)._

## 최근 세션 히스토리

- `2026-09-09` `6402ad8` — chore(gitignore): ignore .env.production in the shared ignore list _(files: 1)_
- `2026-09-09` `8039899` — ci: pin every workflow job to Node 24 _(files: 1)_
- `2026-09-09` `86b462f` — chore: drop the unused PM2 config and stale one-off reports _(files: 7)_
- `2026-09-09` `f3bbda6` — chore(content): refresh synced manuals from current submodule heads _(files: 18)_
- `2026-09-09` `9ea71e9` — docs: propose the nginx defence-in-depth headers for ref.dvsharp.com _(files: 1)_
- `2026-09-09` `8094773` — test(site-integrity): pin the default-deny frame policy and the cache bound _(files: 1)_
- `2026-09-27` `574083a` — chore: add a generated shared-module catalog _(files: 2)_

원본: `.claude/SESSION_LOG.md` (append-only)
<!-- AUTO-HISTORY:END -->
