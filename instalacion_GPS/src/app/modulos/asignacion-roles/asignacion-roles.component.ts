import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User} from "../../modelos/User";
import {UserService} from "../../servicios/UserService";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Gps} from "../../modelos/Gps";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import { Rol } from "../../modelos/Rol";
import {RolService} from "../../servicios/RolService";
import Swal from "sweetalert2";

@Component({
  selector: 'app-asignacion-roles',
  templateUrl: './asignacion-roles.component.html',
  styleUrls: ['./asignacion-roles.component.css']
})
export class AsignacionRolesComponent implements OnInit {


  columnas: string[] = ['id', 'nombre', 'correo','rol_us','estado','editar','eliminar'];

  columnasPlan: string[] = ['id', 'nombre'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  dataSource: MatTableDataSource<User>;

  dataSourceRol: MatTableDataSource<Rol>;

  rolesup=[];
  ListadoR:Rol[]=[];

  datos: User[] = [];

  datosRol: Rol[] = [];

  titulo="";
  editing=false;
  creating=false;

  listaUser:Array<User>=[];
  listaRol:Array<Rol>=[];

  users:User=new User();
  usersGet:User=new User();

  rol:Rol=new Rol();

  @ViewChild('dialogRol')
  dialogRol!: TemplateRef<any>;

  constructor(private serviciouser:UserService, private router:Router,public dialog: MatDialog,
              private rolservicio:RolService) { }

  ngOnInit(): void {
    this.listarUsuarios();
    this.listarRoles();
  }

  listarUsuarios(){
    this.serviciouser.getUsers().subscribe((x:any) =>{
      this.listaUser=x
      for (let a of this.listaUser){
        this.datos.push(a);
        this.dataSource = new MatTableDataSource<any>(this.datos);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  listarRoles(){
    this.rolservicio.getRol().subscribe((x:any) =>{
      this.listaRol=x
      for (let a of this.listaRol){
        this.datosRol.push(a);
        this.dataSourceRol = new MatTableDataSource<any>(this.datosRol);
        this.dataSourceRol.paginator = this.paginator;
      }
    })
  }


  abrirdialogoC(){
    this.editing=false;
    this.creating=true;
    this.titulo="Crear Roles"
    this.dialog.open(this.dialogRol);
  }


  crearRol(){
    this.rolservicio.crearRol(this.rol).subscribe((data:any)=>{
      window.location.reload();
    })
  }

  obtenerRol(ListadoR: any){
    this.ListadoR = new Array<any>();
    for(let rol of ListadoR){
      this.ListadoR.push(rol);
    }
  }

  eliminar(id:any){
    this.rolesup=new Array();
    this.usersGet=this.listaUser.find(value => {return value.id_persona==id});
      this.usersGet.estado="Inactivo";
      for (let r of this.usersGet.roles){
          this.rolesup.push(r.rolNombre);
      }
      this.usersGet.roles=this.rolesup;
    console.log(this.usersGet)
      this.serviciouser.updateUserestado(this.usersGet).subscribe(value1 => {
        window.location.reload();
      })
  }

  activar(id:any){
    this.rolesup=new Array();
    this.usersGet=this.listaUser.find(value => {return value.id_persona==id});
    this.usersGet.estado="Activo";
    for (let rs of this.usersGet.roles){
      this.rolesup.push(rs.rolNombre);
    }
    this.usersGet.roles=this.rolesup;
    console.log(this.usersGet)
    this.serviciouser.updateUserestado(this.usersGet).subscribe(value1 => {
      window.location.reload();
    })
  }

}
