const { Request, Response } = require('express');

/**
 * Handles the route logic for logging in the user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {void}
 */
const login = async (req, res, next) => {
  try {
    res.json({
      message: 'Ok',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
