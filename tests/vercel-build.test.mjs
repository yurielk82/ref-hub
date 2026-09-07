import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const configUrl = new URL('../vercel.json', import.meta.url)

test('should_use_committed_document_snapshots_when_Vercel_cannot_fetch_private_submodules', async () => {
  const config = JSON.parse(await readFile(configUrl, 'utf8'))

  assert.equal(config.buildCommand, 'REF_HUB_OFFLINE_CONTENT=1 npm run build')
})
