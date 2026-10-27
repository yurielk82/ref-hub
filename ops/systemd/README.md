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
- `~/.config/secrets/saramin-api.env`: `SARAMIN_ACCESS_KEY`. 이 파일이 없으면 수집 작업은 건너뛴다.

저장 파일은 `~/.local/share/ref-hub/jobs/postings.json`(폴더 0700, 파일 0600)이다. 사람인 이용 조건에 저장 범위가
정해져 있지 않아 본인 열람용으로만 두고 공개 화면·저장소에 싣지 않는다.

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
