import { readFile, writeFile } from "fs/promises"
import { currentPath } from "./cli.js"
import path from 'path'
import { createReadStream } from "fs"
import { pipeline } from "stream/promises"

export const showCurDir = () => {
  console.log(`You are currently in ${process.cwd()}`)
}

export const getDirection = (dir) => {
  return path.isAbsolute(dir) ? dir : path.join(process.cwd(), dir);
}
export const up = () => {
  const parsed = path.parse(process.cwd());
  // console.log(parsed)
  if(!parsed.base) return;
  const pathArr = process.cwd().split(path.sep).slice(0, -1);
  if(pathArr.length === 1) {
    process.chdir(parsed.root)
  } else {
    process.chdir(pathArr.join(path.sep))
  }
}

export const cd = (line) => {
  const payload = line.split(' ')[1];
  if (payload === '..') {
    return up();
  }
  
}

export const ls = (payload) => {

}

export const add = async (payload) => {
  await writeFile(getDirection(payload), '');
}

export const cat = async (payload) => {
  // try {

    const readStream = createReadStream(getDirection(payload));   
    const qwe = readStream.pipe(process.stdout);
    await Promise ((res) => {qwe.on('finish', () => res())} )
    // console.log('finish')
    return
  // } catch {
  //   console.log('Invalid input')
  // }
}