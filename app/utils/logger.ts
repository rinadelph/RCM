import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'app.log');

export const log = (message: string, ...args: any[]) => {
  console.log(message, ...args);
};