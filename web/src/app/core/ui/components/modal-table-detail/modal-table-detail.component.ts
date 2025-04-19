import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-table-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-table-detail.component.html',
  styleUrl: './modal-table-detail.component.css'
})
export class ModalTableDetailComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() data: any[] = [];
  @Input() columns: { field: string; label: string }[] = [];

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  resolveField(row: any, field: string): any {
    return field.split('.').reduce((acc, key) => acc?.[key], row);
  }
  
}
