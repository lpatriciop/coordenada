import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Servicio} from "../modelos/Servicio";
import {Cliente} from "../modelos/Cliente";
import {Plan} from "../modelos/Plan";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn:"root"
})
export class PlanService{
  private appUrl = environment.appUrl;
  base_url=this.appUrl+"/plan/";

  constructor(private httpClient:HttpClient) {
  }

  getPlanes():Observable<Plan[]>{
    return this.httpClient.get<Plan[]>(this.base_url);
  }

  getPlan(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+id);
  }
  crearPlan(plan:Plan){
    return this.httpClient.post(this.base_url+"create-plan/", plan);
  }

  editarPlan(plan:Plan,id:String){
    return this.httpClient.put(this.base_url+"update-plan/"+id, plan);
  }

}
