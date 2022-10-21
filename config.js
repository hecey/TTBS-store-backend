require('dotenv/config');

const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
    },
    listPerPage: 9,
    multipleStatements: false
  };
  module.exports = config;