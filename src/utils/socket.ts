// import { createServer } from 'https';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { resolve, join } from 'path';
import { readFileSync } from 'fs';
import { onDownloadRepository } from '../controller/deploy/download';

function listeningReporter() {
  const { address, port } = this.address();
  const protocol = this.addContext ? 'https' : 'http';
  console.log(`Listening on ${protocol}://${address}:${port}`);
}

const initSocketServer = (app) => {
  // const { SSL_CERT_DIR } = process.env;
  // console.log(SSL_CERT_DIR);
  // const nginx = resolve(SSL_CERT_DIR);
  // const keyFile = join(nginx, 'jweboy.com.key');
  // const certFile = join(nginx, 'jweboy.com.cer');
  // const options = {
  //   key: readFileSync(keyFile),
  //   cert: readFileSync(certFile),
  // };
  // .listen(5001, 'localhost', listeningReporter);
  const httpServer = createServer(app.callback());
  // const server1 = app.listen(5002, 'localhost', listeningReporter);
  const io = new Server(httpServer, {
    // @ts-ignore
    cors: {
      origin: '*',
    },
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

    socket.on('error', (err) => {
      console.log('[socket error] ', err);
      socket.disconnect();
    });
  });

  io.on('error', (err) => {
    console.log(`socket error: ${err}`);
  });

  return httpServer;
};

export default initSocketServer;
