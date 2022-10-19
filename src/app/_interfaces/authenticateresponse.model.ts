export interface AuthenticatedResponse{
    codigo: Number;
    mensaje: string;
    nombre: string;
    token: string;
    companies: CompanyAssoc[];
    elementos: NavNodo[];
}

export interface NavNodo{
    Codigo: string;
    Nombre: string;
    Ruta: String;
}

export interface CompanyAssoc{
    companyID: number;
    companyName: string;
}