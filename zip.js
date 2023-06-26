import path from "path";
import { getSplittedPaths } from "./utils.js"
import {mkdir, writeFile} from 'fs/promises'
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";

export const compress = async (payload) => {
  try {
      const [file, newDestination] = getSplittedPaths(payload, 2);
  await mkdir(newDestination, {recursive: true});
  await writeFile(path.join(newDestination, path.basename(file) + '.br'), '');
  const readStream=createReadStream(file); 
  const writeStream = createWriteStream(path.join(newDestination, path.basename(file) + '.br'));
  const middleware=createBrotliCompress();
  await pipeline(readStream, middleware, writeStream);
  } catch {
    console.log('Operation failed')
  }

}

export const decompress = async (payload) => {
  try {
    const [file, newDestination] = getSplittedPaths(payload, 2);
    await mkdir(newDestination, {recursive: true});
    const newFileName = path.basename(file, '.br');
    await writeFile(path.join(newDestination, newFileName), '');
    const readStream=createReadStream(file); 
    const writeStream = createWriteStream(path.join(newDestination, newFileName));
    const middleware=createBrotliDecompress();
    await pipeline(readStream, middleware, writeStream);
  } catch {
    console.log('Operation failed')
  }

}