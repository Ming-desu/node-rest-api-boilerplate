/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */

const socketio = require('socket.io');
const Logger = require('../../utils/logger');

const { SOCKET_ALLOWED_ORIGINS } = require('../../config/whitelists');

const web_clients = [];

let _io;
let _broadcast;
let _web;

const socketServer = (server) => {
  const io = socketio(server, {
    cors: {
      origin: SOCKET_ALLOWED_ORIGINS,
      credentials: true,
      allowedHeaders: ['id_token'],
    },
  });

  // TODO :: Add redis adapter

  const web = io.of('/web');

  web.use((client, next) => {
    const { id_token } = client.handshake.headers;

    // Disconnect socket if no token found
    if (!id_token) client.disconnect();

    // TODO :: Get user
    next();
  });

  web.on('connection', (client) => {
    web_clients.push(client);

    Logger.info(`${client.socket.id} has connected`);

    client.on('join_room', ({ room_name }) => {
      client.join(room_name);
    });

    client.on('leave_room', ({ room_name }) => {
      client.leave(room_name);
    });

    client.on('disconnect', (reason) => {
      Logger.debug(`${client.socket.id} has disconnected due to ${reason}`);

      // Remove the socket from the collection
      web_clients.splice(web_clients.indexOf(client), 1);
    });
  });

  _io = io;

  _broadcast = (req, res) => {
    io.emit(req.params.event, req.body);
    res.send();
  };

  _web = web;
};

module.exports = {
  io: _io,
  broadcast: _broadcast,
  web: _web,
  socketServer,
};
