import { cpSync, existsSync, rmSync } from 'node:fs'
import path from 'node:path'

const REQUIRED_SNAPSHOT_FILES = ['index.mdx', '_meta.tsx']

function snapshotIsComplete(root, content) {
  return REQUIRED_SNAPSHOT_FILES.every((file) =>
    existsSync(path.join(root, 'content', content, file)),
  )
}

export function syncDocs({ root, projects, offline = false, logger = console }) {
  let synced = 0
  let snapshots = 0
  let failed = 0

  for (const { repo, content } of projects) {
    const source = path.join(root, 'repos', repo, 'docs', 'manual')
    const destination = path.join(root, 'content', content)

    if (offline) {
      if (!snapshotIsComplete(root, content)) {
        throw new Error(`tracked snapshot is incomplete: content/${content}`)
      }
      snapshots += 1
      logger.info(`[sync-docs] snapshot verified: content/${content}`)
      continue
    }

    if (!existsSync(source)) {
      logger.error(`[sync-docs] source missing: ${source}`)
      failed += 1
      continue
    }

    try {
      if (existsSync(destination)) {
        rmSync(destination, { recursive: true })
      }
      cpSync(source, destination, { recursive: true })
      synced += 1
      logger.info(`[sync-docs] ${repo}/docs/manual/ -> content/${content}/`)
    } catch (error) {
      logger.error(`[sync-docs] failed: ${repo}: ${error.message}`)
      failed += 1
    }
  }

  if (failed > 0 && synced === 0) {
    throw new Error(`document sync failed for all available projects (${failed})`)
  }

  return { synced, snapshots, failed }
}
