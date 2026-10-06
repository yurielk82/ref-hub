import { resolveTunnelTarget } from '@/lib/sentry-tunnel'

/** 브라우저 오류 한 건이 이보다 크면 받지 않는다 — 터널을 대용량 업로드 통로로 못 쓰게 한다. */
const MAX_ENVELOPE_BYTES = 1_000_000
/** Glitchtip이 멈춰도 요청이 서버 연결을 붙잡지 않게 한다. */
const FORWARD_TIMEOUT_MS = 5_000

export async function POST(request: Request): Promise<Response> {
  const allowedDsn = process.env.NEXT_PUBLIC_SENTRY_DSN
  if (!allowedDsn) return new Response(null, { status: 204 })

  const envelope = await request.text()
  if (Buffer.byteLength(envelope) > MAX_ENVELOPE_BYTES) {
    return new Response(null, { status: 413 })
  }

  const target = resolveTunnelTarget(envelope, allowedDsn)
  if (!target.ok) return new Response(null, { status: 400 })

  const upstream = await fetch(target.url, {
    method: 'POST',
    body: envelope,
    headers: { 'Content-Type': 'application/x-sentry-envelope' },
    signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
  })
  return new Response(null, { status: upstream.status })
}
