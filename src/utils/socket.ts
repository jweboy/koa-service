import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { onDownloadRepository } from '../controller/deploy/download';

const initSocketServer = (app) => {
  const httpServer = createServer(app.callback());
  const io = new Server(httpServer, {
    // cors: {
    //   origin: '*',
    //   methods: ['GET', 'POST'],
    // },
  });

  io.on('connection', (socket: Socket) => {
    console.log('socket connection is ok');
    socket.on('publishData', async (data) => {
      console.log('get=>', data);
      await onDownloadRepository(data, socket);
    });

    socket.on('unpublish', () => {
      socket.offAny();
    });
  });

  io.on('error', (err) => {
    console.log(`socket error: ${err}`);
  });

  return httpServer;
};

export default initSocketServer;
