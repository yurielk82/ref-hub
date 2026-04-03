# ref-hub 포트폴리오 고도화 계획

## 요약

ref-hub을 Nextra 기술 문서 포털에서 **개인 개발자 포트폴리오 + 문서 통합 사이트**로 전환한다.
미니멀 쇼케이스 랜딩 + 프로젝트 상세 + 기존 문서 유지.

## 요구사항

- **대상**: 개인 개발자 포트폴리오
- **랜딩**: 미니멀 — 이름 + 한 줄 소개 → 프로젝트 카드 그리드
- **프로젝트 상세**: 대형 스크린샷 + 설명 + 기술 스택 + 라이브/문서 링크
- **문서**: 기존 6개 프로젝트 MDX 문서 URL 유지
- **스크린샷**: 라이브 사이트에서 Playwright 캡처
- **다크모드**: 필수

## 아키텍처

### 현재 구조

```
app/
├── layout.tsx              ← Nextra 테마 (사이드바, 네비, 푸터)
└── [[...mdxPath]]/
    └── page.tsx            ← Nextra 캐치올 (모든 content/ 매핑)
```

### 변경 후 구조 — Route Groups

```
app/
├── layout.tsx              ← 루트: html, body, 폰트, ThemeProvider
├── (portfolio)/
│   ├── layout.tsx          ← 포트폴리오: 미니멀 네비 + 푸터
│   ├── page.tsx            ← 랜딩: 히어로 + 프로젝트 그리드
│   └── projects/
│       └── [slug]/
│           └── page.tsx    ← 프로젝트 상세
└── (docs)/
    ├── layout.tsx          ← Nextra: 사이드바, 검색, 브레드크럼
    └── [[...mdxPath]]/
        └── page.tsx        ← 기존 문서 라우트 유지
```

**핵심 결정**: Route Groups로 포트폴리오와 문서의 레이아웃을 분리한다.
- `(portfolio)` — Tailwind + shadcn/ui 커스텀 디자인
- `(docs)` — 기존 Nextra 테마 유지
- URL 변경 없음: `/csoweb/user-guide/...` 그대로 동작

### 새 파일 구조

```
components/
├── portfolio/
│   ├── hero.tsx            ← 히어로 섹션 (이름 + 소개)
│   ├── project-card.tsx    ← 프로젝트 카드 컴포넌트
│   ├── project-grid.tsx    ← 카드 그리드 레이아웃
│   ├── project-detail.tsx  ← 상세 페이지 콘텐츠
│   ├── tech-badge.tsx      ← 기술 스택 뱃지
│   ├── nav.tsx             ← 포트폴리오 네비게이션
│   └── footer.tsx          ← 포트폴리오 푸터
└── ui/                     ← shadcn/ui 컴포넌트

data/
└── projects.ts             ← 프로젝트 메타데이터 (6개)

scripts/
└── capture-screenshots.mjs ← Playwright 스크린샷 캡처 스크립트

public/images/portfolio/    ← 캡처된 스크린샷
```

### 프로젝트 데이터 구조

```typescript
interface Project {
  slug: string
  name: string
  tagline: string           // 카드용 한 줄
  description: string       // 상세 페이지용 2-3줄
  tech: string[]            // ['Next.js 16', 'Prisma', 'Supabase']
  category: 'web' | 'mobile' | 'api' | 'tool'
  liveUrl?: string
  docsPath?: string         // '/pharmkpi/user-guide'
  screenshots: {
    hero: string            // 메인 스크린샷 경로
    gallery?: string[]      // 추가 스크린샷
  }
  features: string[]
  highlight?: string        // 핵심 기술적 성과 1줄
}
```

## 구현 단계

### Phase 1: 인프라 전환

1. Tailwind CSS v4 + PostCSS 설치 및 설정
2. shadcn/ui 초기화 (Card, Badge, Button, Separator, ThemeToggle)
3. `app/layout.tsx` → 루트 레이아웃으로 축소 (html/body/폰트/ThemeProvider)
4. 기존 Nextra 레이아웃 → `app/(docs)/layout.tsx`로 이동
5. 기존 Nextra 캐치올 → `app/(docs)/[[...mdxPath]]/page.tsx`로 이동
6. `app/(portfolio)/layout.tsx` 생성 (미니멀 네비 + 푸터)
7. `content/index.mdx` 제거 (포트폴리오 랜딩으로 대체)
8. **검증**: 기존 문서 URL(`/csoweb/user-guide/dashboard` 등) 정상 접근 확인

