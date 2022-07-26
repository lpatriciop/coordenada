import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Cliente} from "../../modelos/Cliente";
import {ClienteService} from "../../servicios/ClienteService";
import {Gps} from "../../modelos/Gps";
import {GpsService} from "../../servicios/GpsService";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-ver-gps',
  templateUrl: './ver-gps.component.html',
  styleUrls: ['./ver-gps.component.css']
})
export class VerGpsComponent implements OnInit {

  columnas: string[] = ['id', 'num_gps', 'num_sim', 'imei' , 'estado','editar','eliminar'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  // @ts-ignore
  dataSource: MatTableDataSource<Gps>;

  @ViewChild('eliminarGps')
  eliminarGps!: TemplateRef<any>;

  datos: Gps[] = [];

  gpsElimnar:Gps=new Gps();

  listaGps:Array<Gps>=[];
  title="";
  editar=false;
  eliminar=false;

  constructor(private servicegps:GpsService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.ListaGps();
  }

  ListaGps(){
    this.servicegps.getGps().subscribe((x:any) =>{
      this.listaGps=x
      for (let a of this.listaGps){
        this.datos.push(a);
        this.dataSource = new MatTableDataSource<any>(this.datos);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abrirDialogoEliminar(data:Gps) {
    this.eliminar=true;
    this.editar=false;
    this.title="Esta seguro de eliminar?"
    this.gpsElimnar=data;
    this.dialog.open(this.eliminarGps);
  }

  abrirDialogoActivar(data:Gps){
    this.eliminar=false;
    this.editar=true;
    this.title="Activación del GPS"
    this.gpsElimnar=data;
    this.dialog.open(this.eliminarGps);
  }

  EliminarGps(){
    this.gpsElimnar.estado="Inactivo";
    this.servicegps.editGps(this.gpsElimnar,this.gpsElimnar.id_gps).subscribe(value => {
      this.snackBar.open("El GPS CON IMEI"+this.gpsElimnar.imei_gps+" HA SIDO INABILITADO", "",{
        duration: 1 * 1000,
      });
    })
  }

  ActivarGps(){
    this.gpsElimnar.estado="Activo";
    this.servicegps.editGps(this.gpsElimnar,this.gpsElimnar.id_gps).subscribe(value => {
      this.snackBar.open("El GPS CON IMEI"+this.gpsElimnar.imei_gps+" HA SIDO HABILITADO", "",{
        duration: 1 * 1000,
      });
    })
  }


}




export class ArticulosVh {
  constructor(public cliente: Cliente) {
    console.log(cliente)
  }
}
