import { homedir } from 'node:os'
import path from 'node:path';
export let currentPath = homedir();
export const showCurDir = () => {
  console.log(`You are currently in ${currentPath}`)
}