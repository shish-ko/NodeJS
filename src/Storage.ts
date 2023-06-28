import {v4 as uuid, validate} from 'uuid';

export class Storage{
  storage: IUser[];
  static checkUser (user: Omit<IUser, 'id'>) {
    if(typeof user.username !== 'string' || typeof user.age !== 'number' || !Array.isArray(user.hobbies)) return;
    return true    
  }
  static checkUUID (payload: string) {
    return validate(payload)
  }
  constructor(){
    this.storage = [];
  }
  add (user: Omit<IUser, 'id'>){
    const id = uuid()
    this.storage.push({...user, id})
  }  
}

interface IUser {
  id: string,
  username: string,
  age: number,
  hobbies: string[],
}