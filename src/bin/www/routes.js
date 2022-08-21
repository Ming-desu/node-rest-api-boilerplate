import express from 'express';

import ApiClientError from '../../utils/ApiClientError.js';

// API Routes
import AuthRouter from '../../api/auth/AuthRouter.js';

const Router = express.Router();

Router.use('/auth', AuthRouter);

Router.all('*', (_req, _res, next) => {
  next(new ApiClientError('Resource does not exists', 500));
});

export default Router;
