import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Pagos} from "../modelos/Pagos";

@Injectable({
  providedIn:"root"
})
export class PagosService{
  base_url="http://localhost:9898/api/pagos/";

  constructor(private httpClient:HttpClient) {
  }

  getPagos():Observable<Pagos[]>{
    return this.httpClient.get<Pagos[]>(this.base_url);
  }

  getPagosByService(id_service:String):Observable<Pagos[]>{
    return this.httpClient.get<Pagos[]>(this.base_url+"service/"+id_service);
  }

  getPago(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+id);
  }

  crearPagos(pagos:Pagos){
    return this.httpClient.post(this.base_url+"create-pagos/", pagos);
  }

}
