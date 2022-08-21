import express from 'express';

const { Response } = express;

class ResponseHandler {
  /**
   * Success Response Handler
   *
   * @param {Response} res
   * @param {*} data
   * @param {string} message
   * @param {number} statusCode
   * @returns {Response}
   */
  success(res, data, message, statusCode = 200) {
    return res.status(statusCode).json({
      data,
      message,
      status_code: statusCode,
    });
  }
}

export default new ResponseHandler();
