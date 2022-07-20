import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../modelos/User";
import {UserService} from "../../servicios/UserService";
import {Router} from "@angular/router";
import {Rol} from "../../modelos/Rol";
import {RolService} from "../../servicios/RolService";
import {Rol_UsuarioService} from "../../servicios/Rol_UsuarioService";
import {Rol_Usuario} from "../../modelos/Rol_Usuario";
@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {

  user:User=new User();
  userGet:User=new User();
  rol: Rol = new Rol();
  listaRol:Array<Rol>=[];

  constructor(private rolService:RolService,private serviciouser:UserService, private router:Router) { }

  ngOnInit(): void {

    this.rolService.getRol().subscribe((data:any)=>{
      this.listaRol=data
      console.log(this.listaRol)
    })

  }

  hide = true;
  accion:Boolean=true;

  formUser = new FormGroup({
    correo: new FormControl('',[Validators.required, Validators.email]),
    contra: new FormControl('',Validators.required),
    rol:new FormControl('',Validators.required),
  });

  regsitrar(){
    this.user.estado="Activo";
    this.user.roles.push(this.rol.rolNombre);
    console.log(this.user)
    this.serviciouser.crearUser(this.user).subscribe((data:any)=>{
         this.router.navigate(['/asignacionroles'])
         console.log(data);
    })
  }

}
