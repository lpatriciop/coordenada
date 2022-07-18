import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Servicio} from "../../modelos/Servicio";
import {ServicioService} from "../../servicios/ServicioService";
import {ClienteNServicio} from "../../modelos/ClienteNServicio";
import {Cliente} from "../../modelos/Cliente";
import {ClienteService} from "../../servicios/ClienteService";
import {DescripcionService} from "../../servicios/DescripcionService";
import {Descripcion} from "../../modelos/Descripcion";


@Component({
  selector: 'app-ver-servicios',
  templateUrl: './ver-servicios.component.html',
  styleUrls: ['./ver-servicios.component.css']
})
export class VerServiciosComponent implements OnInit {


  displayedColumns: string[] = ['id', 'cedula', 'nombre','cant','detalles'];
  // @ts-ignore
  dataSource: MatTableDataSource<Cliente>;
  contservicios:any;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  datosCliente:Cliente[] = [];
  datosDetalle:Descripcion[] = [];

  listaClientes:Cliente[] = [];

  listServicios:Servicio[]=[];

  constructor(private serviceService:ServicioService,
              private clienteService:ClienteService,
              private detalleService:DescripcionService) {

  }

  ngOnInit(): void {
    this.listaServicios();
    this.servicios();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  listaServicios(){
    this.clienteService.getClient().subscribe(valuecliente => {
      this.datosCliente=valuecliente
        this.detalleService.getDescrip().subscribe(valuedetalle => {
          this.datosDetalle=valuedetalle;
           for (let dc of this.datosCliente){
            for (let dd of this.datosDetalle){
              if (dc.id_persona==dd.vehiculo.cliente.id_persona){
                if (this.listaClientes.length>0) {
                  let cont=0;
                  for (let lc of this.listaClientes){
                    if (lc.id_persona==dc.id_persona){
                      cont=1;
                    }
                  }
                  if (cont==0){
                    this.listaClientes.push(dc);
                  }
                }else{
                  this.listaClientes.push(dc);
                  console.log("Guarda primero")
                }
                this.dataSource = new MatTableDataSource(this.listaClientes);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
            }
          }

        })
    })

  }


  servicios(){
    this.serviceService.getServices().subscribe(value => {
      this.listServicios=value;
    })
  }


  contarServicios(id:String){
    let cont=0;
    for (let numser of this.listServicios){
      if (numser.id_cliente=id){
        cont++;
      }
    }
    this.contservicios=cont
  }
}


