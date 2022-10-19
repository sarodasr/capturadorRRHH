import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { getCompanies } from 'src/app/app.module';
import { CatalogoModel, CompanyAssoc } from 'src/app/_interfaces';
import { EmployeeModel } from 'src/app/_interfaces/employee.model';
import { CatalogoService } from 'src/app/_services/catalogo.service';
import { EmpleadoService } from 'src/app/_services/empleado.service';

@Component({
  selector: 'app-empleado-alta',
  templateUrl: './empleado-alta.component.html',
  styleUrls: ['./empleado-alta.component.css']
})
export class EmpleadoAltaComponent implements OnInit {

  employeeBAC01: string = "N/A";
  employeeBAC02: string = "";

  empleado: EmployeeModel = {
    companyID: 1,
    employeeCode: "",
    employeeName: "",
    employeeLastName: "",
    employeeLastName2: "",
    employeeDOB: this.addDays(0),
    employeeBT: "",
    employeeGender: "",
    employeeLanguage: "Español",
    employeeLocalLanguage: "**",
    employeeCollegeDegree: "",
    employeeFN: "",
    employeeMN: "",
    employeeSN: 0,
    employeeUG: false,
    employeeBACAcct: "",
    employeeIDT: "DPI",
    employeeIDNo: "",
    employeeSSN: "",
    employeeNIT: "",
    employeePRO: "Bachiller en CCLL",
    employeeCT: "GTM",
    employeeCY: "9",
    employeeTW: "Guatemala",
    employeeET: "LADINO",
    employeeMS: "SOLTERO",
    employeeADDR: "",
    employeeHS: "PROPIA",
    employeeHT: "",
    employeeCP: "",
    employeeEM: "",
    employeeJOBTi: "",
    employeeJOBSB: 0,
    employeeJOBVT: 0,
    employeeJOBDS: this.addDays(0),
    employeeJOBBB: 0,
    employeeJOBJJY: "LUN-VIE",
    employeeJOBHS: "08:00",
    employeeJOBHT: "17:00",
    employeeJOBSJY: '**',
    employeeJOBSHS: "08:00",
    employeeJOBSHT: "12:00",
    employeeDATE: 0,
    employeeDAMX: "",
    employeeDACT: "",
    employeeDANOP: "",
    employeeDAMSG: "",
    employeeSOSName: "",
    employeeSOSPhone: "",
    employeeSOSWho: "",
    employeeSOSHospital: "",
    employeeSOSPMD: ""
  };

  @ViewChild('sEmpleadoForm') sEmpleadoForm: NgForm | undefined;
  
  constructor(
    private catalogoService: CatalogoService,
    private empleadoService: EmpleadoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {    
    this.getDepartamentos();
    this.getMunicipios("MUNI-DEPTO-09");
    this.getPaises();
  }

  strCompanies = getCompanies();
  companies: CompanyAssoc[] = JSON.parse(this.strCompanies);

  paises: CatalogoModel = {
    codigo: 10,
    mensaje: "",
    items: []
  };

  departamentos: CatalogoModel = {
    codigo: 10,
    mensaje: "",
    items: []
  };
  municipios: CatalogoModel = {
    codigo:10,
    mensaje: "",
    items: []
  };

  private getPaises(){
    this.catalogoService.getCatalogo('PAISES', false)
    .subscribe(
      data =>{
        this.paises = data;
      }
    );
  }
  private getDepartamentos(){
    this.catalogoService.getCatalogo('DEPARTAMENTO', false)
    .subscribe(
      data =>{
        this.departamentos = data;
      }
    );
  }

  public getMunicipios(departamento: string){
    var valor = ("0"+departamento).substr(-2);
    this.catalogoService.getCatalogo('MUNI-DEPTO-' + valor, false)
    .subscribe(
      data =>{
        this.municipios = data;
      }
    );
  }

  public addDays(numOfDays: number): string {
    const hoy = new Date();

    hoy.setDate(hoy.getDate() + numOfDays);

    return hoy.toISOString().split('T')[0];
  }

  public BACChange(){
    if (this.employeeBAC01 != "N/A"){
      this.empleado.employeeBACAcct = this.employeeBAC01 + '|' + this.employeeBAC02;
    }else{
      this.empleado.employeeBACAcct = "";
    }
  }

  validateControls(form: NgForm){
    Object.keys(form.controls).forEach(key => {
      if (!form.controls[key].valid){
        form.controls[key].markAsDirty();
        form.controls[key].markAsTouched();
      }
    });
  }

  onSubmit = (form: NgForm) =>{
    this.validateControls(form);
    if (form.valid){
      if (confirm("Está seguro de agrega el empleado a la base de datos")){
        this.empleadoService.agregarEmpleado(this.empleado)
        .subscribe(
          res => {
            if (res.codigo == 0){
              this.toastr.success(res.mensaje, "Empleado agregado",
              {
                "positionClass": "toast-bottom-full-width",
                closeButton: true,
                progressBar: true
              });
              form.reset();
              window.scrollTo(0,0);
            }else{
              this.toastr.error(res.mensaje, "Error", {
                "timeOut": 10000,
                "positionClass": "toast-bottom-full-width",
                "tapToDismiss": true,
                progressBar: true
              });
            }
          }
          ,error => {
            console.log(error);
            this.toastr.error("Ocurrió un error inesperado al intentar realizar la operación", "Error general");
          }        
        );  
      }
    }
  };
}
