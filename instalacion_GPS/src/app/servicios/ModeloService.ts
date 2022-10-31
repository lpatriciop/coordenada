import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Modelo} from "../modelos/Modelo";
import {User} from "../modelos/User";
import {Cliente} from "../modelos/Cliente";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn:"root"
})
export class ModeloService{
  private appUrl = environment.appUrl;
  base_url=this.appUrl+"/models/";

  constructor(private httpClient:HttpClient) {
  }

  getModelos():Observable<Modelo[]>{
    return this.httpClient.get<Modelo[]>(this.base_url);
  }

  crearModelo(modelo:Modelo){
    return this.httpClient.post(this.base_url+"create-model/", modelo);
  }

  deleteModelo(id:String){
    return this.httpClient.delete(this.base_url+"delete-model/"+id);
  }

  updateModelo(modelo:Modelo,id:String){
    return this.httpClient.put(this.base_url+"update-model/"+id,modelo);
  }
}
