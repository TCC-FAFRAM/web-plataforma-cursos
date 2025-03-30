import { Injectable, signal } from '@angular/core';

interface Alert {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  alert = signal<Alert | null>(null);

  show(message: string, type: Alert['type'] = 'info', duration = 4000) {
    this.alert.set({ message, type });
    setTimeout(() => this.clear(), duration);
  }

  clear() {
    this.alert.set(null);
  }
}
