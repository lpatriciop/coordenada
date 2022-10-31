import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Cliente} from "../modelos/Cliente";
import {HttpClient} from "@angular/common/http";
import {Descripcion} from "../modelos/Descripcion";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn:"root"
})
export class DescripcionService{

  private appUrl = environment.appUrl;
  base_url=this.appUrl+"/descipciondc/";

  constructor(private httpClient:HttpClient) {
  }

  getDescrip():Observable<Descripcion[]>{
    return this.httpClient.get<Descripcion[]>(this.base_url);
  }

  getByidDescrip(id:String):any{
    return this.httpClient.get<any>(this.base_url+id);
  }

  getByidCliente(id:String):any{
    return this.httpClient.get<any>(this.base_url+"cli/"+id);
  }

  editarDescrip(descripcion:Descripcion, id:String){
    return this.httpClient.put(this.base_url+"update-descipciondc/"+id, descripcion);
  }

  crearDescrip(descripcion:Descripcion){
    return this.httpClient.post(this.base_url+"create-descipciondc/", descripcion);
  }

  deleteClient(cliente:Cliente, id:String){
    return this.httpClient.put(this.base_url+"delete/"+id, cliente);
  }

}
