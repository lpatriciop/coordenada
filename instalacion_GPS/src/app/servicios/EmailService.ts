import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { MensajesMail } from "../modelos/MensajesMail";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn:"root"
})
export class EmailService{
  private appUrl = environment.appUrl;
  base_url=this.appUrl+"/emailservice/";

  constructor(private httpClient:HttpClient) {
  }

  getMensajesEmail():Observable<MensajesMail[]>{
    return this.httpClient.get<MensajesMail[]>(this.base_url);
  }

  getMensajeEmail(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+id);
  }

  crearMensajeEmail(email:MensajesMail){
    return this.httpClient.post(this.base_url+"create-mesaje-email/", email);
  }

  editMensajeEmail(email:MensajesMail, id:String){
    return this.httpClient.put(this.base_url+"update-mesaje-email/"+id, email);
  }

  enviarMail(datos:MensajesMail,correorecep:String){
    return this.httpClient.post(this.base_url+"mail/"+correorecep, datos);
  }
}
