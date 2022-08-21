import { DB_CONFIG } from './env';

const { host, port, database, username, password } = DB_CONFIG;

if ([host, port, database, username].some((x) => !x)) {
  throw new Error('Setup database environment variables.');
}

const config = {
  username,
  password,
  database,
  host,
  port,
  dialect: 'mysql',
};

const development = { ...config };
const test = { ...config };
const production = { ...config };

export { development, test, production };
