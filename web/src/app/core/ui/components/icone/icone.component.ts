import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports:[
    CommonModule
  ],
  template: `
    <span
      class="material-icons"
      [ngClass]="variant"
      [style.fontSize.px]="size"
      [style.color]="color"
    >
      {{ name }}
    </span>
  `,
})
export class IconComponent {
  @Input() name!: string; // Ex: 'home', 'menu', 'person'
  @Input() size: number = 24;
  @Input() color: string = 'inherit';
  @Input() variant: 'material-icons' | 'material-icons-outlined' | 'material-icons-round' = 'material-icons';
}
