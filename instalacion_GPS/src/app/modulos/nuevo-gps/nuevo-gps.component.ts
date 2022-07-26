import { Component, OnInit } from '@angular/core';
import {Gps} from "../../modelos/Gps";
import {ModeloService} from "../../servicios/ModeloService";
import {Modelo} from "../../modelos/Modelo";
import {GpsService} from "../../servicios/GpsService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanService} from "../../servicios/PlanService";
import {Plan} from "../../modelos/Plan";

@Component({
  selector: 'app-nuevo-gps',
  templateUrl: './nuevo-gps.component.html',
  styleUrls: ['./nuevo-gps.component.css']
})
export class NuevoGpsComponent implements OnInit {
  gps:Gps=new Gps();
  plan:Plan=new Plan();
  modelo:Modelo=new Modelo();

  listaModelo:Array<any>=[];
  listaGps:Array<any>=[];

  //Parametro
  id:any;

  constructor(private servicioModelo:ModeloService,
              private servicioGps:GpsService,
              private route:ActivatedRoute,
              private servicioPlan:PlanService,
              private router:Router) { }

//----------------------------
  ValidacionGpsFormGroup = new FormGroup({
    num_gps: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    num_sim: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    imei_gps: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    modelo:new FormControl('',Validators.required),
  });
  //-------------------------
  public hasError = (controlName: string, errorName: string) =>{
    return this.ValidacionGpsFormGroup.controls[controlName].hasError(errorName);
  }


  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    if (this.id){
      this.Gpsid(this.id);
    }
      this.servicioModelo.getModelos().subscribe(data=>{
        this.listaModelo=data.filter(value=>value.nombre.toLowerCase()!="todos");
    })
    this.listarGps();
  }

  Gpsid(id:String){
    this.servicioGps.getgps(id).subscribe(value => {
      this.gps=value
      this.modelo=this.gps.modelo;
    })
  }

  listarGps(){
    this.servicioGps.getGps().subscribe((data:any)=>{
      this.listaGps=data;
      console.log(this.listaGps)
    })
  }

  Guardar(){
    this.gps.modelo=this.modelo;
    this.gps.estado="Activo";
    this.gps.imei_gps=(String(this.gps.imei_gps))
    this.gps.num_gps=(String(this.gps.num_gps))
    this.gps.num_sim=(String(this.gps.num_gps))
    if (this.id){
      this.servicioGps.editGps(this.gps,this.gps.id_gps).subscribe(value => {
        this.router.navigate(['/vergps'])
      })
    }else{
      this.servicioGps.crearGps(this.gps).subscribe((data:any)=>{
        this.router.navigate(['/vergps'])
      })
    }

  }

}
