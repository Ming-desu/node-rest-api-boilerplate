const express = require('express');

const Router = express.Router();

const ApiClientError = require('../../utils/ApiClientError');
const authRoute = require('../../api/auth/auth.route');

Router.use('/auth', authRoute);

Router.all('*', (_req, _res, next) => {
  next(new ApiClientError('Resource does not exists.'));
});

module.exports = Router;
