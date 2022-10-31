import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Servicio} from "../modelos/Servicio";
import {Cliente} from "../modelos/Cliente";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn:"root"
})
export class ServicioService{
  private appUrl = environment.appUrl;
  base_url=this.appUrl+"/docservicio/";

  constructor(private httpClient:HttpClient) {
  }

  getServices():Observable<Servicio[]>{
    return this.httpClient.get<Servicio[]>(this.base_url);
  }

  getServiciosCliente(idcli:String):Observable<Servicio[]>{
    return this.httpClient.get<Servicio[]>(this.base_url+"cliente/idcli/"+idcli);
  }

  getService(id:String):Observable<any>{
    return this.httpClient.get(this.base_url+id);
  }

  editarService(service:Servicio, id:String){
    return this.httpClient.put(this.base_url+"update-docservicio/"+id, service);
  }

  crearService(servicio:Servicio){
    return this.httpClient.post(this.base_url+"create-docservicio", servicio);
  }

}

