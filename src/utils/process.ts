import { spawn, SpawnOptionsWithoutStdio } from 'child_process';
import { Socket } from 'socket.io';

export const spawnAsync = (
  command: string,
  args?: string[],
  options?: SpawnOptionsWithoutStdio & { socketName?: string; socket?: Socket; emit?: (data: string) => void }
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const { socketName, socket, emit, ...restOptions } = options || {};
    const process = spawn(command, args, restOptions);
    const isEmitFunc = typeof emit === 'function';

    process.stdout.on('data', (data) => {
      isEmitFunc ? emit(data.toString()) : resolve(data.toString());
    });

    process.stderr.on('data', (data) => {
      isEmitFunc ? emit(data.toString()) : resolve(data.toString());
    });

    process.on('close', (code) => {
      const isCrash = code !== null;
      isCrash ? resolve() : reject(code);
    });
  });
};