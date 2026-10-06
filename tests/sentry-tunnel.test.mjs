import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { ROOT } from './helpers.mjs'

const ALLOWED_DSN = 'http://publickey@localhost:8000/10'

function envelopeFor(dsn) {
  return `${JSON.stringify({ dsn, sent_at: '2026-10-07T00:00:00Z' })}\n{"type":"event"}\n{}`
}

async function loadTunnel() {
  return import(path.join(ROOT, 'lib', 'sentry-tunnel.ts'))
}

test('브라우저 오류 봉투를 우리 Glitchtip 프로젝트 주소로만 넘긴다', async () => {
  const { resolveTunnelTarget } = await loadTunnel()
  const decision = resolveTunnelTarget(envelopeFor(ALLOWED_DSN), ALLOWED_DSN)
  // Glitchtip은 봉투 머리 줄의 DSN만으로는 인증하지 않아 sentry_key가 없으면 403을 낸다(2026-10-07 실측)
  assert.deepEqual(decision, {
    ok: true,
    url: 'http://localhost:8000/api/10/envelope/?sentry_key=publickey',
  })
})

test('다른 호스트·프로젝트·키를 적은 봉투는 넘기지 않는다', async () => {
  const { resolveTunnelTarget } = await loadTunnel()
  for (const dsn of [
    'https://publickey@evil.example.com/10',
    'http://publickey@localhost:8000/11',
    'http://otherkey@localhost:8000/10',
  ]) {
    assert.deepEqual(resolveTunnelTarget(envelopeFor(dsn), ALLOWED_DSN), {
      ok: false,
      reason: 'dsn-mismatch',
    })
  }
})

test('머리 줄이 깨진 봉투는 넘기지 않는다', async () => {
  const { resolveTunnelTarget } = await loadTunnel()
  for (const body of ['', 'not json\n{}', '{"sent_at":"x"}\n{}', '{"dsn":"::"}\n{}']) {
    assert.deepEqual(resolveTunnelTarget(body, ALLOWED_DSN), { ok: false, reason: 'bad-envelope' })
  }
})

test('브라우저 Sentry는 같은 사이트 터널 경로로 보낸다', () => {
  const client = readFileSync(path.join(ROOT, 'sentry.client.config.ts'), 'utf8')
  const route = path.join(ROOT, 'app', 'api', 'monitoring', 'route.ts')
  assert.match(
    client,
    /tunnel:\s*'\/api\/monitoring'/,
    'client must tunnel through /api/monitoring',
  )
  assert.ok(existsSync(route), 'missing tunnel route: app/api/monitoring/route.ts')
  const source = readFileSync(route, 'utf8')
  assert.match(source, /resolveTunnelTarget/, 'route must validate the envelope DSN')
  assert.match(source, /AbortSignal\.timeout/, 'route must bound the upstream call')
})
