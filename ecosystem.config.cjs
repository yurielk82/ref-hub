module.exports = {
  apps: [
    {
      name: 'ref-hub',
      script: '.next/standalone/server.js',
      cwd: '/home/ubuntu/GitHub/ref-hub',
      env: {
        NODE_ENV: 'production',
        PORT: 3007,
        HOSTNAME: '127.0.0.1',
      },
      version: '1.4.0',
    },
  ],
}
