import {v4 as uuid, validate} from 'uuid';

export class Storage extends Array<IUser>{

  static checkPayload (user?: Partial<IUser>, numProperties = 3) {
    if(!user) return;
    if(typeof user.username !== 'string' || typeof user.age !== 'number' || !Array.isArray(user.hobbies) || Object.keys(user).length > numProperties) return;
    return true    
  }
  static checkUUID (payload: string) {
    return validate(payload)
  }
  add (user: Omit<IUser, 'id'>){
    const id = uuid()
    const newUser = {...user, id};
    this.push(newUser);
    return newUser;
  }  
  getUser (userId: string){
    const user = this.find((item) => item.id === userId);
    return user;
  }  
  updateUser(userId: string, payload?: Partial<IUser>) {
    const user = this.getUser(userId) as IUser;  // TODO
    if(!Storage.checkPayload(Object.assign({}, user, payload), 4)) return
    return Object.assign(user, payload);
  }
  deleteUser(userId: string) {
    const index = this.findIndex((item) => item.id === userId);
    this.splice(index, 1);
  }
}

export interface IUser {
  id: string,
  username: string,
  age: number,
  hobbies: string[],
}