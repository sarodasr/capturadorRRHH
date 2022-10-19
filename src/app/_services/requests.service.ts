import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseRetornoModel } from '../_interfaces/baseretorno.model'
import { tokenGetterLocal } from '../app.module';
import { Observable, timeout } from 'rxjs';
import { SolicitudAnticipoModel, SolicitudCertificadoModel, SolicitudVacacionesModel } from '../_interfaces';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  myAppUrl = environment.myAppUrl;
  myAppEndpoint = this.myAppUrl.concat("Requests/");
  token = tokenGetterLocal();
  invalidRequest = false;
  headers = {
    headers: new HttpHeaders({ 
      "Content-type" : "application/json",
      "timeout": "45000"
    })
  }; 

  constructor(private http: HttpClient) { }

  crearVacationRequest(request: SolicitudVacacionesModel): Observable<BaseRetornoModel>{
    var methodName = "Vacation";
    return this.http.post<BaseRetornoModel>(this.myAppEndpoint + methodName, request, this.headers);
  }

  crearSalaryAdvanceRequest(request: SolicitudAnticipoModel): Observable<BaseRetornoModel>{
    var methodName = "SalaryAdvance";
    return this.http.post<BaseRetornoModel>(this.myAppEndpoint + methodName, request, this.headers);
  }

  crearCertificateRequest(request: SolicitudCertificadoModel): Observable<BaseRetornoModel>{
    var methodName = "Certificate";
    return this.http.post<BaseRetornoModel>(this.myAppEndpoint + methodName, request, this.headers);
  }
}
