import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseRetornoModel, ResetPasswordModel } from 'src/app/_interfaces';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent implements OnInit {
  mensaje: string = "";
  userID: string = localStorage.getItem("username") || '';
  solicitud: ResetPasswordModel ={
    userID: this.userID,
    OTP: '',
    new_password_1: '',
    new_password_2: ''
  };

  myAppUrl = environment.myAppUrl;
  myAppEndpoint = this.myAppUrl.concat("Auth");

  headers = {
    headers: new HttpHeaders({ "Content-type" : "application/json"})
  };   

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
  }

  resetPassword = ( form: NgForm) => {
    var methodName: string = "/ActionResetPassword";
    if (form.valid){
      this.http.post<BaseRetornoModel>(this.myAppEndpoint + methodName, this.solicitud, this.headers)
      .subscribe({
        next: (response: BaseRetornoModel) =>{
          if (response.codigo == 0){
            this.toastr.success(response.mensaje,"Clave reiniciada");
            this.router.navigate(['/login']);
          }else{
            this.mensaje = response.mensaje;
            this.toastr.error(response.mensaje, "Error",{
              timeOut: 15000,
              extendedTimeOut: 25000,
              tapToDismiss: true
            });
          }
        }
      });
    }
  }
}
