import { readFile, readdir, rename, rm, stat, writeFile } from "fs/promises"
import path from 'path'
import { createReadStream } from "fs"

const showCurDir = () => {
  console.log(`You are currently in ${process.cwd()}`)
}

const getDirection = (dir) => {
  return path.isAbsolute(dir) ? dir : path.join(process.cwd(), dir);
}

const getSplittedPaths = (payload, items) => {
  const arr = payload.split(' ');
  if (arr.length === items) return arr;  
  const res = payload.split('"').reduce((acc, item) => {
    if(item) acc.push(item.trim());
    return acc}, [])
    console.log(res)
  return res
}

const add = async (payload) => {
  await writeFile(getDirection(payload), '');
}

const rn = async (payload) => {
  try {
    const [filePath, newName] = getSplittedPaths(payload);
    const fileToRename = getDirection(filePath);
    await rename(fileToRename, path.join(path.dirname(fileToRename), newName));
  } catch {
    console.log('Invalid input')
  }  
}

const rm_cli = async (file) => {
  try{
    await rm(getSplittedPaths(file, 1)[0]);
  } catch {
    console.log('Operation failed')
  }
}



const cat = async (payload) => {
  // try {

    const readStream = createReadStream(getDirection(payload));

    const qwe = readStream.pipe(process.stdout);

    // await Promise (qwe. )
    // console.log('finish')
    return
  // } catch {
  //   console.log('Invalid input')
  // }
}

export {cat, rm_cli, rn, add, getDirection, showCurDir}