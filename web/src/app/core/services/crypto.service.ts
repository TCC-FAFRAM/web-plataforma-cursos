import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  #secretKey = environment.secretKey;

  // Método para criptografar
  public encrypt(value: any): string {
    return CryptoJS.AES.encrypt(
      JSON.stringify(value),
      this.#secretKey
    ).toString();
  }

  // Método para descriptografar
  public decrypt(encryptedValue: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, this.#secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}
