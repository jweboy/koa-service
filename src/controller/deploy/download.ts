import { Socket } from 'socket.io';
import { resolve } from 'path';
import { spawnAsync } from '../../utils/process';

// const copyFilesAsync = async (socket: Socket): Promise<void> => {
//   const files = resolve('cloud_backend/dist');
//   const task = spawn('scp', ['-r', '-C', files, 'root@121.43.178.172:/usr/share/nginx/html/test']);

//   return new Promise((resolve, reject) => {
//     // exec(`scp -r -C ${files} root@121.43.178.172:/usr/share/nginx/html/test`, (error, stdout, stderr) => {
//     //   if (error) {
//     //     console.error(`exec error: ${error}`);
//     //     return;
//     //   }
//     //   resolve();
//     //   console.log(`stdout: ${stdout}`);
//     //   console.error(`stderr: ${stderr}`);
//     // });
//     process.stdin.on('data', (data) => {
//       socket.emit('send clone message', data.toString());
//       console.log('data->', data.toString());
//     });
//     task.stderr.on('data', (data) => {
//       socket.emit('send clone message', data.toString());
//       console.log('data->', data.toString());
//     });
//     task.stdout.on('data', (data) => {
//       socket.emit('send clone message', data.toString());
//       console.log('data->', data.toString());
//     });
//     task.on('close', (code) => {
//       const isCrash = code !== null;
//       isCrash ? resolve() : reject(code);
//     });
//   });
// };

export const onDownloadRepository = async (socket: Socket) => {
  const repoUrl = 'git@github.com:jweboy/cloud_backend.git';
  const repoName = repoUrl.split('/')[1];
  const projectName = repoName.split('.')[0];

  const onEmit = (data) => {
    socket.emit('send clone message', data);
  };

  await spawnAsync('git', ['clone', repoUrl, '--depth=1', '--verbose', '--progress'], { emit: onEmit });
  await spawnAsync('pnpm', ['install', '--prod'], {
    cwd: resolve(projectName),
    emit: onEmit,
  });
  await spawnAsync('pnpm', ['build'], {
    cwd: resolve(projectName),
    emit: onEmit,
  });

  await spawnAsync('rm', ['-rf', 'cloud_backend']);
  socket.emit('send clone message', `the ${projectName} is removed`);
  // await copyFilesAsync(socket);
  console.log('ok~');
};
