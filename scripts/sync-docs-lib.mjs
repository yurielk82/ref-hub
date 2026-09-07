import { cpSync, existsSync, rmSync } from 'node:fs'
import path from 'node:path'

const REQUIRED_SNAPSHOT_FILES = ['index.mdx', '_meta.tsx']

function snapshotIsComplete(root, content) {
  return REQUIRED_SNAPSHOT_FILES.every((file) =>
    existsSync(path.join(root, 'content', content, file)),
  )
}

function verifySnapshot(root, content, logger) {
  if (!snapshotIsComplete(root, content)) {
    throw new Error(`tracked snapshot is incomplete: content/${content}`)
  }
  logger.info(`[sync-docs] snapshot verified: content/${content}`)
}

function copyProjectDocs(root, { repo, content }, logger) {
  const source = path.join(root, 'repos', repo, 'docs', 'manual')
  const destination = path.join(root, 'content', content)
  if (!existsSync(source)) {
    logger.error(`[sync-docs] source missing: ${source}`)
    return false
  }

  try {
    if (existsSync(destination)) rmSync(destination, { recursive: true })
    cpSync(source, destination, { recursive: true })
    logger.info(`[sync-docs] ${repo}/docs/manual/ -> content/${content}/`)
    return true
  } catch (error) {
    logger.error(`[sync-docs] failed: ${repo}: ${error.message}`)
    return false
  }
}

export function syncDocs({ root, projects, offline = false, logger = console }) {
  let synced = 0
  let snapshots = 0
  let failed = 0

  for (const project of projects) {
    if (offline) {
      verifySnapshot(root, project.content, logger)
      snapshots += 1
      continue
    }
    if (copyProjectDocs(root, project, logger)) {
      synced += 1
    } else {
      failed += 1
    }
  }

  if (failed > 0 && synced === 0) {
    throw new Error(`document sync failed for all available projects (${failed})`)
  }

  return { synced, snapshots, failed }
}
