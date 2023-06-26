import path from 'path';

export const showCurDir = () => {
  console.log(`You are currently in ${process.cwd()}`)
}

const getDirection = (dir) => {
  return path.isAbsolute(dir) ? dir : path.join(process.cwd(), dir);
}

export const getSplittedPaths = (payload, items=1) => {
  let res;
  if(payload.includes('"')) {
    res = payload.split('"').reduce((acc, item) => {
    if(item) acc.push(getDirection(item.trim()));
    return acc}, [])
  } else {
    res= payload.split(' ').map((item) => getDirection(item))
  }  
  return items > 1 ? res : res[0];
}