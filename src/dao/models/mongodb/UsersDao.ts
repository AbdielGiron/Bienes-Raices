import { IUser } from "../entities/User";
import { AbstractDao } from "./AbstractDao";
import {Db} from "mongodb";

export class UsersDao extends AbstractDao<IUser>{
  public constructor(db: Db) {
    super('users', db );
  }
  getUserByEmail(email:string){
    const query = {email};
    return this.findOneByFilter(query);
  }
  getAllUsers(){
    return this.findAll();
  }
  updateUserFailed(id:string){
    return this.updateRaw(id, {$inc: {failedAttempts: 1}, $set: {updated: new Date()}});
  }
  updateLoginSuccess(id:string){
    const currentDate = new Date();
    return this.update(id, {lastLogin: currentDate, failedAttempts: 0, updated: currentDate});
  }
  addRoleToUser(id: string, role:string){
    return this.updateRaw(id,
      // {$push : {roles: role}}
      {$addToSet: {roles: role}}
    );
  }
   public async getUserById(id:string){
    try {
      const result = await super.findByID(id);
      return result;
    } catch (ex: unknown) {
      console.log("user mongodb:", (ex as Error).message);
      throw ex;
    }
   }

  createUser(user:IUser){
    const {_id, ...newUser} = user;
    return this.createOne(newUser);
  }
  deleteUser(id: string, user: IUser) {
    const { _id, ...delUser} = user;
    return this.update(id, delUser);
  }
  updateUser(id: string, user: IUser) {
    const { _id, ...updUser} = user;
    return this.update(id, updUser);
  }
}
