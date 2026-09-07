#!/usr/bin/env node

import { execFile } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

import { runProductionSmoke } from './production-smoke.mjs'

const execFileAsync = promisify(execFile)
const EXACT_SHA = /^[0-9a-f]{40}$/i

async function currentSha() {
  const { stdout } = await execFileAsync('git', ['rev-parse', 'HEAD'])
  return stdout.trim()
}

export async function runDeployAuthedHealth({
  getSha = currentSha,
  smoke = runProductionSmoke,
} = {}) {
  const sha = await getSha()
  if (!EXACT_SHA.test(sha)) throw new Error('deploy health requires an exact live commit SHA')
  const artifactDir = `/home/ubuntu/backups/ci-deploy/ref-hub-smoke/${sha}-deploy-gateway`
  const result = await smoke({ artifactDir, expectedSha: sha })
  if (!result.ok) throw new Error(`Firefox deployment audit failed: ${result.reportPath}`)
  return result
}

async function main() {
  const result = await runDeployAuthedHealth()
  console.log(JSON.stringify({ ok: result.ok, reportPath: result.reportPath }))
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
