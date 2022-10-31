import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Cliente} from "../modelos/Cliente";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn:"root"
})
export class ClienteService{
  private appUrl = environment.appUrl;
  base_url=this.appUrl+ "/client/";

  constructor(private httpClient:HttpClient) {
  }

  getClient():Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(this.base_url);
  }

  editarClient(cliente:Cliente, id:String){
    return this.httpClient.put(this.base_url+"update-client/"+id, cliente);
  }

  crearClient(cliente:Cliente){
    return this.httpClient.post(this.base_url+"create-client/", cliente);
  }

  getByidCliente(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+id);
  }

  getClientCedula(cedula:String):Observable<Cliente>{
    return this.httpClient.get<any>(this.base_url+"cliente/"+cedula);
  }

  deleteClient(cliente:Cliente, id:String){
    return this.httpClient.put(this.base_url+"delete/"+id, cliente);
  }

}
