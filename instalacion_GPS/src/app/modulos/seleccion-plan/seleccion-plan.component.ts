import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PlanService} from "../../servicios/PlanService";
import {Plan} from "../../modelos/Plan";
import { MatDialog } from "@angular/material/dialog";
import {Modelo} from "../../modelos/Modelo";
import {Gps} from "../../modelos/Gps";
import {ModeloService} from "../../servicios/ModeloService";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-seleccion-plan',
  templateUrl: './seleccion-plan.component.html',
  styleUrls: ['./seleccion-plan.component.css']
})
export class SeleccionPlanComponent implements OnInit {


  constructor(private servicioPlan:PlanService,
              public dialog: MatDialog,
              private modeloService: ModeloService) { }

  listaPlanes:Array<Plan>=[];
  listaModelo:Array<Modelo>=[];

  plan:Plan =new Plan();
  modelo:Modelo =new Modelo();
  gps:Gps =new Gps();

  planedit:Plan=new Plan();

  titulo="";
  creating=false;
  modelotodo=true;

  editar=false;
  guardar=true;

  @ViewChild('dialogNplan')
  dialogNplan!: TemplateRef<any>;

  ngOnInit(): void {
    this.listarModelo();
    this.listarPLanes();
  }

  listarPLanes(){
    this.servicioPlan.getPlanes().subscribe((data:any)=>{
      this.listaPlanes=data;
    })
  }

  listarModelo(){
    let cont=0;
    this.modeloService.getModelos().subscribe(data=>{
      this.listaModelo=data.filter(value =>{
        return value.estado=='Activo';
      } );
      for (let m of this.listaModelo){
        if (m.nombre.toLowerCase()=='todos'){
          cont=1;
        }
      }
      if (cont==1){
        this.modelotodo=false;
      }
    })
  }


  abrirdialogoPlanes(){
    this.plan=new Plan();
    this.guardar=true;
    this.editar=false;
      this.titulo="Crear Plan"
    this.dialog.open(this.dialogNplan,{
      height: '70%',
      width: '45%',
    });
  }

  abrirdialogoPlanesEdit(id:String){
    this.guardar=false;
    this.editar=true;
    this.servicioPlan.getPlan(id).subscribe(value => {
      this.plan=value;
      this.modelo=this.plan.modelo;
      this.titulo="Editar Plan"
      this.dialog.open(this.dialogNplan,{
        height: '70%',
        width: '45%',
      });
      this.plan.imagen=this.plan.imagen;
    })
  }

  //----------------------
  //validacion de campos
  VNuevoPlanFormGroup = new FormGroup({

    nombre_p: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    costo_p: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    imagen:new FormControl('',Validators.required),
    descripcion_p:new FormControl('',Validators.required),
    costo: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    estado_plan:new FormControl('',Validators.required),
    modelo:new FormControl('',Validators.required),

  });
  public hasError = (controlName: string, errorName: string) =>{
    return this.VNuevoPlanFormGroup.controls[controlName].hasError(errorName);
  }
  ///cargar imagen
  cargarImg(e: any) {
    let img = e.target.files
    let reader = new FileReader();
    reader.readAsDataURL(img[0]);
    reader.onloadend = () => {

      this.plan.imagen = reader.result;
    }
  }


  GuardarPlan(){
    if(this.plan.descripcion_plan=='anual'){
      this.plan.num_descripcion_p=12;
    }else if(this.plan.descripcion_plan=='semestral'){
      this.plan.num_descripcion_p=6;
    }else if(this.plan.descripcion_plan=='cuatrimestral'){
      this.plan.num_descripcion_p=4;
    }else if(this.plan.descripcion_plan=='trimestral'){
      this.plan.num_descripcion_p=3;
    }else if(this.plan.descripcion_plan=='bimestral'){
      this.plan.num_descripcion_p=2;
    }else{
      this.plan.num_descripcion_p=1;
    }
    this.plan.modelo=this.modelo;
    console.log(this.plan);
    if (this.plan.modelo.id_modelo==0){
      this.modelo.nombre="Todos";
      this.modelo.estado="Activo";
      this.modeloService.crearModelo(this.modelo).subscribe((value:any) => {
        this.plan.modelo=value;
        this.servicioPlan.crearPlan(this.plan).subscribe((data:any)=>{
          this.listarPLanes();
          window.location.reload();
          this.dialog.closeAll();
        })
      });
    }else{
      this.servicioPlan.crearPlan(this.plan).subscribe((data:any)=>{
        this.listarPLanes();
        window.location.reload();
        this.dialog.closeAll();
      })
    }

  }

  EditarPlan(){
    if(this.plan.descripcion_plan=='anual'){
      this.plan.num_descripcion_p=12;
    }else if(this.plan.descripcion_plan=='semestral'){
      this.plan.num_descripcion_p=6;
    }else if(this.plan.descripcion_plan=='cuatrimestral'){
      this.plan.num_descripcion_p=4;
    }else if(this.plan.descripcion_plan=='trimestral'){
      this.plan.num_descripcion_p=3;
    }else if(this.plan.descripcion_plan=='bimestral'){
      this.plan.num_descripcion_p=2;
    }else{
      this.plan.num_descripcion_p=1;
    }
    this.plan.modelo=this.modelo;
    console.log(this.plan);
    if (this.plan.modelo.id_modelo==0){
      this.modelo.nombre="Todos";
      this.modelo.estado="Activo";
      this.modeloService.crearModelo(this.modelo).subscribe((value:any) => {
        this.plan.modelo=value;
        this.servicioPlan.editarPlan(this.plan,this.plan.id_plan).subscribe((data:any)=>{
          this.listarPLanes();
          this.dialog.closeAll();
        })
      });
    }else{
      this.servicioPlan.editarPlan(this.plan,this.plan.id_plan).subscribe((data:any)=>{
        this.listarPLanes();
        this.dialog.closeAll();
      })
    }

  }

}
