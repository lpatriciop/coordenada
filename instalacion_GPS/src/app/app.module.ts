import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {GuardsGuard  as guard} from './Guards/guards.guard';
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
import {MatSidenavModule} from "@angular/material/sidenav";
import {LayoutModule} from "@angular/cdk/layout";

const routes: Routes = [
  {path:'', component:CuerpoComponent},
  {path:'iniciasesion', component:InicioSesionComponent},
  {path:'registrousuario', component:RegistroUsuariosComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'verservicios', component:VerServiciosComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'verservicio/cliente=/:id', component:VerServicioClienteComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'verclientes', component:VerClientesComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}
  },
  {path:'vervehiculos', component:VerVehiculosComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'vervehiculos/:id', component:VerVehiculosComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'vergps', component:VerGpsComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'nuevomodelogps', component:NuevoModeloGpsComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'nuevoservicio/:id', component:NuevoServicioComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'nuevocliente', component:NuevoClienteComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'nuevocliente/:id', component:NuevoClienteComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'nuevovehiculo', component:NuevoVehiculoComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'nuevovehiculo/:id', component:NuevoVehiculoComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'nuevogps', component:NuevoGpsComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'nuevogps/:id', component:NuevoGpsComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'seleccion/plan', component:SeleccionPlanComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'verservicio/cliente/edit/:id', component:EditarServicioComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'asignacionroles', component:AsignacionRolesComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'rol_ingreso', component:RolIngresoComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'Mensaje/email', component:MesajesEmailComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'actualizar/datos/:idpersona', component:EditarUserComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
  {path:'dar/roles/:idpersona', component:GenerarRolesComponent,
    canActivate:[guard],
    data: { expectedRol: ['rolAdmin']}},
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
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
