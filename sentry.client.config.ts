// Sentry client config — Next.js (App Router, Next 15+)
// 활성화: npm i @sentry/nextjs && next.config wrap (withSentryConfig)
// DSN: process.env.NEXT_PUBLIC_SENTRY_DSN — Glitchtip 또는 Sentry SaaS

import * as Sentry from '@sentry/nextjs';

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NEXT_PUBLIC_ENV || 'production',
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.0,
    replaysOnErrorSampleRate: 1.0,
    // 의료/약품 도메인 — PII 자동 스크럽
    sendDefaultPii: false,
  });
}
