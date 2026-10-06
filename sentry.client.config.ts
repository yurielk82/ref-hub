// Sentry client config — Next.js (App Router, Next 15+)
// 활성화: npm i @sentry/nextjs && next.config wrap (withSentryConfig)
// DSN: process.env.NEXT_PUBLIC_SENTRY_DSN — Glitchtip 또는 Sentry SaaS

import * as Sentry from '@sentry/nextjs'

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

if (dsn) {
  Sentry.init({
    dsn,
    // Glitchtip은 서버 루프백에만 열려 있어 브라우저는 같은 사이트 터널로 보낸다 (app/api/monitoring/route.ts)
    tunnel: '/api/monitoring',
    environment: process.env.NEXT_PUBLIC_ENV || 'production',
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.0,
    replaysOnErrorSampleRate: 1.0,
    // 의료/약품 도메인 — PII 자동 스크럽
    sendDefaultPii: false,
  })
}
