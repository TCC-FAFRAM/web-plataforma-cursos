import { BaseDTO } from "../base.dto"

export interface ErrorDto<T> extends BaseDTO {
    error: T
    status: number,
    message: string
    statusText: string,
    Motivo: string,
}