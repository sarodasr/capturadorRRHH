import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ResetPwdComponent } from './login/reset-pwd/reset-pwd.component';
import { EmpleadoAltaComponent } from './nomina/empleado-alta/empleado-alta.component';
import { SolicitudAnticipoComponent } from './solicitudes/solicitud-anticipo/solicitud-anticipo.component';
import { SolicitudCertificadoComponent } from './solicitudes/solicitud-certificado/solicitud-certificado.component';
import { SolicitudVacacionesComponent } from './solicitudes/solicitud-vacaciones/solicitud-vacaciones.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/reset-pwd', component: ResetPwdComponent },
  { path: 'nomina/altas', component: EmpleadoAltaComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'solicitud/solicitud-anticipo', component: SolicitudAnticipoComponent, canActivate: [AuthGuard] },
  { path: 'solicitud/solicitud-vacaciones', component: SolicitudVacacionesComponent, canActivate: [AuthGuard] },
  { path: 'solicitud/solicitud-certificado', component: SolicitudCertificadoComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
