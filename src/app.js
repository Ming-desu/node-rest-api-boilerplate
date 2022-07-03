const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

const { NODE_ENV } = require('./config/env');
const { ALLOWED_ORIGINS } = require('./config/whitelists');
const Logger = require('./utils/logger');

const apiRoutes = require('./bin/www/routes');
const models = require('./db/models');

// Use middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    exposedHeaders: ['access_token', 'id_token'],
  }),
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));

// Default route entry
app.get('/', (_req, res) => res.json({ message: 'Welcome to Express API' }));

// Sequelize here..
models.sequelize
  .authenticate()
  .then(() => {
    Logger.info('Connected to the database.');
  })
  .catch((err) => {
    Logger.error('Unable to connect to the database: ', err);
  });

// Load api routes
app.use('/api', apiRoutes);

// Custom error handler
app.use((err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.status || err.statusCode || 500;

  const log = {
    message: err.message,
    status_code: statusCode,
  };

  if (NODE_ENV === 'development') {
    Logger.error(err);
    log.stack = err.stack;
  }

  return res.status(statusCode).json(log);
});

module.exports = app;
