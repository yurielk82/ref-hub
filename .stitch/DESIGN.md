# Ref Hub Design System

## Stitch Project
- **Project ID**: `3277922028374730429`
- **Design System Asset**: `assets/15183638988711012922`

## Screens

| Screen | ID | File |
|--------|-----|------|
| 메인 (Light) | `f5689b77` | `main-page-screenshot.png` / `main-page.html` |
| 메인 (Dark) | `2b500466` | `dark-mode.png` / `dark-mode.html` |
| 메인 + Experience | `9fe66e86` | `main-with-experience.png` / `main-with-experience.html` |
| 프로젝트 상세 | `578f97ce` | `project-detail.png` / `project-detail.html` |

## Concept
개발자 포트폴리오 사이트. Warm editorial 톤 — AI 패턴을 탈피한 절제된 레이아웃.
제약·물류·라이브커머스 도메인 프로젝트 8개를 소개하는 포털.

## Color Palette

| Role | Light | Dark | Usage |
|------|-------|------|-------|
| Primary Teal | `#2a7c6f` | `#5ec4b2` | 액센트 바, 링크, CTA 호버, 태그 배경 |
| Warm Sand | `#d4a574` | `#d4a574` | 보조 하이라이트, 섹션 구분 |
| Neutral (Text) | `#1c1917` (stone-900) | `#fafaf9` (stone-100) | 제목, 본문 |
| Sub-text | `#78716c` (stone-500) | `#a8a29e` (stone-400) | 부제, 날짜, 소속 |
| Background | `#fafaf9` (stone-50) | `#0c0a09` (stone-950) | 페이지 배경 |
| Surface | `#ffffff` | `#1c1917` | 카드 배경 |

## Typography

| Level | Font | Size | Weight |
|-------|------|------|--------|
| Hero Headline | Space Grotesk / Outfit | 4xl-6xl | Bold |
| Section Label | Monospace | xs | Normal, uppercase tracking-widest |
| Section Title | Space Grotesk | 2xl | Bold |
| Card Title | Inter | lg | Bold |
| Body | Inter | base | Normal, leading-relaxed |
| Byline | Inter | sm | Normal |

## Card Style (Glass Card)

- `background`: white (light) / stone-900 (dark)
- `border`: 1px solid rgba(28,25,23,0.08)
- `box-shadow`: 0 1px 3px rgba(28,25,23,0.04)
- `border-radius`: 12px
- `padding`: 24px
- **Hover**: translateY(-1px), shadow 강화, border-color accent

## Layout

- `max-width`: 1024px (5xl), centered
- Text alignment: left (hero, body) — 중앙 정렬 최소화
- Grid: 2열 desktop, 1열 mobile
- Section spacing: pt-24~32 pb-20~28

## Assets

- Screenshot: `.stitch/designs/main-page-screenshot.png`
- HTML: `.stitch/designs/main-page.html`
