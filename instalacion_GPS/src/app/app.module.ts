import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import {RouterModule, Routes} from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "../material/material.module";
import { CuerpoComponent } from './modulos/cuerpo/cuerpo.component';
import { InicioSesionComponent } from './modulos/inicio-sesion/inicio-sesion.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegistroUsuariosComponent } from './modulos/registro-usuarios/registro-usuarios.component';
import { VerServiciosComponent } from './modulos/ver-servicios/ver-servicios.component';
import { VerClientesComponent } from './modulos/ver-clientes/ver-clientes.component';
import { VerVehiculosComponent } from './modulos/ver-vehiculos/ver-vehiculos.component';
import { VerGpsComponent } from './modulos/ver-gps/ver-gps.component';
import { NuevoModeloGpsComponent } from './modulos/nuevo-modelo-gps/nuevo-modelo-gps.component';
import {HttpClientModule} from "@angular/common/http";
import { NuevoServicioComponent } from './modulos/nuevo-servicio/nuevo-servicio.component';
import { NuevoClienteComponent } from './modulos/nuevo-cliente/nuevo-cliente.component';
import { NuevoGpsComponent } from './modulos/nuevo-gps/nuevo-gps.component';
import { NuevoVehiculoComponent } from './modulos/nuevo-vehiculo/nuevo-vehiculo.component';
import { VerServicioClienteComponent } from './modulos/ver-servicio-cliente/ver-servicio-cliente.component';
import { EditarServicioComponent } from './modulos/editar-servicio/editar-servicio.component';
import { SeleccionPlanComponent } from './modulos/seleccion-plan/seleccion-plan.component';
import { AsignacionRolesComponent } from './modulos/asignacion-roles/asignacion-roles.component';
import { RolIngresoComponent } from './modulos/rol-ingreso/rol-ingreso.component';
import { MesajesEmailComponent } from './modulos/mesajes-email/mesajes-email.component';
import { EditarUserComponent } from './modulos/editar-user/editar-user.component';
import { GenerarRolesComponent } from './modulos/registro-usuarios/generar-roles/generar-roles.component';

const routes: Routes = [
  {path:'', component:CuerpoComponent},
  {path:'iniciasesion', component:InicioSesionComponent},
  {path:'registrousuario', component:RegistroUsuariosComponent},
  {path:'verservicios', component:VerServiciosComponent},
  {path:'verservicio/cliente=/:id', component:VerServicioClienteComponent},
  {path:'verclientes', component:VerClientesComponent},
  {path:'vervehiculos', component:VerVehiculosComponent},
  {path:'vervehiculos/:id', component:VerVehiculosComponent},
  {path:'vergps', component:VerGpsComponent},
  {path:'nuevomodelogps', component:NuevoModeloGpsComponent},
  {path:'nuevoservicio/:id', component:NuevoServicioComponent},
  {path:'nuevocliente', component:NuevoClienteComponent},
  {path:'nuevocliente/:id', component:NuevoClienteComponent},
  {path:'nuevovehiculo', component:NuevoVehiculoComponent},
  {path:'nuevovehiculo/:id', component:NuevoVehiculoComponent},
  {path:'nuevogps', component:NuevoGpsComponent},
  {path:'nuevogps/:id', component:NuevoGpsComponent},
  {path:'seleccion/plan', component:SeleccionPlanComponent},
  {path:'verservicio/cliente/edit/:id', component:EditarServicioComponent},
  {path:'asignacionroles', component:AsignacionRolesComponent},
  {path:'rol_ingreso', component:RolIngresoComponent},
  {path:'Mensaje/email', component:MesajesEmailComponent},
  {path:'editaruser/:idpersona', component:EditarUserComponent},
  {path:'dar/roles/:idpersona', component:GenerarRolesComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    CuerpoComponent,
    InicioSesionComponent,
    RegistroUsuariosComponent,
    VerServiciosComponent,
    VerClientesComponent,
    VerVehiculosComponent,
    VerGpsComponent,
    NuevoModeloGpsComponent,
    NuevoServicioComponent,
    NuevoClienteComponent,
    NuevoGpsComponent,
    NuevoVehiculoComponent,
    VerServicioClienteComponent,
    EditarServicioComponent,
    SeleccionPlanComponent,
    AsignacionRolesComponent,
    RolIngresoComponent,
    MesajesEmailComponent,
    EditarUserComponent,
    GenerarRolesComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
