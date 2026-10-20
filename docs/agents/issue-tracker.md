# 이슈 추적기: GitHub

이 저장소의 이슈·명세는 GitHub 이슈(`yurielk82/ref-hub`)에 둔다. 모든 작업은 `gh`로 한다. Matt 스킬(`to-spec`·`to-tickets`·`triage`·`wayfinder`·`implement-spec`)이 이 파일을 읽는다(설정: `setup-matt-pocock-skills`, 2026-10-20).

- 이슈를 올리는 일은 요청 범위 안에서만 한다(global-rules `references/skills.md`: 제품에 이슈 체계를 일괄 생성하지 않는다).

## 명령

- **만들기**: `gh issue create --title "..." --body "..."`. 여러 줄 본문은 heredoc.
- **읽기**: `gh issue view <번호> --json number,title,body,labels,comments`
- **목록**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'`에 `--label`·`--state`를 더한다.
- **하위 이슈**: `gh issue create --parent <부모> ...` 또는 `gh issue edit <부모> --add-sub-issue <자식>`(gh 2.94+). 옛 gh는 `gh api --method POST repos/yurielk82/ref-hub/issues/<부모>/sub_issues -F sub_issue_id=<자식 database id>`. 하위 이슈를 못 쓰면 자식 본문 첫 줄에 `Part of #<부모>`.
- **댓글**: `gh issue comment <번호> --body "..."`
- **라벨**: `gh issue edit <번호> --add-label "..."` / `--remove-label "..."`
- **닫기**: `gh issue close <번호> --comment "..."`

## PR을 요청 창구로 쓰는가

**PRs as a request surface: no.** _(외부 PR을 기능 요청으로 다루려면 `yes`. `/triage`가 이 표시를 읽는다.)_

GitHub는 이슈와 PR이 번호를 함께 쓴다. `#42`는 `gh pr view 42`로 먼저 찾고 없으면 `gh issue view 42`.

## 스킬이 "이슈 추적기에 올려라"라고 하면

GitHub 이슈를 만든다.

## 스킬이 "관련 티켓을 가져와라"라고 하면

위 **읽기**로 읽는다.

## 길찾기(`/wayfinder`)

- **지도**: `wayfinder:map` 라벨 이슈 하나(Notes / Decisions-so-far / Fog 본문). `gh issue create --label wayfinder:map`.
- **자식 티켓**: 지도의 하위 이슈. 라벨 `wayfinder:<research|prototype|grilling|task>`. 맡으면 담당자를 건다.
- **막힘**: GitHub 이슈 의존성. `gh api --method POST repos/yurielk82/ref-hub/issues/<자식>/dependencies/blocked_by -F issue_id=<막는 이슈 database id>`(`gh api repos/yurielk82/ref-hub/issues/<n> --jq .id`, `#번호`가 아니다). 못 쓰면 자식 본문 첫 줄 `Blocked by: #<n>`. 막는 이슈가 모두 닫히면 풀린다.
- **다음 할 일**: 지도의 열린 자식 중 열린 막힘·담당자가 없는 첫 이슈.
- **맡기**: `gh issue edit <n> --add-assignee @me`(세션의 첫 쓰기).
- **끝내기**: `gh issue comment <n> --body "<답>"` → `gh issue close <n>` → 지도 Decisions-so-far에 요지·링크를 붙인다.
