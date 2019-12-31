import * as fs from 'fs';

export const isFile = (filePath: string) =>
    fs.existsSync(filePath) && fs.statSync(filePath).isFile();
export const isDir = (filePath: string) =>
    fs.existsSync(filePath) && fs.statSync(filePath).isDirectory();
