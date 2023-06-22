import { exec } from 'node:child_process';
import { homedir } from 'node:os'
import readline from 'node:readline';
import { showCurDir } from './cli.js';
import { up } from './fs.js';

const args = process.argv
const userName = args.find((item) => item.startsWith('--username')).split('-').pop();

// const showCurDir = () => {
//   console.log(`You are currently in ${currentPath}`)
// }
console.log(`Welcome to FileManager, ${userName}!`);
showCurDir();

const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

cli.prompt();

cli.on('line', (line) => {
  const command = line.split(' ').at(0);
  switch (command) {
    case 'up':
      up()
      break;
    case 'pwd': 
      (()=>{
        const cp = exec('pwd', (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
        });
      })()
  
    default:
      console.log('Invalid input');
      cli.prompt();
      break;
  }
  showCurDir();
})