import { BaseDTO } from "./base.dto";

export interface IPayloadDTO extends BaseDTO{
  nome: string;
  email: string;
  role: "ADMIN" | "USER" | "MASTER",
  exp: number;
  dateExpired: Date;
  isExpired: boolean;
}




