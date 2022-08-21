import http from 'http';
// eslint-disable-next-line no-unused-vars
import https from 'https';

import app from '../../app.js';
import Logger from '../../utils/Logger.js';
import SocketServer from './SocketServer.js';

import { APP_NAME, PORT, USE_SSL, NODE_ENV } from '../../config/env.js';

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      Logger.error(`PORT ${PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      Logger.error(`PORT ${PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

let server;

if (USE_SSL) {
  // const options = {
  //   key: fs.readFileSync(path.resolve(__dirname, '../config/ssl/private.key')),
  //   cert: fs.readFileSync(
  //     path.resolve(__dirname, '../config/ssl/certificate.crt'),
  //   ),
  //   ca: fs.readFileSync(path.resolve(__dirname, '../config/ssl/ca_bundle.crt')),
  // };

  // server = https.createServer(options, app);

  throw new Error('SSL is not yet setup.');
} else {
  server = http.createServer(app);
}

// Setup web sockets along the server
new SocketServer(server); // eslint-disable-line no-new

Logger.info(`${APP_NAME} on ${NODE_ENV} environment`);

server.listen(PORT, () => {
  Logger.info(`Server listening in port ${PORT}`);
});

server.on('error', onError);
