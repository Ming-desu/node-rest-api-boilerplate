import express from 'express';

import Logger from './Logger.js';
import ApiClientError from './ApiClientError.js';

import { NODE_ENV } from '../config/env.js';

/**
 * Custom Error Handler for Express
 *
 * @param {ApiClientError} err
 * @param {express.Request} _req
 * @param {express.Response} res
 * @param {Function} next
 * @returns {*}
 * @class
 */
function ErrorHandler(err, _req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.status || 500;

  const log = {
    message: err.message,
    status_code: statusCode,
  };

  if (NODE_ENV === 'development') {
    Logger.error(err);
    log.stack = err.stack;
  }

  return res.status(statusCode).json(log);
}

export default ErrorHandler;
