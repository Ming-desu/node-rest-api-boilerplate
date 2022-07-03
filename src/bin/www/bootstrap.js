const http = require('http');

// eslint-disable-next-line
const https = require('https');
const Logger = require('../../utils/logger');

const app = require('../../app');
const { socketServer } = require('./sockets');

const { APP_NAME, PORT, USE_SSL } = require('../../config/env');

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      Logger.error(`Port ${PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      Logger.error(`Port ${PORT} is already in use`);
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

// Setup socket io along the server
socketServer(server);

Logger.info(`${APP_NAME} on ${global.ENV} environment`);

server.listen(PORT, () => {
  Logger.info(`Server listening in port ${PORT}`);
  process.send = process.send || (() => {});
  process.send('ready');
});

server.on('error', onError);
