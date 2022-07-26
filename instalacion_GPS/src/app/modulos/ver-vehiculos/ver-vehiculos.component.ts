import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Cliente} from "../../modelos/Cliente";
import { MatSort } from "@angular/material/sort";
import {ClienteService} from "../../servicios/ClienteService";
import {VehiculoService} from "../../servicios/VehiculoService";
import {Vehiculo} from "../../modelos/Vehiculo";
import {Servicio} from "../../modelos/Servicio";
import { MatDialog } from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DescripcionService} from "../../servicios/DescripcionService";
import {Descripcion} from "../../modelos/Descripcion";

@Component({
  selector: 'app-ver-vehiculos',
  templateUrl: './ver-vehiculos.component.html',
  styleUrls: ['./ver-vehiculos.component.css']
})
export class VerVehiculosComponent implements OnInit {

  columnas: string[] = ['id', 'placa', 'clave', 'vehiculo', 'año','kilometraje','estado','editar','eliminar'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  // @ts-ignore
  dataSource: MatTableDataSource<Vehiculo>;

  datos: Vehiculo[] = [];
  id:any;

  vehiculo:Vehiculo =new  Vehiculo();

  titulo="";
  editing=false;
  creating=false;
  btncrearVh=false;

  listdetalle:Descripcion[]=[];
  detalle:Descripcion;

  @ViewChild('dialogNvehiculo')
  dialogNvehiculo!: TemplateRef<any>;

  @ViewChild('dialogdetallev')
  dialogdetallev!: TemplateRef<any>;

  cliente:Cliente=new Cliente();

  servicio:Vehiculo=new Vehiculo();

  listaVehiculos:Array<Vehiculo>=[];

  constructor(private vehiculoservice:VehiculoService,
              private route:ActivatedRoute,
              private clienteService:ClienteService,
              public dialog: MatDialog,
              private descripcionService:DescripcionService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    if(this.id){
      this.listarvehiculosid()
    }else{
      this.listarvehiculos();
    }
    this.listarDescripciones();
  }
  listarvehiculos(){
    this.vehiculoservice.getVehiculos().subscribe((x: any) => {
      this.listaVehiculos = x
      console.log(this.datos)
      this.dataSource = new MatTableDataSource<any>(this.listaVehiculos);
      this.dataSource.paginator = this.paginator;
    })
  }

  listarDescripciones(){
    this.descripcionService.getDescrip().subscribe(value => {
      this.listdetalle=value;
    })
  }

  listarvehiculosid(){
    this.btncrearVh =true;
    this.clienteService.getByidCliente(this.id).subscribe((vs:any)=>{
      this.cliente=vs;

      this.vehiculoservice.getVehiculos().subscribe((x: any) => {
        this.listaVehiculos = x
        for (let a of this.listaVehiculos) {
          if(a.cliente.id_persona==this.cliente.id_persona){
            this.datos.push(a);
          }
        }
        this.dataSource = new MatTableDataSource<any>(this.datos);
        this.dataSource.paginator = this.paginator;
      })

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  abrirdialogoVehiculos(){

    this.editing=false;
    this.creating=true;
    this.titulo="Crear Vehiculos"
    this.dialog.open(this.dialogNvehiculo,{
      height: '80%',
      width: '30%',
    });

  }

  crearVehiculo(){
    this.vehiculo.cliente.id_persona=this.id;
    this.vehiculo.estado="Activo";
    console.log(this.vehiculo)
    this.vehiculoservice.crearVehiculos(this.vehiculo).subscribe((data:any)=>{
      this.listarvehiculosid();
    })
  }

  //----------------------------
  ValidacionVehiculoFormGroup = new FormGroup({
    placa: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9\\-\\ñÑáéíóúÁÉÍÓÚ., ]*')]),
    clave: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    anio:new FormControl('',Validators.required),
    kilometraje: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    vehiculo_n: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
  });
  //-------------------------
  public hasError = (controlName: string, errorName: string) =>{
    return this.ValidacionVehiculoFormGroup.controls[controlName].hasError(errorName);
  }

  descripcion(id:String){
    for (let d of this.listdetalle){
      if (d.vehiculo.id_vehiculo=id){
        this.detalle=d;
      }
    }
    this.dialog.open(this.dialogdetallev);
  }

}

