import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalTableDetailComponent } from '../modal-table-detail/modal-table-detail.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ModalTableDetailComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() columns: { field: string; label: string; chipField?: string; isArray?: boolean; columnsInside?: any[] }[] = [];
  @Input() data: any[] = [];
  @Input() selectable: boolean = false;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() rowSelected = new EventEmitter<any[]>();

  selectedRows: any[] = [];
  modalOpen: boolean = false;
  modalTitle = '';
  modalData: any[] = [];
  modalColumns: any[] = [];

  toggleRow(row: any): void {
    if (this.isSelected(row)) {
      this.selectedRows = this.selectedRows.filter(r => r !== row);
    } else {
      this.selectedRows.push(row);
    }
    this.rowSelected.emit(this.selectedRows);
  }

  isSelected(row: any): boolean {
    return this.selectedRows.includes(row);
  }

  resolveField(row: any, field: string): any {
    return field.split('.').reduce((acc, key) => acc?.[key], row);
  }
  

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  isDate(value: any): boolean {
    return typeof value === 'string' && !isNaN(Date.parse(value));
  }

  extractDefaultField(obj: any): string {
    if (!obj) return '-';
    if (obj.nome) return obj.nome;
    if (obj.titulo) return obj.titulo;
    if (obj.label) return obj.label;
    const firstKey = Object.keys(obj)[0];
    return obj[firstKey] || '-';
  }

  openArrayModal(row: any, column: any): void {
    this.modalTitle = column.label;
    this.modalData = this.resolveArray(row, column.field) || [];
    this.modalColumns = column.columnsInside || [];
    this.modalOpen = true;
  }

  resolveArray(row: any, field: string): any[] {
    const value = field.split('.').reduce((acc, key) => acc?.[key], row);
    return Array.isArray(value) ? value : [];
  }

  closeModal(): void {
    this.modalOpen = false;
    this.modalData = [];
    this.modalColumns = [];
    this.modalTitle = '';
  }
}
