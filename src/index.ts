import http from 'node:http';
import dotenv from 'dotenv';
import { Storage } from './Storage';

Storage.checkItem({username: "Nick", age: 28, hobbies: ['q']});
dotenv.config();
const PORT = process.env.PORT || 4000;

const predefinedUsers = {

}
const server = http.createServer((req, res) => {
  console.log(req.url);
  res.write('Hello')
  res.end()
});

server.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
