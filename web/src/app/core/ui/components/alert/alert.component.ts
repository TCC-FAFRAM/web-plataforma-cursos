import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { AlertService } from './alert.component.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  private alertService = inject(AlertService);
  alert = computed(() => this.alertService.alert());
  visible = signal(false);

  constructor() {
    effect(() => {
      if (this.alert()) {
        this.visible.set(true);
        setTimeout(() => this.visible.set(false), 4000);
      }
    }, { allowSignalWrites: true });
  }
  

  close() {
    this.visible.set(false);
  }
}
