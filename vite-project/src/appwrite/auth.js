import conf from '../conf/conf.js';
import {Client,Account,ID} from "appwrite";

export class AuthService{
  client = new Client();
  account ;
  constructor(){
    this.client.setEndpoint(conf.appWriteURL).setProject(conf.appWriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({email,password,name}){
    try{
       const userAccount = await this.account.create(ID.unique(),email,password,name);
       if(userAccount){
        //log in
        console.log("user account created");
        return await this.logInAccount(email,password);
         
       }
       else
       {
        return userAccount;
       }
    }
    catch(err){
     throw err;
    }
  }
  async logInAccount(email,password){
    try{
      return await this.account.createEmailPasswordSession(email,password);
    }
    catch(err){
     throw err;
    }
  }
  async getCurrentUser()
  {
    try{
      return await this.account.get();
    }
    catch(err){
     console.log("cannot get current user"); ;
    }
    return null;
  }
  async logOut(){
    try{
      return await this.account.deleteSessions();
    }
    catch(err){
     console.log("Appwrite:Error logging out") ;
    }
  }
}


const authService = new AuthService();

export default authService