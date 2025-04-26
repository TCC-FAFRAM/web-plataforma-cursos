import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-layout',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './table-layout.component.html',
  styleUrl: './table-layout.component.css'
})
export class TableLayoutComponent {
  // Inputs de fora
  @Input() title: string = '';
  @Input() titleButton: string = '';
  @Input() total: number = 0;               // <- total de itens
  @Input() pageSize: number = 10;
  @Input() createdFormbaseActive = true;        // <- itens por página

  // Eventos
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  currentPage = 1;
  @Input() activeFormulario = signal(false);



  itemsPerPageOptions = [10, 25, 50];

  setActiveFormulrio(value: boolean) {
    this.activeFormulario.set(value);
  }

  get pages(): number[] {
    const pages = Math.ceil(this.total / this.pageSize);
    return Array.from({ length: pages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.currentPage = page;
      this.pageChange.emit(page); // 🔥 emite a nova página
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.goToPage(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }


  isActive(page: number): boolean {
    return this.currentPage === page;
  }

  onItemsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const newSize = parseInt(target.value, 10);

    this.currentPage = 1; // volta pra página 1
    this.pageSize = newSize;

    this.pageSizeChange.emit(newSize); // ✅ emite pro componente pai
  }

}
