# nginx 보안 헤더 변경안 — ref.dvsharp.com

> 상태: **미적용 / 승인 대기**. infra 변경은 워크스페이스 규칙상 별도 승인 대상이라
> 이 문서는 제안만 담는다. 적용은 소유자 승인 후 별도 작업으로 수행한다.

## 배경

2026-09-09 감사에서 `ref.dvsharp.com` 응답에 보안 헤더가 하나도 없는 것을 확인했다.

```
$ curl -sI https://ref.dvsharp.com/ | grep -icE 'x-frame|x-content-type|strict-transport|referrer'
0
```

앱 레이어는 이번 변경으로 해소했다 — `next.config.mjs` 가 모든 문서 응답에
`Content-Security-Policy: frame-ancestors 'none'`, `X-Frame-Options: DENY`,
`X-Content-Type-Options: nosniff`, `Referrer-Policy` 를 붙인다. 따라서 아래 nginx
변경은 **중복 방어(defense in depth)** 이며, 앱이 헤더를 놓치는 경로(정적 파일 직접
서빙, 에러 페이지, 향후 라우팅 변경)를 덮는 것이 목적이다.

HSTS 는 앱이 붙일 수 없으므로 **nginx 에서만 가능한 유일한 항목**이다.

## 적용 범위 주의

`/etc/nginx/sites-enabled/dvsharp.conf` 는 server 블록 20개를 담고 있고, 현재 보안
헤더가 있는 블록은 `pulse.dvsharp.com` 하나뿐이다. 즉 이 공백은 ref-hub 고유 문제가
아니라 워크스페이스 전반의 문제다. 아래 제안은 **ref.dvsharp.com 블록만** 다룬다.
나머지 18개 블록으로 확대할지는 별도 판단이 필요하다 — 일부는 API·임베드 대상이라
`X-Frame-Options DENY` 가 회귀를 일으킬 수 있다.

## 제안 diff

대상: `/etc/nginx/sites-enabled/dvsharp.conf` 324-344행 (Ref Hub 블록)

```diff
 # Ref Hub (ref.dvsharp.com → systemd github-ref-hub.service :3007)
 server {
     listen 443 ssl;
     server_name ref.dvsharp.com;

     ssl_certificate /etc/nginx/ssl/dvsharp.com.pem;
     ssl_certificate_key /etc/nginx/ssl/dvsharp.com.key;

+    # 앱(next.config.mjs)이 이미 붙이는 헤더의 중복 방어.
+    # always — 4xx/5xx 응답에도 붙인다.
+    add_header X-Content-Type-Options nosniff always;
+    add_header Referrer-Policy strict-origin-when-cross-origin always;
+    add_header Strict-Transport-Security "max-age=31536000" always;
+
     location / {
         limit_req zone=rl_general burst=40 nodelay;
         limit_conn conn_per_ip 15;
         proxy_pass http://127.0.0.1:3007;
```

## 의도적으로 넣지 않은 것

- **`X-Frame-Options DENY`** — 넣으면 `?embed=true` 임베드 경로가 깨진다. nginx
  `add_header` 는 조건부 완화가 불가능하고, 앱이 요청별로 정확히 판단하므로 프레임
  정책은 앱 레이어에 남긴다.
- **`Content-Security-Policy`** — 같은 이유. 앱이 embed 여부에 따라 다른 값을 낸다.
- **`includeSubDomains` / `preload`** — `dvsharp.com` 하위 도메인 전체에 영향이 가고
  되돌리기 어렵다. 별도 판단 필요.

## 주의: `add_header` 상속 규칙

nginx `add_header` 는 하위 블록에서 `add_header` 를 다시 선언하면 **상위 것이 전부
사라진다.** 위 블록의 `location /` 에는 현재 `add_header` 가 없어 안전하지만, 이후
`location` 을 추가하면서 헤더를 넣으면 server 레벨 3줄이 조용히 없어진다.

## 적용 절차 (승인 후)

```bash
sudo cp /etc/nginx/sites-enabled/dvsharp.conf \
        /etc/nginx/backups/dvsharp.conf.bak-$(date +%Y%m%d-%H%M%S)-pre-ref-headers
# 위 diff 적용
sudo nginx -t && sudo nginx -s reload
curl -sI https://ref.dvsharp.com/ | grep -iE 'x-content-type|referrer|strict-transport'
```

검증 실패 시 백업 파일로 되돌리고 `sudo nginx -s reload`.
