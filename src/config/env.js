const dotenv = require('dotenv');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const BASE_DIR = path.resolve(__dirname, '../../');

dotenv.config({
  path: path.resolve(
    BASE_DIR,
    `.env${NODE_ENV !== 'production' ? `.${NODE_ENV}` : ''}`,
  ),
});

module.exports = {
  APP_NAME: process.env.APP_NAME || 'Express API Boilerplate',
  NODE_ENV,
  BASE_DIR,
  PORT: process.env.PORT || 3000,
  USE_SSL: process.env.USE_SSL || false,
  DB_CONFIG: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    options: {
      dialect: 'mysql',
      define: {
        freezeTableName: true,
        underscored: true,
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      // eslint-disable-next-line
      logging: NODE_ENV === 'development' ? console.log : false,
    },
  },
  GMAIL_CONFIG: {
    email: process.env.GMAIL_USERNAME,
    password: process.env.GMAIL_PASSWORD,
    oauth: {
      client_id: process.env.GMAIL_OAUTH_CLIENT_ID,
      client_secret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
    },
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  },
};
