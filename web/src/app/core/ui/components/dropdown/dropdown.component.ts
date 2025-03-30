import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from "../icone/icone.component";

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  @Input() items: any[] = [];
  @Input() labelKey: string = 'label';
  @Input() valueKey: string = 'value';
  @Input() placeholder: string = 'Selecione uma opção';
  @Input() selectedValue: any;

  @Output() selected = new EventEmitter<any>();

  isOpen = false;
  searchTerm: string = '';

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    this.searchTerm = ''; // limpa ao abrir
  }

  selectItem(item: any): void {
    this.selectedValue = item[this.valueKey];
    this.selected.emit(this.selectedValue);
    this.isOpen = false;
  }

  getSelectedLabel(): string {
    const found = this.items.find(i => i[this.valueKey] === this.selectedValue);
    return found ? found[this.labelKey] : this.placeholder;
  }

  get filteredItems(): any[] {
    if (!this.searchTerm.trim()) return this.items;
    const term = this.searchTerm.toLowerCase();
    return this.items.filter(item =>
      item[this.labelKey]?.toLowerCase().includes(term)
    );
  }
}
