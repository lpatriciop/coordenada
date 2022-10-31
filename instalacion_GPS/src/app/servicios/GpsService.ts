import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Gps} from "../modelos/Gps";
import {Cliente} from "../modelos/Cliente";
import {User} from "../modelos/User";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn:"root"
})
export class GpsService{
  private appUrl = environment.appUrl;
  base_url=this.appUrl+"/gps/";

  constructor(private httpClient:HttpClient) {
  }

  getGps():Observable<Gps[]>{
    return this.httpClient.get<Gps[]>(this.base_url);
  }

  getgps(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+id);
  }

  crearGps(gps:Gps){
    return this.httpClient.post(this.base_url+"create-gps/", gps);
  }

  editGps(gps:Gps, id:String){
    return this.httpClient.put(this.base_url+"update-gps/"+id, gps);
  }

}
