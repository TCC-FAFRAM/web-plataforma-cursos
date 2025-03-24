import { BaseDTO } from "./base.dto";

export interface QueryUrlDTO extends BaseDTO {
    empresa: number | string;
    filial: number | string;
    codigo: number | string;
    tipo?: string;
  }
  