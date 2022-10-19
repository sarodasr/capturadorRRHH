import { BaseRetornoModel } from "./baseretorno.model";

export interface CatalogoModel extends BaseRetornoModel{
    items: NodoCatalogoModel[]
}

export interface NodoCatalogoModel{
    value: string,
    description: string,
    enabled: boolean
}