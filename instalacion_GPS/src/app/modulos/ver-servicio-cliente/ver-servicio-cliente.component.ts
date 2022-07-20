import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Servicio} from "../../modelos/Servicio";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ServicioService} from "../../servicios/ServicioService";
import {ActivatedRoute, Route} from "@angular/router";
import {Cliente} from "../../modelos/Cliente";
import {MatDialog} from "@angular/material/dialog";
import {DescripcionService} from "../../servicios/DescripcionService";
import {AccionesService} from "../../servicios/AccionesService";
import {Descripcion} from "../../modelos/Descripcion";
import {Pagos} from "../../modelos/Pagos";
import {PagosService} from "../../servicios/PagosService";
import {PlanService} from "../../servicios/PlanService";
import {Plan} from "../../modelos/Plan";
import {MatSnackBar} from "@angular/material/snack-bar";
import Swal from "sweetalert2";
import {DatePipe} from "@angular/common";
import pdfMake from 'pdfmake/build/pdfmake';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import pdfFonts from 'pdfmake/build/vfs_fonts';
//import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-ver-servicio-cliente',
  templateUrl: './ver-servicio-cliente.component.html',
  styleUrls: ['./ver-servicio-cliente.component.css']
})
export class VerServicioClienteComponent implements OnInit {

  listavehiculosAsignados=[];

