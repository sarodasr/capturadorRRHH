import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { SolicitudAnticipoModel } from 'src/app/_interfaces/solicitud.anticipo.model';
import { EmpleadoService } from 'src/app/_services/empleado.service';
import { RequestsService } from 'src/app/_services/requests.service';
import { CompanyAssoc } from 'src/app/_interfaces';

@Component({
  selector: 'app-solicitud-anticipo',
  templateUrl: './solicitud-anticipo.component.html',
  styleUrls: ['./solicitud-anticipo.component.css']
})
export class SolicitudAnticipoComponent implements OnInit {
  submitted = false;
  nombreEmpleado = "...";
  username: string = localStorage.getItem("username")!;
  date = new Date();
  empleadoOK= false;
  errores: any;

  @ViewChild('sAnticipoForm') sAnticipoForm: NgForm | undefined;

  solicitud: SolicitudAnticipoModel = {
    companyID: 1,
    employeeCode: "",
    typeRequest: 1,
    ammount: 500.00,
    dateTBD: this.addDays(5),
    dateTSP: this.addDays(30),
    numberOP: 1,
    userID: this.username
  };

  strCompanies: string = localStorage.getItem('companies') || "{}";
  companies: CompanyAssoc[] = JSON.parse(this.strCompanies);

  constructor(
    private empleadoService: EmpleadoService,
    private requestService: RequestsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  public addDays(numOfDays: number): string {
    const hoy = new Date();

    hoy.setDate(hoy.getDate() + numOfDays);

    return hoy.toISOString().split('T')[0];
  }

  onSubmit = ( form: NgForm) => {
    if (form.valid){
      this.requestService.crearSalaryAdvanceRequest(this.solicitud)
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

  onTypeRequestChange(){
    if (this.solicitud.typeRequest != 3){
      this.solicitud.dateTSP = this.date.toISOString().split('T')[0];
      this.solicitud.numberOP = 1;
    }
  }
}
