import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseRetornoModel } from '../_interfaces/baseretorno.model'
import { tokenGetterLocal } from '../app.module';
import { Observable } from 'rxjs';
import { CatalogoModel } from '../_interfaces';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  myAppUrl = environment.myAppUrl;
  myAppEndpoint = this.myAppUrl.concat("Catalog");
  token = tokenGetterLocal();
  invalidRequest = false;

  headers = {
    headers: new HttpHeaders({ "Content-type" : "application/json"})
  }; 

  constructor(private http: HttpClient) { }

  public getCatalogo(codigo: string, todos: boolean = true): Observable<CatalogoModel>{
    let query = {
      CatalogCode: codigo,
      All: todos
    };

    return this.http.get<CatalogoModel>(this.myAppEndpoint, {params: query});
  }
}
