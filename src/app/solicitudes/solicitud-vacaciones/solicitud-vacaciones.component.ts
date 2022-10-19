import { Component, OnInit, ViewChild } from '@angular/core';
import {  SolicitudVacacionesModel} from '../../_interfaces/solicitud.vacaciones.model'
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { EmpleadoService } from 'src/app/_services/empleado.service';
import { ToastrService } from 'ngx-toastr';
import { RequestsService } from 'src/app/_services/requests.service';
import { CompanyAssoc } from 'src/app/_interfaces';

@Component({
  selector: 'app-solicitud-vacaciones',
  templateUrl: './solicitud-vacaciones.component.html',
  styleUrls: ['./solicitud-vacaciones.component.css']
})
export class SolicitudVacacionesComponent implements OnInit {
  submitted = false;
  empleadoOK = false;
  username: string = localStorage.getItem("username")!;
  nombreEmpleado = "...";
  date = new Date();

  @ViewChild('sVacacionesForm') sVacaciones: NgForm | undefined;

  solicitud: SolicitudVacacionesModel = {
    ID: 0,
    companyID: 1,
    employeeCode: "",
    dateEnd: this.date.toISOString().split('T')[0],
    dateStart: this.date.toISOString().split('T')[0],
    comments: "",
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
      this.requestService.crearVacationRequest(this.solicitud)
      .subscribe( res => {
        if (res.codigo == 0){
          this.toastr.success("La solicitud ha sido procesada correctamente", "Success");
          this.nombreEmpleado = "...";
          form.reset();
        }else{
          this.toastr.error(res.mensaje, "Error");
        }
      });
      this.submitted = true;
    }
  }

  onDataChange(){
    if (this.solicitud.employeeCode != ""){
      this.empleadoService.obtenerEmpleadoPorLlave(this.solicitud.companyID,this.solicitud.employeeCode).subscribe( data =>{
        if (data.codigo == 0){
          this.nombreEmpleado = data.mensaje;
          this.empleadoOK = true;
        }else{
          this.sVacaciones?.controls["employeeCode"].setErrors({ required: true});
          this.sVacaciones?.controls["employeeCode"].markAsDirty();
          this.sVacaciones?.controls["employeeCode"].markAsTouched();
          this.empleadoOK = false;
          this.nombreEmpleado = "...";
          this.toastr.error(data.mensaje, "Error de búsqueda");
        }
      });
    }
  }
}
