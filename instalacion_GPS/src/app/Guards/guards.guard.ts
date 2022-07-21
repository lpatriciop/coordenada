import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import Swal from "sweetalert2";
import {UserService} from "../servicios/UserService";
import {TokenService} from "../servicios/TokenService";

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  realRol: string;
  nombreUser: any;

  constructor(
    private tokenService:TokenService,
    private router: Router,
    private usuarioService:UserService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
    const roles = JSON.parse(localStorage.getItem("user")+"").authorities;
    console.log(roles)
    this.realRol = 'user';
    roles.forEach(rol =>{
      if(rol.authority == 'ROLE_ADMIN'){
        this.realRol = 'rolAdmin';
      }
      if(rol == 'ROLE_INSTALL'){
        this.realRol = 'rolinstall';
      }
    });

    if(!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1){
      this.router.navigateByUrl('/inicio');
      this.nombreUser = sessionStorage.getItem('AuthUserName');
      console.log(this.nombreUser)
      // @ts-ignore
      Swal.fire(
        'Acceso denegado',
        `Hola ${ this.nombreUser} no tienes acceso a este recurso!`,
        'warning'
      );
      return false;
    }
    return true;
  }

}
