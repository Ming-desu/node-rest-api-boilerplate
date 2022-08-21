import express from 'express';

import AuthController from './AuthController.js';

const Router = express.Router();

Router.get('/', AuthController.login);

export default Router;
