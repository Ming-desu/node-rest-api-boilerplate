import express from 'express';

import ResponseHandler from '../../utils/ResponseHandler.js';

const { Request, Response } = express;

class AuthController {
  /**
   * Handles login operation
   *
   * @param {Request} _req
   * @param {Response} res
   * @param {Function} next
   * @returns {Promise<void>}
   */
  async login(_req, res, next) {
    try {
      ResponseHandler.success(res, null, 'Welcome bish!');
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
