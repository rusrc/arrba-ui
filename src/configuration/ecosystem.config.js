// Original
module.exports = {
  apps : [{
    name: 'arrba-ui',
    script: '/home/kursoft/source/arrba-ui/server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 5, // 'max'
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    log_file: '/var/log/arrba-ui.log.log',
    out_file: '/var/log/arrba-ui.out.log',
    error_file: '/var/log/arrba-ui.error.log',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  /*deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }*/

};
