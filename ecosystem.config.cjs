module.exports = {
  apps: [
    {
      name: 'ref-hub',
      namespace: 'ref-hub',
      script: '.next/standalone/server.js',
      cwd: '/home/ubuntu/GitHub/ref-hub',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3007,
        HOSTNAME: '127.0.0.1',
      },
      version: '1.4.0',
      // max_memory_restart 제거 (peak 기반 근거 없이 추측 값 금지). OOM 방어는 swap.
      autorestart: true,
      kill_timeout: 10000,
      max_restarts: 10,
      min_uptime: '30s',
      exp_backoff_restart_delay: 2000,
    },
  ],
}
