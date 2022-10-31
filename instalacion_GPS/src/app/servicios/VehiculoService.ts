import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Vehiculo} from "../modelos/Vehiculo";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn:"root"
})
export class VehiculoService{
  private appUrl = environment.appUrl;
  base_url=this.appUrl+"/vehiculo/";

  constructor(private httpClient:HttpClient) {
  }

  getVehiculos():Observable<any>{
    return this.httpClient.get<any>(this.base_url);
  }

  getVehiculo(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+id);
  }

  getVehiculoCli(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+"cli/"+id);
  }

  editarVehiculos(vehiculo:Vehiculo, id:String){
    return this.httpClient.put(this.base_url+"update-vehiculo/"+id, vehiculo);
  }

  crearVehiculos(vehiculo:Vehiculo){
    return this.httpClient.post(this.base_url+"create-vehiculo/", vehiculo);
  }

}
