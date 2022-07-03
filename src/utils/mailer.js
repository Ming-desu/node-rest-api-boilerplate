const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const Logger = require('./logger');

const { OAuth2 } = google.auth;

const { GMAIL_CONFIG } = require('../config/env');

const { email, oauth, refresh_token } = GMAIL_CONFIG;

const { client_id, client_secret } = oauth;

const client = new OAuth2(
  client_id,
  client_secret,
  'https://developers.google.com/oauthplayground',
);

client.setCredentials({ refresh_token });

/**
 * A helper function that sends email through nodemailer and gmail api
 *
 * @param {string} recipient
 * @param {object} data
 * @returns {boolean}
 */
exports.send = async (recipient, data = {}) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = await client.getAccessToken();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: email,
          clientId: client_id,
          clientSecret: client_secret,
          accessToken,
          refreshToken: refresh_token,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      await transporter.sendMail({
        from: `${email}`,
        to: recipient,
        ...data,
      });

      transporter.close();

      Logger.info(`Successfully sent email [${data.subject}] to ${recipient}.`);
      resolve(`Successfully sent email [${data.subject}] to ${recipient}.`);
    } catch (err) {
      Logger.error('An error occured while trying to send the email.', err);
      reject(err);
    }
  });
};
