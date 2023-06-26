import path from 'path';
import { getSplittedPaths } from './utils.js';
import { readdir } from 'fs/promises';

export const up = () => {
  const parsed = path.parse(process.cwd());
  if(!parsed.base) return;
  const pathArr = process.cwd().split(path.sep).slice(0, -1);
  if(pathArr.length === 1) {
    process.chdir(parsed.root)
  } else {
    process.chdir(pathArr.join(path.sep))
  }
}

export const cd = (path) => {
  try{
    process.chdir(getSplittedPaths(path));
  } catch {
    console.log('Invalid input')
  }  
}


export const ls = async  () => {
  const dirEntriesDirents = await readdir(process.cwd(), {withFileTypes: true});
  const dirEntries = dirEntriesDirents.map((item) => {
    return {name: item.name, type: item.isFile() ? 'file' : 'directory'}
  })
  const dirs = dirEntries.filter((item) => item.type === 'directory').sort((a, b) => b.name-a.name);
  const files = dirEntries.filter((item) => item.type === 'file').sort((a, b) => b.name-a.name);
  console.table([...dirs, ...files]);  
}