module.exports = {
  apps: [{
    name: 'coreui-server',
    script: 'index.js',
    node_args: '--harmony',
    watch: true,
    ignore_watch : [
      'public',
    ],
    exec_mode: 'fork',
    combine_logs: true,
    env: {
      PORT: 3000,
      NODE_ENV: 'dev',
    },
  }],

};
