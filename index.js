import { homedir } from 'node:os'
import readline from 'node:readline';
import { add, cat, rm_cli, rn, showCurDir } from './fs.js';
import { cd, ls, up } from './nav.js';
import { os_cli } from './os.js';

const args = process.argv;
const userName = args.find((item) => item.startsWith('--username')).split('-').pop();
process.chdir(homedir());
console.log(`Welcome to FileManager, ${userName}!`);
showCurDir();

const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

cli.prompt();

cli.on('line', async (line) => {
  let lineArr = line.split(' ');
  const command = lineArr.shift();
  const payload = lineArr.join(' ');
  console.log('Command: '+ command, 'Payload: ' + payload)
  switch (command) {
    case 'up':
      up()
      break;
    case 'cd':
        cd(payload);
        break;
    case 'ls': 
      await ls();
      break;
    case 'add': 
      add(payload);
      break;
    case 'cat': 
      await cat(payload);
      break;
    case 'rn': 
      rn(payload);
      break 
    case 'rm': 
      await rm_cli(payload);
      break   
    case 'os': 
      os_cli(payload);
      break  
    default:
      console.log('Invalid input');
      break;
  }
  showCurDir();
  cli.prompt();
})