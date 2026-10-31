# 공고 모음 서버 설정

로그인한 허용 계정에게만 보이는 `/jobs`(공고 모음)의 서버 쪽 설정이다. 웹 서비스 유닛 본체(`github-ref-hub.service`)는
워크스페이스 `infra/systemd/units`가 원본이고, 여기에는 ref-hub에만 필요한 덧붙임과 수집 예약 작업만 둔다.

| 파일 | 설치 위치 | 역할 |
| --- | --- | --- |
| `github-ref-hub.service.d/50-jobs-board.conf` | `/etc/systemd/system/github-ref-hub.service.d/` | 웹 서비스에 로그인 비밀 파일과 공고 저장 위치를 넣는다 |
| `ref-hub-jobs-collect.service` | `/etc/systemd/system/` | 사람인 공고를 받아 저장 파일에 합친다 |
| `ref-hub-jobs-collect.timer` | `/etc/systemd/system/` | 매일 07:00 KST에 수집을 돌린다 |

## 비밀 파일 (git에 올리지 않는다, 소유자 전용 0600)

- `~/.config/secrets/ref-hub-auth.env`: `SUPABASE_URL=https://sb.dvsharp.com`, `SUPABASE_ANON_KEY`(공용 Supabase의 공개 키),
  `JOBS_ALLOWED_EMAILS`(쉼표 구분). 로그인은 공용 Supabase의 Google 로그인을 거치므로 Google 콘솔에는 따로 넣지 않는다.
  대신 공용 Supabase 설정(`/home/ubuntu/supabase/docker/.env`)의 `ADDITIONAL_REDIRECT_URLS`에
  `https://ref.dvsharp.com/auth/callback`이 있어야 한다. 바꾼 뒤 `docker compose up -d auth`로 반영한다.
- `~/.config/secrets/saramin-api.env`: `SARAMIN_ACCESS_KEY`(선택). 이 파일이 없으면 수집 작업은 건너뛴다(장치의 `ConditionPathExists`).
  키 줄이 없으면 사람인 공개 검색 화면을 읽는다(`lib/jobs/saramin-web.ts`, 2026-10-31 오너 결정). 키 발급 전에는 파일만 두고 키 줄을 비운다.
  검색 화면은 robots.txt가 막지 않은 목록만 읽고 공고 상세는 열지 않으며, 요청 사이 3초를 둔다(하루 10여 회).

저장 파일은 `~/.local/share/ref-hub/jobs/postings.json`(폴더 0700, 파일 0600)이다. 사람인 이용 조건에 저장 범위가
정해져 있지 않아 본인 열람용으로만 두고 공개 화면·저장소에 싣지 않는다.

사람인 이력서(`/resume`) 버전은 `~/.local/share/ref-hub/resume/versions/<저장시각-난수>.json`, 잡코리아(`/resume?p=jobkorea`)는 같은 폴더의 `jobkorea-versions/`다(폴더 0700, 파일 0600).
폴더는 `RESUME_DATA_DIR`로 바꿀 수 있고, 없으면 `JOBS_DATA_DIR` 옆 `resume` 폴더를 쓴다(따로 설정할 것 없음).
화면에서 저장하면 새 파일이 생길 뿐 기존 버전은 고치지 않는다. 개인 정보라 저장소에 올리지 않는다.

## 제출 파일과 공유 링크

`/resume`에서 저장된 버전의 이력서·경력기술서·포트폴리오·자기소개서를 PDF 또는 DOCX로 내려받는다.
문서 양식은 `lib/resume/docx.ts`, 포트폴리오 사례는 `data/work-history.ts`와 공개 화면 원본을 사용한다.
PDF는 서버에 설치된 `/usr/bin/libreoffice`와 `libreoffice-writer` 패키지로 변환한다. 한글 글꼴은 `Noto Sans CJK KR`을 사용하며
요청별 임시 프로필과 파일은 변환 뒤 삭제한다. DOCX 생성은 `docx`, 공개 WebP 화면 변환은 기존 `sharp`를 사용한다.

URL 복사 시 로그인·허용 계정을 다시 확인하고 선택 파일을 `RESUME_DATA_DIR/shares/<64자리 난수>.json`에 고정한다.
설정이 없으면 기존 이력서 폴더의 `shares/`다. 파일 내용과 설명을 한 JSON으로 원자적으로 게시하며
폴더 0700·파일 0600으로 보관한다. 원본·템플릿 변경은 기존 제출 파일에 영향을 주지 않는다.
`/resume/shared/<토큰>`은 로그인 없이 파일 하나만 내려주며 캐시·검색 색인을 금지한다.
공유 목록은 해당 버전을 다시 열어 확인한다. 공유 중단은 그 파일을 지워 즉시 주소를 무효화한다.
이미 상대방이 내려받은 사본은 회수되지 않는다. 토큰이 든 URL은 개인정보 접근 수단이므로 저장소·로그·문서에 붙이지 않는다.

## 설치·되돌리기

```bash
cd ~/GitHub/ref-hub/ops/systemd
sudo install -d -m 0755 /etc/systemd/system/github-ref-hub.service.d
sudo install -m 0644 github-ref-hub.service.d/50-jobs-board.conf /etc/systemd/system/github-ref-hub.service.d/
sudo install -m 0644 ref-hub-jobs-collect.service ref-hub-jobs-collect.timer /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now ref-hub-jobs-collect.timer
sudo systemctl restart github-ref-hub.service   # 비밀 파일을 바꾼 뒤에도 다시 시작해야 반영된다
```

되돌리기: `sudo systemctl disable --now ref-hub-jobs-collect.timer`, 위 세 파일을 지우고 `daemon-reload` 뒤 웹 서비스를 다시 시작한다.

수집을 바로 한 번 돌리려면 `sudo systemctl start ref-hub-jobs-collect.service`, 결과는 `journalctl -u ref-hub-jobs-collect -n 50`.
