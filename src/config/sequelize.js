const { DB_CONFIG } = require('./env');

const { host, port, database, username, password } = DB_CONFIG;

if ([host, port, database, username].some((x) => !x)) {
  throw new Error('Setup database environment variables.');
}

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    port,
    dialect: 'mysql',
  },
  test: {
    username,
    password,
    database,
    host,
    port,
    dialect: 'mysql',
  },
  production: {
    username,
    password,
    database,
    host,
    port,
    dialect: 'mysql',
  },
};
