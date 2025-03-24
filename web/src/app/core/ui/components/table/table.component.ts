import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() columns: { field: string, label: string }[] = [];
  @Input() data: any[] = [];
  @Input() selectable: boolean = false;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() rowSelected = new EventEmitter<any[]>();

  selectedRows: any[] = [];

  toggleRow(row: any) {
    if (this.selectedRows.includes(row)) {
      this.selectedRows = this.selectedRows.filter(r => r !== row);
    } else {
      this.selectedRows.push(row);
    }
    this.rowSelected.emit(this.selectedRows);
  }

  isSelected(row: any) {
    return this.selectedRows.includes(row);
  }
}
