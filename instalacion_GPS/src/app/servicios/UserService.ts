import {HttpClient} from "@angular/common/http";
import {User} from "../modelos/User";
import {map, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Cliente} from "../modelos/Cliente";
import {LoginUser} from "../modelos/LoginUser";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn:"root"
})
export class UserService{

  private appUrl = environment.appUrl;
  base_url=this.appUrl+"/user/";

  constructor(private httpClient:HttpClient) {
  }

  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.base_url);
  }

  crearUser(user:User){
    return this.httpClient.post(this.base_url, user);
  }

  login(login:LoginUser):Observable<LoginUser>{
    return this.httpClient.post<LoginUser>(this.base_url+"login/",login);
  }

  getUserid(id:any):Observable<any>{
    return this.httpClient.get<any>(this.base_url+id);
  }

  updateUser(user:User){
    return this.httpClient.put(this.base_url+"update-user", user);
  }

  updateUserestado(user:User){
    return this.httpClient.put(this.base_url+"update/estado/user", user);
  }
}
