import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  public setItem(key: string, value: any): void {
    const jsonString = JSON.stringify(value);
    sessionStorage.setItem(key, jsonString);
  }

  public getItem<T>(key: string): T | null {
    const jsonString = sessionStorage.getItem(key);
    return jsonString ? JSON.parse(jsonString) : null;
  }

  public removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  public clear(): void {
    sessionStorage.clear();
  }

  public checkIfItemExists(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }
}
