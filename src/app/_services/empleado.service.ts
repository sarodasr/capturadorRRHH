import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseRetornoModel } from '../_interfaces/baseretorno.model'
import { tokenGetterLocal } from '../app.module';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../_interfaces/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  myAppUrl = environment.myAppUrl;
  myAppEndpoint = this.myAppUrl.concat("Employee/");
  token = tokenGetterLocal();

  constructor(private http: HttpClient) { }

  headers = {
    headers: new HttpHeaders({ "Content-type" : "application/json"})
  }; 

  obtenerEmpleadoPorLlave(companyID: number, employeeCode: string): Observable<BaseRetornoModel>{
    var methodName = "GetEmployeeNameByID";
    let query = {
      CompanyID: companyID,
      EmployeeCode: employeeCode
    };
    return this.http.get<BaseRetornoModel>(this.myAppEndpoint + methodName, { params: query});
  }

  agregarEmpleado(request: EmployeeModel): Observable<BaseRetornoModel>{
    var methodName = "AddEmployee";
    return this.http.post<BaseRetornoModel>(this.myAppEndpoint + methodName, request, this.headers);
  }
}
