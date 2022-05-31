import { Socket } from 'socket.io';
import { resolve } from 'path';
import { execSync } from 'child_process';
import { statSync, mkdirSync } from 'fs';
import { spawnAsync } from '../../utils/process';
import Project from '../../entities/project';

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

const WRITE_LINE = 'writeLine';

export const onDownloadRepository = async (data: Project, socket: Socket) => {
  const { repo_url, application } = data;
  // 用户的 home 目录（即磁盘根目录）
  const homeDir = process.env.HOME;
  // 用于存放当前需要部署项目的临时目录
  // const project = resolve(homeDir, 'temp', application);
  const project = resolve('/home/test');
  console.log(homeDir, statSync('/home/app'));

  const onEmit = (data) => {
    socket.emit(WRITE_LINE, data);
  };

  socket.emit(WRITE_LINE, `starting remove ${project}`);

  // // 确保运行之前文件目录已被s删除
  // await spawnAsync('rm', ['-rf', project]);
  // socket.emit(WRITE_LINE, `the ${project} is removed`);
  // await mkdirSync(project);

  try {
    // 下载 git 仓库代码
    await spawnAsync('git', ['clone', repo_url, project, '--depth=1', '--verbose', '--progress'], {
      emit: onEmit,
      cwd: project,
    });
    // 在项目中安装依赖包
    await spawnAsync('yarn', ['install', '--prod', '--registry=https://registry.npmmirror.com'], {
      cwd: project,
      emit: onEmit,
    });

    // 在项目中构建编译
    await spawnAsync('yarn', ['build'], {
      cwd: project,
      emit: onEmit,
    });

    await spawnAsync('docker', ['cp', `koa_service:${project}`, '/root/temp'], {
      emit: onEmit,
    });
  } catch (err) {
    console.log(`spawn execute failed: ${err}`);
  }

  // await copyFilesAsync(socket);
  socket.emit(WRITE_LINE, null);
};
