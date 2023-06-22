import os from 'node:os';

export const os_cli = (payload) => {
  switch (payload) {
    case '--EOL':
      console.log(os.EOL.split(''));
      break
    case '--cpus':
      const cores= os.cpus().map((item) => {
        const data = {model: item.model, speed: (item.speed/1000).toFixed(2)}
        return data;
      })
      console.log(cores);
      break;
    case '--homedir':
      console.log(os.homedir());
      break;
    case '--username':
      console.log(os.userInfo().username);
      break;
    case '--architecture': 
      console.log(os.arch());
      break;
    default: 
      console.log('Invalid input');
      break;
  }
}