module.exports = {
  servers: {
    prod: {
      host: '127.0.0.1',
      username: 'ubuntu'
      // pem:
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
      MONGO_URL: 'mongodb://<user>:<password>@<server>/<database>'
    },

    //dockerImage: 'kadirahq/meteord'
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
