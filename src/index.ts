import http from 'node:http';
import dotenv from 'dotenv';
import { IUser, Storage } from './Storage';

dotenv.config();
const PORT = process.env.PORT || 4000;

const db = new Storage();

const server = http.createServer((req, res) => {
  const res404 = () => {
    res.statusCode = 404;
    res.end('This endpoint doesn\'t exist');
  }
  const { method, url } = req;
  const userId = url?.split('/')[3];
  if (!url?.startsWith('/api/users') || url.split('/').length > 4) {
    return res404();
  }
  if (!userId && (method === 'PUT' || method === 'DELETE')) return res404();


  if (userId) {
    if (!Storage.checkUUID(userId)) {
      res.statusCode = 400;
      res.end('Invalid userId');
      return;
    }
    if (!db.getUser(userId)) {
      res.statusCode = 404;
      res.end('User with provided id doesn\'t exist');
      return
    }
  }
  let chunks: Uint8Array[] = [];
  let body: undefined | Partial<IUser>;
  req.on('data', (chunk) => chunks.push(chunk)).on('end', () => {
    try {
      if (chunks.length) {
        body = JSON.parse(Buffer.concat(chunks).toString());
      }
      switch (method) {
        case 'GET':
          res.setHeader('Content-type', 'application/json');
          if (userId) {
            res.end(JSON.stringify(db.getUser(userId)))
          } else {
            res.end(JSON.stringify(db))
          }
          break;
        case 'POST':
          if (!Storage.checkPayload(body)) {
            res.statusCode = 400;
            return res.end('Provide all required info');
          }
          res.statusCode = 201;
          res.setHeader('Content-type', 'application/json');
          res.end(JSON.stringify(db.add(body as Omit<IUser, 'id'>)));
          break;
        case 'DELETE':
          res.statusCode = 204;
          db.deleteUser(userId as string);
          res.end();
          break;
        case 'PUT':
          const user = db.updateUser(userId as string, body);
          if (!user) {
            res.statusCode = 400;
            return res.end('Check provided info')
          }
          res.setHeader('Content-type', 'application/json');
          res.end(JSON.stringify(user));
          break;
        default:
          break;
      }
    } catch {
      res.statusCode = 500;
      res.end('Server error. Please, try later');
    }
  })

});

server.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
