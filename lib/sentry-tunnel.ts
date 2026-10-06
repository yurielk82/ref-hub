/**
 * 브라우저 Sentry 봉투(envelope)를 같은 사이트 경로로 받아, 서버에서만 닿는 Glitchtip으로 넘길 주소를 정한다.
 * Glitchtip은 서버 루프백(127.0.0.1:8000)에만 열려 있어 방문자 브라우저가 직접 보낼 수 없다.
 * 봉투 머리 줄의 DSN이 우리 프로젝트와 정확히 같을 때만 넘긴다 — 아무 주소로나 보내는 중계기가 되지 않게 한다.
 */
export type TunnelDecision =
  | { readonly ok: true; readonly url: string }
  | { readonly ok: false; readonly reason: 'bad-envelope' | 'dsn-mismatch' }

function projectIdOf(dsn: URL): string {
  return dsn.pathname.replace(/^\/+|\/+$/g, '')
}

function readEnvelopeDsn(envelope: string): URL | null {
  const header = envelope.split('\n', 1)[0] ?? ''
  try {
    const parsed: unknown = JSON.parse(header)
    const dsn = (parsed as { dsn?: unknown } | null)?.dsn
    return typeof dsn === 'string' && URL.canParse(dsn) ? new URL(dsn) : null
  } catch (error) {
    if (error instanceof SyntaxError) return null
    throw error
  }
}

export function resolveTunnelTarget(envelope: string, allowedDsn: string): TunnelDecision {
  const dsn = readEnvelopeDsn(envelope)
  if (dsn === null) return { ok: false, reason: 'bad-envelope' }

  const allowed = new URL(allowedDsn)
  const projectId = projectIdOf(dsn)
  const sameProject =
    dsn.protocol === allowed.protocol &&
    dsn.host === allowed.host &&
    dsn.username === allowed.username &&
    projectId === projectIdOf(allowed)
  if (!sameProject) return { ok: false, reason: 'dsn-mismatch' }

  // Glitchtip은 봉투 머리 줄의 DSN만으로 인증하지 않아 공개 키를 쿼리로 함께 보낸다.
  const url = new URL(`/api/${projectId}/envelope/`, `${allowed.protocol}//${allowed.host}`)
  url.searchParams.set('sentry_key', allowed.username)
  return { ok: true, url: url.toString() }
}
