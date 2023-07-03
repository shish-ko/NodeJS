import { IUser } from "../src/Storage";

export const testUser_1: Omit<IUser, 'id'> = {
  username: 'Nick',
  age: 3,
  hobbies: ['qweqwe', 'asdasd']
}
export const update: Partial<IUser> = {
  username: 'Test'
}

export const INVALID_ENDPOINTS = ['/some/test', '/some/test/more', '/', '/api/user'];
export const INVALID_USERS = [
  {usernam: 'Nick', age: 3, hobbies: ['qweqwe', 'asdasd']},
  {username: 'Nick', hobbies: ['qweqwe', 'asdasd']},
  {username: 'Nick', age: 3, hobbies: "string"},
  {username: {}, age: 3, hobbies: ['qweqwe', 'asdasd']},
  {username: 'Nick', age: 3, hobbis: ['qweqwe', 'asdasd']},
  {username: 'Nick', age: 3, hobbies: ['qweqwe', 'asdasd'], additional: 3}
];
export const INVALID_UPDATES = [
  {usernam: 'Nick', age: 3, hobbies: ['qweqwe', 'asdasd']},
  {username: 3},
  {username: 'Nick', age: "3"},
  {username: {}},
  {additional: 3},
  {username: 'Nick', age: 3, hobbies: ['qweqwe', 'asdasd'], additional: 3}
];