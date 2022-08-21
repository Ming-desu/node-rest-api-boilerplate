import { Server } from 'socket.io';

import Logger from '../../utils/Logger.js';

import { SOCKET_ALLOWED_ORIGINS } from '../../config/cors_whitelists.js';

class SocketServer {
  constructor(server) {
    const io = new Server(server, {
      cors: {
        origin: SOCKET_ALLOWED_ORIGINS,
        credentials: true,
        allowedHeaders: ['Token'],
      },
    });

    this.clients = [];

    const web = io.of('/web');

    web.use((socket, next) => {
      const { Token } = socket.handshake.headers;

      // Disconnect the socket if token not found
      if (!Token) return socket.disconnect();

      // TO-OD :: Get user
      return next();
    });

    web.on('connection', (socket) => {
      this.clients.push(socket);

      Logger.info(`${socket.id} has connected.`);

      socket.on('disconnect', (reason) => {
        Logger.info(`${socket.id} has disconnected due to ${reason}.`);

        // Remove the socket from the collection
        this.clients = [
          ...this.clients.splice(0, this.clients.indexOf(socket)),
          ...this.clients.splice(
            this.clients.indexOf(socket) + 1,
            this.clients.length,
          ),
        ];
      });
    });

    this.web = web;
  }
}

export default SocketServer;
