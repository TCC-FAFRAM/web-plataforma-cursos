import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  ChangeDetectorRef,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { IconComponent } from '../icone/icone.component';

@Component({
  selector: 'app-dropdown-multple',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownMultpleComponent),
      multi: true,
    },
  ],
})
export class DropdownMultpleComponent implements ControlValueAccessor {
  def = inject(ChangeDetectorRef);

  @Input() items: any[] = [];
  @Input() labelKey: string = 'label';
  @Input() valueKey: string = 'value';
  @Input() placeholder: string = 'Selecione...';
  @Input() multiple: boolean = false;

  @Output() selected = new EventEmitter<any>();

  isOpen = signal(false);
  searchTerm: string = '';

  selectedValues: any[] = [];

  // ControlValueAccessor
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.selectedValues = this.multiple ? value || [] : [value];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDropdown(): void {
    this.isOpen.set(!this.isOpen());
    this.searchTerm = '';
  }

  isSelected(item: any): boolean {
    return this.selectedValues.some(val => val === item[this.valueKey]);
  }

  selectItem(item: any): void {
    const val = item[this.valueKey];

    if (this.multiple) {
      if (this.isSelected(item)) {
        this.selectedValues = this.selectedValues.filter(v => v !== val);
      } else {
        this.selectedValues.push(val);
      }
      this.onChange(this.selectedValues);
    } else {
      this.selectedValues = [val];
      this.onChange(val);
      this.isOpen.set(false);
    }

    this.selected.emit(this.selectedValues);
    this.def.detectChanges();
  }

  getSelectedLabel(): string {
    if (!this.selectedValues.length) return this.placeholder;
    if (this.multiple) {
      return this.items
        .filter(i => this.selectedValues.includes(i[this.valueKey]))
        .map(i => i[this.labelKey])
        .join(', ');
    } else {
      const found = this.items.find(i => i[this.valueKey] === this.selectedValues[0]);
      return found ? found[this.labelKey] : this.placeholder;
    }
  }

  get filteredItems(): any[] {
    if (!this.searchTerm.trim()) return this.items;
    const term = this.searchTerm.toLowerCase();
    return this.items.filter(item =>
      item[this.labelKey]?.toLowerCase().includes(term)
    );
  }
}
