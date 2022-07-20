import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../modelos/User";
import {UserService} from "../../servicios/UserService";
import {ActivatedRoute, Router} from "@angular/router";
import {Rol} from "../../modelos/Rol";
import {RolService} from "../../servicios/RolService";
import {Rol_UsuarioService} from "../../servicios/Rol_UsuarioService";
import {Rol_Usuario} from "../../modelos/Rol_Usuario";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.css']
})
export class EditarUserComponent implements OnInit {

  desa=true;
  user:User=new User();
  userGet:User=new User();
  rol: Rol = new Rol();
  //Parametro
  id:any;

  otracontras:any;

  rol_us: Rol_Usuario = new Rol_Usuario();

  listaRol:Array<Rol>=[];
  ListadeNombresRol=[];

  idpersona:any;

  constructor(private rolService:RolService,
              private servicioRol_us:Rol_UsuarioService,
              private serviciouser:UserService,
              private router:Router,
              private route:ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.idpersona=this.route.snapshot.params['idpersona'];
    this.listarRoles();
    this.listarUser(this.idpersona);
  }

  listarRoles(){
    this.rolService.getRol().subscribe((data:any)=>{
      this.listaRol=data
      console.log(this.listaRol)
    })
  }

  listarUser(id:any){
    this.serviciouser.getUserid(id).subscribe(value => {
      this.user=value;
      this.user.password=null;
    })
  }

  hide = true;
  accion:Boolean=true;

  formUser = new FormGroup({
    nombre: new FormControl('',Validators.required),
    direccion: new FormControl('',Validators.required),
    telefono: new FormControl('',Validators.required),
    correo: new FormControl('',[Validators.required, Validators.email]),
    contra: new FormControl('',Validators.required),

  });


  UpdateUs(){
    if (this.user.password==this.otracontras){
      for (let rol of this.user.roles){
        this.ListadeNombresRol.push(rol.rolNombre);
      }
      this.user.roles=this.ListadeNombresRol;
      console.log(this.user);
      this.serviciouser.updateUser(this.user).subscribe((data:any)=>{
        this.router.navigate(['/iniciasesion']).then(value => {
          this.snackBar.open("Ingrese con los nuevos datos", "",{
            duration: 1 * 1000,
          });
        });
      })
    }else{
      this.snackBar.open("Las contraseñas no coinciden", "",{
        duration: 1 * 1000,
      });
    }

  }

}
