import { getConnection } from "@models/mongodb/MongoDBConn";
import { UsersDao  } from "@models/mongodb/UsersDao";
import {checkPassword, getPassword } from "@utils/crypto";
import { sign } from "@utils/jwt";
const availableRole = ['public', 'admin', 'auditor', 'support'];
export class Users {
  private dao: UsersDao;
  public constructor(){
    getConnection()
      .then(conn=>{
        this.dao = new UsersDao(conn);
      })
      .catch(ex=>console.error(ex));
  }
  public signUp(name: string, email:string, password: string){
    const currentDate = new Date();
    email = email.toLowerCase();
    const newUser = {
      name,
      email,
      password: getPassword(password),
      status: 'ACT',
      oldPasswords: [] as string[],
      created: currentDate,
      updated: currentDate,
      failedAttempts: 0,
      lastLogin: currentDate,
      avatar:'',
      roles: ['public'],
      _id: null
    };
    return this.dao.createUser(newUser);
  }
  
  public updateUser(_id: string, name:string="", password: string="") {
    const currentDate = new Date();
    

    if (password == "" && name == "") {
      //ambos vacios
        console.log("debe mandar los datos necesarios");
        
    }else if (name != "" && password != ""){
      //ninguno vacio
      const updUser = {
        name,
        password: getPassword(password),
        updated: currentDate,
      };
      console.log("ninguno vacio");
      return this.dao.updateUser(_id, updUser);

    }else if (name != ""){
      //nombre lleno
      const updUser = {
        name,
        updated: currentDate,
      };
      console.log("nombre lleno");
      return this.dao.updateUser(_id, updUser);
    }else {
      //password lleno
      const updUser = {
        password: getPassword(password),
        updated: currentDate,
      };
      console.log("password lleno");
      return this.dao.updateUser(_id, updUser);
    }
    
    
}
  public deleteUser(_id: string) {
    const delUser = {
        status: 'INA',
    };
    return this.dao.deleteUser(_id, delUser);
}

  public async login(email: string, password: string) {
    try {
      email = email.toLowerCase();
      const user = await this.dao.getUserByEmail(email);
      if(!!!user){
        console.log("LOGIN: NO USER FOUND: ", `${email}`);
        throw new Error("LOGIN NO USER FOUND");
      }
      if (user.status !== 'ACT' ) {
        console.log("LOGIN: STATUS NOT ACTIVE: ", `${user.email} - ${user.status}`);
        await this.dao.updateUserFailed(user._id.toString());
        throw new Error("LOGIN STATUS INVALID");
      }
      if(!checkPassword(password, user.password)){
        console.log("LOGIN: PASSWORD INVALID: ", `${user.email} - ${user.status}`);
        await this.dao.updateUserFailed(user._id.toString());
        throw new Error("LOGIN PASSWORD INVALID");
      }
      const {name, email: emailUser, avatar, _id} = user;
      const returnUser = {name, email: emailUser, avatar, _id};
      await this.dao.updateLoginSuccess(user._id.toString());
      return {...returnUser, token: sign(returnUser)};
    } catch(err){
      console.log("LOGIN:" , err);
      throw err;
    }
  }
  public getUserbyIndex(id :string){
    return this.dao.getUserById(id);
  }

  public async assignRoles(id: string, role: string) {
    if( ! availableRole.includes(role) ){
      throw new Error(`Role ${role} must be one of ${availableRole.join(', ')}`);
    }
    return this.dao.addRoleToUser(id, role);
  }
}
