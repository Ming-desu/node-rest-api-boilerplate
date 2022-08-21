import path from 'path';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve(path.dirname(''));
const NODE_ENV = process.env.NODE_ENV || 'development';
const BASE_DIR = path.resolve(__dirname, '../../');

const APP_NAME = process.env.APP_NAME || 'Express API Boilerplate';
const JWT_SECRET = process.env.JWT_SECRET || '';
const BASE_URL = process.env.BASE_URL || '';
const PORT = process.env.PORT || 3000;
const USE_SSL = process.env.USE_SSL || false;
const DB_CONFIG = {
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

    // eslint-disable-next-line no-console
    logging: NODE_ENV === 'development' ? console.log : false,
  },
};

export {
  APP_NAME,
  NODE_ENV,
  BASE_DIR,
  JWT_SECRET,
  BASE_URL,
  PORT,
  USE_SSL,
  DB_CONFIG,
};
