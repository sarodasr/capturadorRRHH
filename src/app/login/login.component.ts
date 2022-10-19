import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailValidator, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatedResponse, BaseRetornoModel, LoginModel, ReqPwdResetModel } from '../_interfaces';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  responseMsg: string = "";
  credentials: LoginModel = { username: '', userpassword: '' };
  reqPwdRset: ReqPwdResetModel = { email: '' };
  formModal: any;
  myAppUrl = environment.myAppUrl;
  myAppEndpoint = this.myAppUrl.concat("Auth");

  headers = {
    headers: new HttpHeaders({ "Content-type" : "application/json"})
  }; 

  @ViewChild('closeButton') closeButton: any;
  @ViewChild('emailR') emailR: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  solicitaReset(){
    var methodName: string = "/ResetPassword";    
    if (this.validaEmail(this.reqPwdRset.email)){
      this.http.post<BaseRetornoModel>(this.myAppEndpoint + methodName, this.reqPwdRset, this.headers)
      .subscribe({
        next: (response: BaseRetornoModel) =>{
          if (response.codigo == 0 ){
            localStorage.setItem("username", response.mensaje);
            this.router.navigate(['/login/reset-pwd']);
          }else{
            alert(response.mensaje);
          }
        }
        ,error: (err: HttpErrorResponse) => {
          alert("No hemos logrado procesar la solicitud de reinicio de clave. Por favor intenta nuevamente");
          console.log(err);
        }
      });
    }else{
      this.emailR.setErrors({ required: true });
      this.emailR.markAsDirty();
      this.emailR.markAsTouched();
    }
    this.closeButton.nativeElement.click();
  }

  validaEmail(direccion: string): boolean{
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const email: string = direccion;
    const result: boolean = expression.test(email);
    
    return result;
  }

  login = ( form: NgForm) => {
    if (form.valid){
      this.http.post<AuthenticatedResponse>(this.myAppEndpoint, this.credentials, this.headers)
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.token;
          localStorage.setItem("username", this.credentials.username);
          localStorage.setItem("nombre", response.nombre);
          localStorage.setItem("jwt", token);
          localStorage.setItem("companies", JSON.stringify(response.companies));
          localStorage.setItem("elementos", JSON.stringify(response.elementos));
          this.invalidLogin = false;
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          this.invalidLogin = true;
          if (err.status == 401){
            if (err.error){
              this.responseMsg =  err.error.mensaje;
            }
          }else{
            this.responseMsg = err.message;
          }
        }
      })
    }
  }

}
