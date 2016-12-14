module.exports = {
  servers: {
    prod: {
      host: 'yoda.gat',
      username: 'ubuntu',
       pem: '/Users/lhenrique/Downloads/yoda.pem',
      //password:
      // or leave blank for authenticate from ssh-agent
    },

  },

  meteor: {
    name: 'vagas',
    path: '../',
    servers: {
      prod: {}
    },
    buildOptions: {
      serverOnly: true,
      debug: true,
    },
    env: {
      ROOT_URL: 'https://vagas.tagplus.com.br',
      MONGO_URL: 'mongodb://localhost/vagas'
    },
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      prod: {}
    },
  },
};
