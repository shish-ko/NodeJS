import { mkdir, readFile, readdir, rename, rm, stat, writeFile } from "fs/promises"
import path from 'path'
import { createReadStream, createWriteStream } from "fs"
import { pipeline } from "stream/promises"

const showCurDir = () => {
  console.log(`You are currently in ${process.cwd()}`)
}

const getDirection = (dir) => {
  return path.isAbsolute(dir) ? dir : path.join(process.cwd(), dir);
}

const getSplittedPaths = (payload, items=1) => {
  const arr = payload.split(' ');
  if (arr.length === items) {
    const result = arr.map((item) => getDirection(item));
    return items > 1 ? result : result[0];
  };  
  const res = payload.split('"').reduce((acc, item) => {
    if(item) acc.push(item.trim());
    return acc}, [])
  return res.map((item) => getDirection(item))
}

const add = async (payload) => {
  await writeFile(getSplittedPaths(payload), '');
}

const rn = async (payload) => {
  try {
    const [fileToRename, newName] = getSplittedPaths(payload, 2);
    await rename(fileToRename, path.join(path.dirname(fileToRename), path.basename(newName)));
  } catch {
    console.log('Invalid input')
  }  
}

const rm_cli = async (file) => {
  try{
    await rm(getSplittedPaths(file));
  } catch {
    console.log('Operation failed')
  }
}

const cp = async (payload) => {
  try{
    const [oldDir, newDir] = getSplittedPaths(payload, 2);
    await mkdir(path.dirname(newDir), {recursive: true})
    const newFile = await writeFile(newDir, '');
    await pipeline(createReadStream(oldDir), createWriteStream(newDir));
  } catch {
    console.log('Operation failed')
  }
}

const mv = async (payload) => {
  const [oldFile] = getSplittedPaths(payload, 2);
  await cp(payload);
  rm(oldFile);
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

export {cat, rm_cli, rn, add, getDirection, showCurDir, cp, mv, getSplittedPaths}