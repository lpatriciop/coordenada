import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Acciones} from "../modelos/Acciones";
import {Cliente} from "../modelos/Cliente";

@Injectable({
  providedIn:"root"
})
export class AccionesService{
  base_url="http://localhost:9898/api/accions/";

  constructor(private httpClient:HttpClient) {
  }

  getAcciones():Observable<Acciones[]>{
    return this.httpClient.get<Acciones[]>(this.base_url);
  }

  crearAccion(accion:Acciones):Observable<Acciones>{
    return this.httpClient.post<Acciones>(this.base_url+"create-accion/", accion);
  }

  editaccion(accion:Acciones,id:String){
    return this.httpClient.put(this.base_url+"update-accion/"+id, accion);
  }

  eliminarAcciones(id:any){
    return this.httpClient.delete(this.base_url+"delete-accion/"+id);
  }
}
