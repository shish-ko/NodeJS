import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises';
import { getSplittedPaths } from './fs.js';

export const hash = async (path) => {
  try {
    const hashObj = createHash('sha256');
    const fileEntries = await readFile(getSplittedPaths(path))
    hashObj.update(fileEntries);
    console.log(hashObj.digest('hex'));
  } catch {
    console.log('Operation failed')
  }

}