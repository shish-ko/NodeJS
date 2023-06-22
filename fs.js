import { currentPath } from "./cli.js"
import path from 'path'

export const up = () => {
  console.log(currentPath)
  const pathArr = currentPath.split(path.delimiter)
  if( pathArr.length - 1) {
    pathArr.pop();
    currentPath = pathArr;
  }
}

// export const cd = (line) => {
//   const payload = line.split(' ')[1];
//   if (payload === '..') {
//     currentPath = currentPath.split(path.delimiter).
//   }
// }