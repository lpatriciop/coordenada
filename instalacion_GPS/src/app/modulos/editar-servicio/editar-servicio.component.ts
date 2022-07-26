import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Servicio} from "../../modelos/Servicio";
import {ServicioService} from "../../servicios/ServicioService";
import {ActivatedRoute, Router} from "@angular/router";
import {Descripcion} from "../../modelos/Descripcion";
import {DescripcionService} from "../../servicios/DescripcionService";
import {GpsService} from "../../servicios/GpsService";
import {Gps} from "../../modelos/Gps";
import {AccionesService} from "../../servicios/AccionesService";
import {Modelo} from "../../modelos/Modelo";
import {MatDialog} from "@angular/material/dialog";
import {VehiculoService} from "../../servicios/VehiculoService";
import {Vehiculo} from "../../modelos/Vehiculo";
import {Cliente} from "../../modelos/Cliente";
import {HistorialService} from "../../servicios/HistorialService";
import {Historial} from "../../modelos/Historial";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent implements OnInit {

  servicio:Servicio=new Servicio();
  servicioSet:Servicio=new Servicio();
  gps:Gps=new Gps();
  gpsedit:Gps=new Gps();
  gpsGet:Gps=new Gps();
  modelo:Modelo=new Modelo();
  vehiculo:Vehiculo=new Vehiculo();
  vehiculoGet:Vehiculo=new Vehiculo();
  historial:Historial=new Historial();
  vehiculoedit:Vehiculo=new Vehiculo();

  displayedColumns: string[] = ['id', 'placa', 'vehiculo', 'imei', 'modelo', 'cgps','cvehiculo'];
  dataSource: MatTableDataSource<Descripcion>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns1: string[] = ['idh', 'placa', 'vehiculo', 'imei', 'modelo', 'cambio','observacion'];
  dataSource1: MatTableDataSource<Historial>;

  @ViewChild(MatPaginator) paginator1: MatPaginator;

  //Historial
  vehiculoHistorial:Vehiculo=new Vehiculo();

  @ViewChild('dialogEditServiciogps')
  dialogEditServiciogps!: TemplateRef<any>;

  @ViewChild('dialogEditServiciovehiculo')
  dialogEditServiciovehiculo!: TemplateRef<any>;

  detalle:Descripcion;
  detalleedi:Descripcion;

  listadetalle:Array<Descripcion>=[];
  listadetallehistorial=[];
  listadetallen=[];
  listadetallehistoriaGet=[];

  listagps=[];
  cliente:Cliente=new Cliente();
  detalleid:Descripcion;

  listvehiuclosCliSinSer=[];


  listaacciones=[];

  titulo:any;
  id:any;

  editv=false;
  editgps=false;
  allinfo=true;

  vernuvehiculo=false;
  vernuvegps=false;


  constructor(private serviceService:ServicioService,
              private route:ActivatedRoute,
              private serviciodescripcion: DescripcionService,
              private servicioGps:GpsService,
              private servicioAcciones:AccionesService,
              public dialog: MatDialog,
              private serviceVehiculo:VehiculoService,
              private serviceHistorial:HistorialService,
              private router:Router,
              private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.listaServicio();
  }
  //----------Validacion Gps-----------
  DialogvalidGps = new FormGroup({
    imei:new FormControl('',Validators.required),

  });
  //----------Validacion movil---------
  DialogvalidVh = new FormGroup({
    movil:new FormControl('',Validators.required),

  });


  /****Listar todos los detalle servicio****/
  listaServicio(){
    this.id=this.route.snapshot.params['id'];
    if (this.id){
      this.serviciodescripcion.getDescrip().subscribe(data=>{
        this.listadetalle=data.filter(m=>m.documentoservicio.id_documentoservicio==this.id && m.estado=="Activo")

        this.dataSource = new MatTableDataSource(this.listadetalle);
        this.dataSource.paginator = this.paginator;

        let conta=0;
          for (let cli of this.listadetalle){
            if (conta==0){
              this.detalle=cli;
              this.cliente=this.detalle.vehiculo.cliente;
              conta++;
              break;
            }
          }
          this.serviceHistorial.getByidCliente(this.cliente.id_persona).subscribe((data1:any)=>{
            this.listadetallehistoriaGet=data1;
            this.dataSource1 = new MatTableDataSource(this.listadetallehistoriaGet);
            this.dataSource1.paginator = this.paginator1;
          })
        }
      );
    }
    this.serviceService.getService(this.id).subscribe(value => {
      this.servicio=value;
    })
  }


  /****Seleccion del nuevo gps****/
  seleccionarGps(){
    this.detalleedi=this.detalleid;
      let nuevopgs = new Descripcion(this.detalleedi.documentoservicio,this.detalleid.estado,this.gps, this.detalleedi.vehiculo,this.detalleedi.observacion, this.detalleedi.ubicacion)
      this.listadetallen.push(nuevopgs)
      this.listadetallehistorial.push(this.detalleedi);
      this.vernuvegps=true;
  }

  /****Mostrar para editar vehiculo****/
  editarVehiculo(id_vehiculo:String){
    this.serviceVehiculo.getVehiculo(id_vehiculo).subscribe((data:any)=>{
      this.vehiculo=data;
      let nuevovehiculo = new Descripcion(this.detalleedi.documentoservicio,this.detalleid.estado,this.detalleedi.gps, this.vehiculo,this.detalleedi.observacion, this.detalleedi.ubicacion)
      this.listadetallen.push(nuevovehiculo)
      this.listadetallehistorial.push(this.detalleedi);
      this.vernuvehiculo=true;
    })
  }
  /***********/

  /*****flitro de los gps*******/
  flitrarimei($event :any) {
    this.gps=new Gps();
    this.listaacciones.pop();
    this.servicioGps.getGps().subscribe((value: any) => {
        this.listagps = value.filter(m=>m.estado=="Activo");
    })
    console.log(this.listagps)
    if (this.listagps.length>0){
      for (let m of this.listagps){
        if(m.imei_gps==$event.target.value){
          this.gps=m;
        }
      }
      this.modelo=this.gps.modelo;
      this.servicioAcciones.getAcciones().subscribe(data => {
        this.listaacciones.pop()
        for (let ac of data) {
          if (ac.modelo.id_modelo == this.modelo.id_modelo) {
            this.listaacciones.push(ac);
          }
        }
      })
    }
  }

  /****Dialog para buscar gps****/
  abrirdialogoEditServiciogps(){
    this.titulo="Editar GPS"
    this.gps=new Gps();
    while (this.listaacciones.length>0){
      this.listaacciones.pop();
    }
    if (this.listaacciones.length<1){
      this.dialog.open(this.dialogEditServiciogps);
    }

  }

  /****Dilogo para elegir vehiculos****/
  abrirdialogoEditServiciovehiculo(idcli:any, det:Descripcion){
    this.detalleedi=det;
    this.titulo="Seleccione el vehiculo";
    this.serviceVehiculo.getVehiculoCli(idcli).subscribe(data=>{
      this.listvehiuclosCliSinSer=data.filter(m=>m.estado=="Activo")
      if (this.listvehiuclosCliSinSer.length>0){
        this.dialog.open(this.dialogEditServiciovehiculo);
      }else{
        this.snackBar.open("El cliente no posee vehiculos activos", "",{
          duration: 1 * 1000,
        });
      }
    })

  }

  /****Se habre el campo para ingresar datos de edicion de vehiuclos****/
  edithtmlvehiculo(iddetalle:any){
    this.titulo="Editar Vehiculo"
    this.serviciodescripcion.getByidDescrip(iddetalle).subscribe(data=>{
      this.detalleid=data;
      this.editv=true;
      this.allinfo=false
    })
  }

  /****Se habre el campo para ingresar datos de edicion de gps****/
  edithtmlgps(iddetalle:any){
    this.titulo="Editar GPS"
    this.serviciodescripcion.getByidDescrip(iddetalle).subscribe((data1:any)=>{
      this.detalleid=data1;
      this.editgps=true;
      this.allinfo=false
    })
  }

  /****Cancelar html****/
  cancelarnvehiculo() {
      this.editv=false;
      this.allinfo=true;
      this.listadetallen.pop();
      this.listadetallehistorial.pop();
      this.vernuvehiculo=false;
  }

  cancelarngps() {
    this.editgps=false;
    this.allinfo=true;
    this.listadetallen.pop();
    this.listadetallehistorial.pop();
    this.vernuvegps=false;
  }
  /**************/

  guardarcambiosVehiculo(idde:String){
    this.vehiculoedit=this.detalleid.vehiculo;
    this.vehiculoedit.estado="Cambiado";
    /****Editar vehiculo****/
      this.serviceVehiculo.editarVehiculos(this.vehiculoedit,this.vehiculoedit.id_vehiculo).subscribe(l=>{
        for (let nvg of this.listadetallen){
          nvg.estado="Activo"
          nvg.fecha_inst=new Date();
          /*****Crea la nueva descripcion con los nuevps datos*****/
          this.serviciodescripcion.crearDescrip(nvg).subscribe(d=>{
            this.vehiculoGet=nvg.vehiculo;
            this.vehiculoGet.estado="En servicio";
            /******Cambio de estado al nuevo vehiculo asignado para ese gps******/
            this.serviceVehiculo.editarVehiculos(this.vehiculoGet,this.vehiculoGet.id_vehiculo).subscribe(m=> {
              for (let dh of this.listadetallehistorial){
                this.historial.documentodescripcion=dh;
                this.historial.nombre="Vehiculo";
                this.historial.fecha_cam=new Date();
                /*****Crea el historial*****/
                this.serviceHistorial.crearHistorial(this.historial).subscribe(h=>{
                  dh.estado="Cambiado";
                  /******Cambia de estado al la descripcion******/
                  this.serviciodescripcion.editarDescrip(dh,idde).subscribe(dated=>{
                    window.location.reload();
                    this.snackBar.open("VEHICULO CAMBIADO", "",{
                      duration: 1 * 1000,
                    });
                  })

                })
              }

            })
          });
        }
      })
  }

  guardarcambiosGps(idde:String){
    this.gpsedit=this.detalleid.gps;
    this.gpsedit.estado="Cambiado";
    this.servicioGps.editGps(this.gpsedit,this.gpsedit.id_gps).subscribe(l=>{
      for (let nvg of this.listadetallen){
        nvg.estado="Activo"
        nvg.fecha_inst=new Date();
        this.serviciodescripcion.crearDescrip(nvg).subscribe(d=>{
          this.gpsGet=nvg.gps;
          this.gpsGet.estado="En servicio"
          this.servicioGps.editGps(this.gpsGet,this.gpsGet.id_gps).subscribe(m=> {
            for (let dh of this.listadetallehistorial){
              this.historial.documentodescripcion=dh;
              this.historial.nombre="Gps";
              this.historial.fecha_cam=new Date();
              this.serviceHistorial.crearHistorial(this.historial).subscribe(h=>{
                dh.estado="Cambiado"
                this.serviciodescripcion.editarDescrip(dh,idde).subscribe(dated=>{
                  window.location.reload();
                  this.snackBar.open("GPS CAMBIADO", "",{
                    duration: 1 * 1000,
                  });

                })

              })
            }

          })
        });
      }
    })
  }

}
