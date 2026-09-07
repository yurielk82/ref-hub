import { execFile } from 'node:child_process'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const LIVE_REPO = '/home/ubuntu/GitHub/ref-hub'
const DEPLOY_COMMAND = '/home/ubuntu/GitHub/bin/deploy.sh'
const STATE_PATH = '/home/ubuntu/backups/ci-deploy/ref-hub-trial.json'
const REPOSITORY = 'yurielk82/ref-hub'
const REMOTE_MAIN = 'origin/main'
const GIT_NAME_ONLY = '--name-only'
const NOISE_PATH =
  /(^|\/)\.serena\/|(^|\/)\.claude\/|\.log$|\.tsbuildinfo$|(^|\/)(AGENTS|CLAUDE)(\.local)?\.md$/

async function run(command, args, options = {}) {
  const { stdout = '' } = await execFileAsync(command, args, {
    cwd: LIVE_REPO,
    maxBuffer: 10 * 1024 * 1024,
    ...options,
  })
  return stdout.trim()
}

export function createProductionCommands(execute = run) {
  const changedPaths = async (args) => {
    const output = await execute('git', args)
    return output ? output.split('\n').filter(Boolean) : []
  }
  return {
    fetchOrigin: () => execute('git', ['fetch', '--prune', 'origin', 'main']),
    remoteSha: () => execute('git', ['rev-parse', REMOTE_MAIN]),
    currentBranch: () => execute('git', ['branch', '--show-current']),
    localSha: () => execute('git', ['rev-parse', 'HEAD']),
    listRuns: async (sha) => {
      const json = await execute('gh', [
        'run',
        'list',
        '--repo',
        REPOSITORY,
        '--branch',
        'main',
        '--commit',
        sha,
        '--event',
        'push',
        '--limit',
        '10',
        '--json',
        'databaseId,headSha,headBranch,event,status,conclusion,workflowName,url,createdAt',
      ])
      return JSON.parse(json || '[]')
    },
    buildRelevantDirty: async () => {
      const groups = await Promise.all([
        changedPaths(['diff', GIT_NAME_ONLY, '--', '.']),
        changedPaths(['diff', '--cached', GIT_NAME_ONLY, '--', '.']),
        changedPaths(['ls-files', '--others', '--exclude-standard']),
      ])
      return [...new Set(groups.flat())].filter((file) => !NOISE_PATH.test(file)).sort()
    },
    changedFiles: (localSha, sha) =>
      changedPaths(['diff', GIT_NAME_ONLY, localSha, sha, '--', '.']),
    isAncestor: async (localSha, sha) => {
      try {
        await execute('git', ['merge-base', '--is-ancestor', localSha, sha])
        return true
      } catch (error) {
        if (error?.code === 1) return false
        throw error
      }
    },
    deploy: (sha) =>
      execute(DEPLOY_COMMAND, ['ref-hub', '--no-merge', '--expected-ref', sha], {
        env: { ...process.env, REF_HUB_OFFLINE_CONTENT: '1' },
      }),
    smoke: async (phase, expectedSha) => {
      const artifactDir = `/home/ubuntu/backups/ci-deploy/ref-hub-smoke/${expectedSha}-${phase}`
      await execute('node', ['scripts/production-smoke.mjs'], {
        env: {
          ...process.env,
          SMOKE_ARTIFACT_DIR: artifactDir,
          SMOKE_EXPECTED_SHA: expectedSha,
        },
      })
      return { reportPath: path.join(artifactDir, 'report.json') }
    },
  }
}

export function productionStateStore(filePath = STATE_PATH) {
  return {
    async read() {
      try {
        return JSON.parse(await readFile(filePath, 'utf8'))
      } catch (error) {
        if (error?.code === 'ENOENT') return {}
        throw error
      }
    },
    async write(state) {
      const directory = path.dirname(filePath)
      await mkdir(directory, { recursive: true, mode: 0o700 })
      const temporary = `${filePath}.${process.pid}.${Date.now()}.tmp`
      await writeFile(temporary, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 })
      await rename(temporary, filePath)
    },
  }
}
