import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';

// eslint-disable-next-line no-unused-vars
import env from './config/index.js';
// import db from './db/index.js';
import apiRoutes from './bin/www/routes.js';
import ErrorHandler from './utils/ErrorHandler.js';

import { APP_NAME } from './config/env.js';
import { ALLOWED_ORIGINS } from './config/cors_whitelists.js';

const app = express();

app.set('json spaces', 2);

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
    exposedHeaders: ['AccessToken', 'Token'],
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));

// Default route entry;
app.get('/', (_req, res) => {
  return res.json({
    message: `Welcome to ${APP_NAME} API.`,
  });
});

// Sequelize here..
// db.sequelize
//   .authenticate()
//   .then(() => {
//     Logger.info('Connected to the database.');
//   })
//   .catch((err) => {
//     Logger.error('Unable to connect to the database: ', err);
//   });

// Load API Routes
app.use('/api', apiRoutes);

// Custom error handler
app.use(ErrorHandler);

export default app;
