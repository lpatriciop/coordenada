import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Modelo} from "../../modelos/Modelo";
import {MensajesMail} from "../../modelos/MensajesMail";
import {ModeloService} from "../../servicios/ModeloService";
import {EmailService} from "../../servicios/EmailService";
import {Plan} from "../../modelos/Plan";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-mesajes-email',
  templateUrl: './mesajes-email.component.html',
  styleUrls: ['./mesajes-email.component.css']
})
export class MesajesEmailComponent implements OnInit {

  titulo="";
  editing=false;
  creating=false;
  btncrear=true;

  listaMensajes=['CONTRATO','PAGO DE PLAN','PAGO MENSUAL','AGOTAMIENTO DE SERVICIO','VENCIMIENTO DE PLAN'];
  listaMensajes1=['CONTRATO','PAGO DE PLAN','PAGO MENSUAL','AGOTAMIENTO DE SERVICIO','VENCIMIENTO DE PLAN'];

  mensage:MensajesMail=new MensajesMail();

  listaEmail:Array<MensajesMail>=[];

  @ViewChild('dialogMessage')
  dialogMessage!: TemplateRef<any>;

  constructor(private messageService:EmailService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listarMensajes();
  }

  abrirdialoMessager(){
    this.listarMensajes();
    this.mensage=new MensajesMail();
    this.editing=false;
    this.creating=true;
    this.titulo="Crear Mensaje"
    this.dialog.open(this.dialogMessage,{
      height: '70%',
      width: '30%',
    });
  }

  //----------------Validaciones-----------------
  validacionMensaje = new FormGroup({
    //emiMail:new FormControl('',[Validators.required, Validators.email]),
    tipoMensaje: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    title: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    mensaje:new FormControl(''),
  });

  public hasError = (controlName: string, errorName: string) =>{
    return this.validacionMensaje.controls[controlName].hasError(errorName);
  }
  //----------------------metodo para crear-----------------------
  crearMensaje(){
    this.mensage.title=this.mensage.tipoMensaje.toUpperCase();
    this.messageService.crearMensajeEmail(this.mensage).subscribe((data:any)=>{
      this.snackBar.open("MENSAJE DE "+this.mensage.tipoMensaje+" CREADO", "",{
        duration: 1 * 1000,
      });
      this.listarMensajes();
    })
  }
  //----------------listado---------------------------
  listarMensajes(){
    this.listaMensajes=this.listaMensajes1;
    this.messageService.getMensajesEmail().subscribe((data:any)=>{
      this.listaEmail=data;
      for (let em of this.listaEmail){
        this.listaMensajes=this.listaMensajes.filter(value => {return value!=em.tipoMensaje});
      }
      if (this.listaMensajes.length<=0){
        this.btncrear=false;
      }
    })
  }
  //--------------------Metodo de modificacion--------
  abrirdialogoEdi(id:String){
    this.listaMensajes=new Array();
    this.editing=true;
    this.creating=false;
    this.messageService.getMensajeEmail(id).subscribe(data=>{
      this.listaMensajes.push(data.title)
      this.mensage=data;
      this.titulo="Editar Mensage"
      this.dialog.open(this.dialogMessage);
    })
  }

  editarMensaje(){
    this.mensage.title=this.mensage.tipoMensaje.toUpperCase();
    this.messageService.editMensajeEmail(this.mensage,this.mensage.id).subscribe((data:any)=>{
      this.listarMensajes()
      this.snackBar.open("MENSAJE DE "+this.mensage.tipoMensaje+" EDITADO", "",{
        duration: 1 * 1000,
      });
    })
  }




}