  // @ts-ignore
  dataSource1: MatTableDataSource<Pagos>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  Columns: string[] = ['id', 'cantidad', 'fecha'];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'fechas','hora', 'fechaI','fechaF','fechaFinPlan','estadoSer','activar','detalles','editar','eliminar'];
  // @ts-ignore
  dataSource: MatTableDataSource<Servicio>;

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  @ViewChild('dialogRefActivacion')
  dialogRefActivacion!: TemplateRef<any>;

  @ViewChild('dialogRefdetallePago')
  dialogRefdetallePago!: TemplateRef<any>;


  title = 'angular-material-dialog-app';
  monto:any;
  costo:any;

  datos: Servicio[] =[];
  infodetalle: Descripcion[]= [];
  infodetallePagos: Pagos[]= [];

  listaSevicios:Array<Servicio>=[];

  id:any;
  cliente:Cliente=new Cliente();
  servicio:Servicio=new Servicio();
  servicioGet:Servicio=new Servicio();
  detalle:Descripcion;
  detalles:Descripcion[];
  pago:Pagos=new Pagos();
  pagoGet:Pagos=new Pagos();
  plan:Plan=new Plan();

  constructor(private serviceService:ServicioService,
              private route:ActivatedRoute,
              public dialog: MatDialog,
              private detalleService:DescripcionService,
              private acciones:AccionesService,
              private pagoService:PagosService,
              private servicePlan:PlanService,
              private snackBar: MatSnackBar,
              /*private toastr: ToastrService*/) {

  }
  ngOnInit(): void {
    this.listaServicios();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listaServicios(){
    this.id=this.route.snapshot.params['id'];
    if (this.id){
      this.detalleService.getByidCliente(this.id).subscribe((data:any)=>{
        console.log(data);
        this.detalle=data.find((m)=>{return m.vehiculo.cliente.id_persona==this.id});
        this.detalles=data;
          this.serviceService.getServiciosCliente(this.detalle.vehiculo.cliente.id_persona).subscribe((data1:any)=>{
            this.datos=data1;
            this.cliente=this.detalle.vehiculo.cliente;
            console.log(this.datos)
            this.dataSource = new MatTableDataSource(this.datos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });

      })
    }else {
      console.log("Crear")
    }
  }


  //Detalles Del Servicio
  openTempDialog(id:String) {
    this.detalleService.getDescrip().subscribe((value1:any)=>{
      this.infodetalle=value1.filter((m)=> m.documentoservicio.id_documentoservicio==id);
    })
    this.dialog.open(this.dialogRef);
  }

  //Detalle de los pagos
  openDialogoDetallePagos(id_service:any){
    this.pagoService.getPagosByService(id_service).subscribe(value => {
      this.infodetallePagos=value;
      console.log(this.infodetallePagos)
      this.dialog.open(this.dialogRefdetallePago);
      this.dataSource1 = new MatTableDataSource(this.infodetallePagos);
      this.dataSource1.paginator = this.paginator1;
    })
  }

  //Ventana de Activación
  openTempDialogPagos(id:String) {
    this.servicio.costo=0;
    this.pago.cantidad_p=0;
    this.serviceService.getService(id).subscribe((value1:any)=>{
      this.servicioGet=value1;
      this.servicio.costo_plan=this.servicioGet.costo_plan;
      this.servicio.fecha_fin_plan=this.servicioGet.fecha_fin_plan;
      this.servicePlan.getPlan(this.servicioGet.idplan).subscribe((value:any)=>{
        this.plan=value;
        this.monto=this.plan.costo_p-this.servicioGet.costo;
      })
    })
    this.dialog.open(this.dialogRefActivacion);
  }

  //Activacion del servicio
  activarservicio(id:any){
      this.serviceService.getService(id).subscribe((data:any)=>{
        this.servicioGet=data;
        this.servicio=this.servicioGet;

        let cant= this.pago.cantidad_p/this.servicioGet.costo_plan;
        let mesmili = ((1000 * 60 * 60 * 24 * 7 * 4)+((1000*60*60*24)*2)) *cant;
        if(this.servicioGet.fecha_fin!=null){
          console.log("Hay fecha fin")
          var date=new Date(this.servicioGet.fecha_fin);
        }else{
          var date=new Date(this.servicioGet.fecha_ds);
          console.log("No Hay fecha fin")
        }
        this.servicio.fecha_fin = new Date(date.getTime()+mesmili);
        this.servicio.estado="Activo"

        if (this.costo>0){
          this.servicio.costo=Number(this.servicioGet.costo)+Number(this.costo);
        }

        var dayfinplan=new Date(this.servicio.fecha_fin_plan);
        var dayfin=new Date(this.servicio.fecha_fin);

        if (this.monto>=this.costo){
          if (dayfinplan>=dayfin){
            this.serviceService.editarService(this.servicio,id).subscribe((datas:any)=>{
              console.log("Actializado el servicio")
              this.pago.docservice=datas;
              this.pago.fecha_pago=new Date();
              console.log(this.pago)
              if (this.pago.cantidad_p<=0){
                window.location.reload();
              }else{
                this.pagoService.crearPagos(this.pago).subscribe((value:any)=>{
                  console.log("Pago realizado")
                  window.location.reload();
                })
              }

            })
          }else{
            // @ts-ignore
            Swal.fire({
              icon: 'warning',
              title: 'Error',
              text: "La fecha maxima a pagar es hasta" +this.servicio.fecha_fin_plan,
              confirmButtonColor: "#0c3255"
            })
          }
        }else{
          // @ts-ignore
          Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: "Solo tiene que pagar: $"+this.monto,
            confirmButtonColor: "#0c3255"
          })
        }

      })
  }


  //--Documento Imprecion-//
  async createPdf() {
    var fecha: String = new Date().toISOString();
    var pipe: DatePipe = new DatePipe('en-US')

    const pdfDefinition: any = {

      background: [
        {
          image: await this.getBase64ImageFromURL('assets/Imagenes/LogoCoordenadas.png'),
          width:150,height:50
        }
      ],
      content: [

        {
          text: '_________________________________________________________________________________________',
          alignment: 'center'
        },

        {text: 'INFORMACION GENERAL', fontSize: 13, bold: true, alignment: 'center'},
        {text: '    '},
        {
          fontSize: 13,
          table: {
            widths: ['50%', '50%'],
            body: [

              ['NOMBRE:' + this.cliente.nombre, 'RUC/CLI:' + this.cliente.cedula],
              ['DIRECCION: ' + this.cliente.direccion, 'CORREO: ' + this.cliente.correo],
              [ 'FECHA ENTREGA: ' + pipe.transform(this.servicio.fecha_ds, 'dd/MM/yyyy'), 'TELEFONO: ' + this.cliente.telefono],
              ['FECHA INICIO: ' + pipe.transform(this.servicio.fecha_inicion, 'dd/MM/yyyy'), 'FECHA FIN: ' + pipe.transform(this.servicio.fecha_fin, 'dd/MM/yyyy')],
              ['ATENDIDO POR: Angel Villa', 'HORAS: ' + this.servicio.hora],
            ]
          }
        },
        {text: '    '},
        {
          text: 'DETALLES', fontSize: 13, bold: true, alignment: 'center'
        },
        this.getEducationObject(this.infodetalle),

        {text: '    '},
        {
          text: 'OBSERVACIONES', fontSize: 13, bold: true, alignment: 'center'
        },
        this.getEducationSObject(this.infodetalle),
        {text: '    '},
        {
          columns : [
            { qr: this.servicio.costo + ', Cliente : ' + this.cliente.nombre, fit : 100 },

          ]
        },

      ]
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();

  }

  getEducationObject(educations:any[]) {
    return {
      table: {
        widths: ['*', '*', '*', '*', '*'],
        body: [
          [{
            text: 'Placa',
            style: 'tableHeader'
          },
            {
              text: 'Vehiculo',
              style: 'tableHeader'
            },
            {
              text: 'Id Gps',
              style: 'tableHeader'
            },
            {
              text: 'Imei',
              style: 'tableHeader'
            }
            ,
            {
              text: 'Modelo',
              style: 'tableHeader'
            },

          ],
          ...educations.map(ed => {
            return [ed.vehiculo.placa,ed.vehiculo.vehiculo,ed.gps.id_gps, ed.gps.imei_gps, ed.gps.modelo.nombre];
          })
        ]
      }
    };
  }

  getEducationSObject(educations:any[]) {
    return {
      table: {
        widths: ['*','*', '*'],
        body: [
          [
            {
              text: 'Placa',
              style: 'tableHeader'
            },
            {
              text: 'Observaciones',
              style: 'tableHeader'
            }
            ,
            {
              text: 'Ubicacion',
              style: 'tableHeader'
            },
          ],
          ...educations.map(ed => {
            return [ed.vehiculo.placa,ed.observacion,ed.ubicacion];
          })
        ]
      }
    };
  }


  getBase64ImageFromURL(url: any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        // @ts-ignore
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }




}