### Phase 2: 포트폴리오 랜딩

1. `data/projects.ts` — 6개 프로젝트 메타데이터 작성
2. `components/portfolio/hero.tsx` — 이름 + 직함 + 한 줄 소개 + GitHub 링크
3. `components/portfolio/tech-badge.tsx` — 기술 스택 뱃지
4. `components/portfolio/project-card.tsx` — 스크린샷 + 이름 + 태그 + 설명
5. `components/portfolio/project-grid.tsx` — 반응형 그리드 (2열 데스크톱, 1열 모바일)
6. `app/(portfolio)/page.tsx` — 랜딩 페이지 조립
7. **디자인**: 다크 배경 기본, 미니멀, 카드에 hover 효과

### Phase 3: 프로젝트 상세 페이지

1. `components/portfolio/project-detail.tsx` — 상세 콘텐츠 컴포넌트
2. `app/(portfolio)/projects/[slug]/page.tsx` — 동적 라우트
3. **구성**: 히어로 스크린샷 → 설명 → 기술 스택 → 주요 기능 → 라이브 데모 + 문서 링크
4. `generateStaticParams`로 빌드 타임 생성
5. `generateMetadata`로 SEO 메타 태그

### Phase 4: 스크린샷 캡처

1. `scripts/capture-screenshots.mjs` 작성 (Playwright)
2. 캡처 대상 5개 사이트:
   - `kpi.dvsharp.com` (PharmKPI)
   - `cso.dvsharp.com` (CSO Web)
   - `erp-spec.dvsharp.com` (ERP Spec)
   - KPIS-DSR-API (Vercel URL)
   - `ev-motor-reliability.vercel.app` (EV Motor)
3. 뷰포트: 1280×800 (데스크톱), 라이트/다크 모드
4. 저장: `public/images/portfolio/{slug}/hero.png`
5. StudioGo: 모바일 앱이므로 스크린샷 대신 앱 아이콘/목업 또는 제외
6. CoreRx: 내부 Superset이므로 접근 가능 여부에 따라 결정

### Phase 5: 마무리

1. 다크/라이트 모드 토글 (portfolio 영역)
2. 반응형 검증 (375px 모바일 ~ 1440px 데스크톱)
3. 포트폴리오 ↔ 문서 간 네비게이션 링크
4. OG 이미지 메타 태그
5. Vercel 배포 확인

## 리스크 및 대응

| 리스크 | 영향 | 대응 |
|--------|------|------|
| Nextra v4가 Route Group에서 동작 불가 | 문서 기능 깨짐 | **대안**: Nextra를 `/docs/` 하위 경로로 이동하거나 fumadocs로 교체 |
| Tailwind preflight가 Nextra 스타일 깨뜨림 | 문서 레이아웃 깨짐 | Tailwind preflight를 `(portfolio)` 스코프로 제한 |
| 인증 필요 사이트 스크린샷 불가 | 일부 프로젝트 스크린샷 누락 | 로그인 페이지 또는 공개 페이지 캡처, 또는 기존 문서 이미지 활용 |
| withNextra() 빌드 설정 충돌 | 빌드 실패 | next.config.mjs에서 Nextra 설정을 (docs) 경로에만 적용되도록 조정 |

## 수용 기준

- [ ] `/` → 포트폴리오 랜딩 표시 (히어로 + 프로젝트 카드 6개)
- [ ] `/projects/{slug}` → 프로젝트 상세 (스크린샷 + 설명 + 기술 스택)
- [ ] `/csoweb/user-guide/dashboard` → 기존 문서 정상 표시 (URL 변경 없음)
- [ ] 다크/라이트 모드 동작
- [ ] 모바일 반응형 (375px 깨짐 없음)
- [ ] 최소 4개 프로젝트 실제 스크린샷 포함
- [ ] Vercel 빌드 성공 + 배포 정상
- [ ] 라이트하우스 Performance 80+

## 검증

1. 빌드 성공 (`npm run build` exit 0)
2. 기존 문서 URL 전수 접근 테스트 (6개 프로젝트 × 주요 페이지)
3. 포트폴리오 랜딩 라이트/다크 모드 스크린샷
4. 모바일 뷰포트 스크린샷
5. Vercel Preview 배포 확인
