import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { onDownloadRepository } from '../controller/deploy/download';

const initSocketServer = (app) => {
  const httpServer = createServer(app.callback());
  const io = new Server(httpServer, {
    // @ts-ignore
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('socket connection is ok');
    socket.on('deploy project', async (data) => {
      // called for each packet received
      // const [eventName, payload] = data;
      // console.log(data);
      // socket.emit('news', { hello: 'world' });
      await onDownloadRepository(socket);
    });
  });

  io.on('error', (err) => {
    console.log(`socket error: ${err}`);
  });

  return httpServer;
};

export default initSocketServer;
