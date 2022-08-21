import { Sequelize } from 'sequelize';

import { DB_CONFIG, NODE_ENV } from '../config/env.js';

const { database, username, password, options } = DB_CONFIG;

if ([database, username, options.host, options.port].some((x) => !x)) {
  throw new Error(`Please setup variables for ${NODE_ENV} environment.`);
}

const connection = new Sequelize(database, username, password, options);

export default connection;
