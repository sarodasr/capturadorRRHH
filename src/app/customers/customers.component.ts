import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tokenGetterLocal } from '../app.module';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    var headers_objet = new HttpHeaders();
    headers_objet.append('Authorization', 'Bearer' + tokenGetterLocal());

    const httpOptions = {
      headers: headers_objet
    }
    this.http.get("https://localhost:44369/api/customers"
    )
    .subscribe({
      next: (result: any) => this.customers = result,
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }

}
