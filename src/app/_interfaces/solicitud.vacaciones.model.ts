export interface SolicitudVacacionesModel{
    ID: number;
    companyID: number;
    employeeCode: string;
    dateStart: string;
    dateEnd: string;
    comments: string;
    userID: string;
}