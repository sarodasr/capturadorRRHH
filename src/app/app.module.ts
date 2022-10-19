import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SolicitudAnticipoComponent } from './solicitudes/solicitud-anticipo/solicitud-anticipo.component';
import { SolicitudVacacionesComponent } from './solicitudes/solicitud-vacaciones/solicitud-vacaciones.component';
import { EmpleadoAltaComponent } from './nomina/empleado-alta/empleado-alta.component';
import { SolicitudCertificadoComponent } from './solicitudes/solicitud-certificado/solicitud-certificado.component';
import {  CompanyAssoc } from './_interfaces/authenticateresponse.model';
import { ResetPwdComponent } from './login/reset-pwd/reset-pwd.component';

export function tokenGetterLocal(){
  var token = localStorage.getItem("jwt");
  return token;
}

export function getCompanies(){
  var strCompanies: string = localStorage.getItem('companies') || "{}";
  return strCompanies;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CustomersComponent,
    TopBarComponent,
    SolicitudAnticipoComponent,
    SolicitudVacacionesComponent,
    EmpleadoAltaComponent,
    SolicitudCertificadoComponent,
    ResetPwdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("jwt");
        },
        allowedDomains: ["localhost:44369","127.0.0.1:44369", "localhost:4200", "127.0.0.1:4200"],
        disallowedRoutes: [],
        authScheme: 'Bearer '
      }      
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
