import { BaseDTO } from "../base.dto";

export interface ErrorLogin  extends BaseDTO {
    error: string;
    webversion: string;
}