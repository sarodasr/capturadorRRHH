import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyAssoc, SolicitudCertificadoModel } from 'src/app/_interfaces';
import { EmpleadoService } from 'src/app/_services/empleado.service';
import { RequestsService } from 'src/app/_services/requests.service';

@Component({
  selector: 'app-solicitud-certificado',
  templateUrl: './solicitud-certificado.component.html',
  styleUrls: ['./solicitud-certificado.component.css']
})
export class SolicitudCertificadoComponent implements OnInit {
  submitted = false;
  nombreEmpleado = "...";
  username: string = localStorage.getItem("username")!;
  date = new Date();
  empleadoOK= false;
  errores: any;

  solicitud: SolicitudCertificadoModel ={
    companyID: 1,
    employeeCode: "",
    typeRequest: 1,
    dateNeeded: this.addDays(5),
    userID: this.username
  };

  strCompanies: string = localStorage.getItem('companies') || "{}";
  companies: CompanyAssoc[] = JSON.parse(this.strCompanies);

  public addDays(numOfDays: number): string {
    const hoy = new Date();

    hoy.setDate(hoy.getDate() + numOfDays);

    return hoy.toISOString().split('T')[0];
  }

  @ViewChild('sCertificadoForm') sAnticipoForm: NgForm | undefined;

  constructor(
    private empleadoService: EmpleadoService,
    private requestService: RequestsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit = ( form: NgForm) => {
    if (form.valid){
      this.requestService.crearCertificateRequest(this.solicitud)
      .subscribe( res => {
        if (res.codigo == 0){
          this.toastr.success("La solicitud ha sido procesada correctamente", "Success");
          this.nombreEmpleado = "...";
          form.reset();
        }else{
          this.toastr.error(res.mensaje, "Error",
          {
            timeOut: 10000,
            tapToDismiss: true
          });
        }
      }
      , error => {
        this.errores = error;
        this.toastr.error("Hubo un error al intentar realizar la operacion", "Error");
      });
      this.submitted = true;
    }
  }  

  onDataChange(){
    if (this.solicitud.employeeCode != ""){
      this.empleadoService.obtenerEmpleadoPorLlave(this.solicitud.companyID,this.solicitud.employeeCode).subscribe( 
        data =>{
        if (data.codigo == 0){
          this.nombreEmpleado = data.mensaje;
          this.empleadoOK = true;
        }else{
          this.sAnticipoForm?.controls["employeeCode"].setErrors({ required: true});
          this.sAnticipoForm?.controls["employeeCode"].markAsDirty();
          this.sAnticipoForm?.controls["employeeCode"].markAsTouched();
          this.empleadoOK = false;
          this.toastr.error(data.mensaje, "Error de búsqueda");
        }
      },
      error => {
        console.log(error);
        this.toastr.error("Hubo un error al intentar realizar la consulta", "Error");
      });
    }
  }
}
