import { mkdir, rename, rm, writeFile } from "fs/promises"
import path from 'path'
import { createReadStream, createWriteStream } from "fs"
import { pipeline } from "stream/promises";
import { getSplittedPaths } from "./utils.js";

const add = async (payload) => {
  try{
    await writeFile(getSplittedPaths(payload), '');
  }catch {
    console.log('Operation failed');
  }

}

const rn = async (payload) => {
  try {
    const [fileToRename, newName] = getSplittedPaths(payload, 2);
    await rename(fileToRename, path.join(path.dirname(fileToRename), path.basename(newName)));
  } catch {
    console.log('Operation failed')
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
    const qwe = await mkdir(newDir, {recursive: true});
    console.log(qwe)
    await writeFile(path.join(newDir, path.basename(oldDir)), '');
    await pipeline(createReadStream(oldDir), createWriteStream(path.join(newDir, path.basename(oldDir))));
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
  try {
    console.log(getSplittedPaths(payload))
    const readStream = createReadStream(getSplittedPaths(payload));
    readStream.pipe(process.stdout);
  } catch {
    console.log('Operation failed')
  }
}

export {cat, rm_cli, rn, add, cp, mv }