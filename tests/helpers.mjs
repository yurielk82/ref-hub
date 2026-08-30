import path from 'node:path'
import { readFileSync } from 'node:fs'

export const ROOT = path.resolve(import.meta.dirname, '..')

// PROJECTS is assembled in data/projects.ts from these cohesive registry
// modules; read them together so text-based assertions see every project block.
const PROJECT_REGISTRY_FILES = [
  path.join(ROOT, 'data', 'projects', 'delivery.ts'),
  path.join(ROOT, 'data', 'projects', 'tooling.ts'),
]

export function readProjectData() {
  return PROJECT_REGISTRY_FILES.map((file) => readFileSync(file, 'utf8')).join('\n')
}

// AX_CASE_STUDIES is assembled in data/ax.ts from these registry modules; read
// them in render order so text-based assertions see every case block.
const AX_REGISTRY_FILES = [
  path.join(ROOT, 'data', 'ax-cases', 'delivery.ts'),
  path.join(ROOT, 'data', 'ax-cases', 'tooling.ts'),
]

export function readAxData() {
  return AX_REGISTRY_FILES.map((file) => readFileSync(file, 'utf8')).join('\n')
}

export function readSource(...segments) {
  return readFileSync(path.join(ROOT, ...segments), 'utf8')
}
