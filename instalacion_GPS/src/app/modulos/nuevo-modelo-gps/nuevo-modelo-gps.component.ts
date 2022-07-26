import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AccionesService} from "../../servicios/AccionesService";
import {ModeloService} from "../../servicios/ModeloService";
import {Modelo} from "../../modelos/Modelo";
import {Acciones} from "../../modelos/Acciones";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-nuevo-modelo-gps',
  templateUrl: './nuevo-modelo-gps.component.html',
  styleUrls: ['./nuevo-modelo-gps.component.css']
})
export class NuevoModeloGpsComponent implements OnInit {

  columnasM: string[] = ['idM','nombreM','EstadoM','Acciones','editar','eliminar'];


  @ViewChild(MatPaginator, { static: true }) paginatorM!: MatPaginator;


  datosM: Modelo[] = [];
  dataSourceM:any;
  titulo="";
  editing=false;
  creating=false;


  modelo:Modelo=new Modelo();
  modeloEliminar:Modelo=new Modelo();
  accion:Acciones=new Acciones();
  accionSet:Acciones=new Acciones();
  Accioncrear:Acciones=new Acciones();

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  @ViewChild('dialogRefAc')
  dialogRefAc!: TemplateRef<any>

  @ViewChild('dialogEliminar')
  dialogEliminar!: TemplateRef<any>

  crear=true;
  editar=false;

  listaModelos:Array<Modelo>=[];
  listaAcciones=[];

  title='';
  eliminar=false;
  activar=false;

    constructor(private modeloservice:ModeloService,
                private accionesservice:AccionesService,
                public dialog: MatDialog,
                private router:Router,
                private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
      this.listarModelos();
  }

  listarModelos(){
    this.modeloservice.getModelos().subscribe((x:any) =>{
      this.listaModelos=x
      for (let a of this.listaModelos){
        this.datosM.push(a);
        this.dataSourceM = new MatTableDataSource<any>(this.datosM);
        this.dataSourceM.paginator = this.paginatorM;
      }
    })
  }

  //Filtro modelos
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceM.filter = filterValue;
  }

  abrirdialogoC(){
      this.editing=false;
      this.creating=true;
      this.titulo="Crear Modelo"
      this.dialog.open(this.dialogRef);
  }

  abrirdialogoEdi(id:String){
    this.editing=true;
    this.creating=false;
      this.modeloservice.getModelos().subscribe((data:any)=>{
        this.modelo=data.find((m)=>{return m.id_modelo==id})
        this.titulo="Editar Modelo"
        this.dialog.open(this.dialogRef);
      })
  }
  //----------------Validaciones-----------------
  validacionModelo = new FormGroup({
    nombre: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9\\-\\ñÑáéíóúÁÉÍÓÚ., ]*')]),
  });

  //---------------------------------------------
  public hasError = (controlName: string, errorName: string) =>{
    return this.validacionModelo.controls[controlName].hasError(errorName);
  }

  crearModelo(){
      this.modelo.estado="Activo"
    this.modeloservice.crearModelo(this.modelo).subscribe((data:any)=>{
      window.location.reload();
    })
  }


  editarModelo(){
    this.modeloservice.updateModelo(this.modelo,this.modelo.id_modelo).subscribe((data:any)=>{
      window.location.reload();
    })
  }

  //Acciones
  abrirdialogoAcciones(id:any){
      for (let i=0;i<=this.listaAcciones.length;i++){
        this.listaAcciones.pop();
      }

    this.modelo.id_modelo=id;
      this.accionesservice.getAcciones().subscribe((data:any)=>{
        if (data.filter((data: any) => data.modelo.id_modelo == id).length == 0){
          this.snackBar.open("El modelo no tiene acciones", "",{
            duration: 1 * 1000,
          });
        }else{
          this.listaAcciones=data.filter(value=>value.modelo.id_modelo==id)
          this.accion=data.find(m=>{return m.modelo.id_modelo==id})
          console.log(this.listaAcciones)
          console.log("datos")
        }
        this.dialog.open(this.dialogRefAc);

      })
  }

  agregarAcciones(){
      this.Accioncrear.nombre=this.accionSet.nombre;
      this.Accioncrear.estado="Activo"
      this.Accioncrear.modelo=this.modelo;
     this.accionesservice.crearAccion(this.Accioncrear).subscribe(data=>{
       this.dialog.closeAll();
       this.accionSet.nombre=null;
       this.abrirdialogoAcciones(data.modelo.id_modelo)
      })
  }


  abrirdialogoEliminar(modelo:Modelo){
    this.eliminar=true;
    this.activar=false;
    this.modeloEliminar=modelo;
    this.title='Esta seguro de eliminar el modelo '+this.modeloEliminar.nombre+' ?'
    this.dialog.open(this.dialogEliminar);
  }

  abrirdialogoActivar(modelo:Modelo){
    this.eliminar=false;
    this.activar=true;
    this.modeloEliminar=modelo;
    this.title='Esta seguro de activar el modelo '+this.modeloEliminar.nombre+' ?'
    this.dialog.open(this.dialogEliminar);
  }

  EliminarModelo(){
    this.modeloEliminar.estado="Inactivo";
    this.modeloservice.updateModelo(this.modeloEliminar,this.modeloEliminar.id_modelo).subscribe((data:any)=>{
      this.listarModelos();
      this.snackBar.open("MODELO "+this.modeloEliminar.nombre.toUpperCase()+" DESHABILITADO  ", "",{
        duration: 1 * 1000,
      });
    })
  }

 ActivarModelo(){
    this.modeloEliminar.estado="Activo";
    this.modeloservice.updateModelo(this.modeloEliminar,this.modeloEliminar.id_modelo).subscribe((data:any)=>{
      this.listarModelos();
      this.snackBar.open("MODELO "+this.modeloEliminar.nombre.toUpperCase()+" HABILITADO  ", "",{
        duration: 1 * 1000,
      });
    })
  }


  //ACCIONES
  EditarAcciones(accion:Acciones){
    this.accionesservice.editaccion(accion,accion.id_acciones).subscribe(value => {
      this.snackBar.open("ACCIÓN ACTUALIZADA  ", "",{
        duration: 1 * 1000,
      });
      this.accionSet.nombre=null;
      this.crear=true;
      this.editar=false;
      this.dialog.closeAll();
      this.abrirdialogoAcciones(accion.modelo.id_modelo);
    })
  }

  cargardato(accion:Acciones){
    this.accionSet=accion;
    this.crear=false;
    this.editar=true;
  }

  EliminarAcciones(data:Acciones){
    this.accionesservice.eliminarAcciones(data.id_acciones).subscribe(value => {
      this.snackBar.open("ACCIÓN ELIMINADA  ", "",{
        duration: 1 * 1000,
      });
      this.dialog.closeAll();
      this.abrirdialogoAcciones(data.modelo.id_modelo);
    })
  }
}




