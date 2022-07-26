import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import Swal from "sweetalert2";
import {UserService} from "../servicios/UserService";
import {TokenService} from "../servicios/TokenService";

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  realRol: string;

  constructor(
    private tokenService:TokenService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
    const roles = this.tokenService.getAuthorities();
    this.realRol = '';
    roles.forEach(rol =>{
      if(rol == 'ROLE_ADMIN'){
        this.realRol = 'rolAdmin';
      }
      if(rol == 'ROLE_INSTALL'){
        this.realRol = 'rolinstall';
      }
    });
    console.log(this.tokenService.getToken()+"dkjfk")
    console.log(expectedRol.indexOf(this.realRol))

    if(!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1){
      this.router.navigate(['/iniciasesion']);
      // @ts-ignore
      Swal.fire(
        'Acceso denegado',
        `No tienes Acceso`,
        'warning'
      );
      return false;
    }
    return true;
  }

}
