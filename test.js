import path from 'path';
import { getDirection } from './fs.js';
console.log(getDirection('C://qwer/w'))
console.log(getDirection('/qwer/w'))
console.log(getDirection('./qwer/w'))
console.log(getDirection(''))
console.log(path.sep);
console.log(path.join(process.cwd(), 'qwer/w'));