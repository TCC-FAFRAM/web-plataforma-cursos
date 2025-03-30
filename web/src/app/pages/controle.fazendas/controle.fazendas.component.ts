import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseController } from '../../services/base.crud.controller';
import { FazendaModel } from '../../models/usuario/controle.usuario.model';
import { FazendaService } from '../../services/fazendas/fazendas.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../core/ui/components/table/table.component';
import { TableLayoutComponent } from '../../core/ui/components/table-layout/table-layout.component';
import { DropdownComponent } from '../../core/ui/components/dropdown/dropdown.component';


@Component({
  selector: 'app-controle.fazendas',
  standalone: true,
  imports: [CommonModule, TableComponent, TableLayoutComponent, ReactiveFormsModule, DropdownComponent],
  templateUrl: './controle.fazendas.component.html',
  styleUrl: './controle.fazendas.component.css'
})
export class ControleFazendasComponent extends BaseController<FazendaModel> {
  constructor(
    protected override fb: FormBuilder,
    fazendaService: FazendaService
  ) {
    super(fb, fazendaService);
    this.form = this.buildForm();
    this.carregar();
  }

  columns = [
    { field: 'id_fazenda', label: 'ID' },
    { field: 'nome', label: 'Nome' },
    { field: 'proprietario', label: 'Proprietário' },
    { field: 'descricao', label: 'Descrição' },
    { field: 'distrito_id', label: 'Distrito ID' },
    { field: 'municipio_id', label: 'Município ID' },
    { field: 'complemento', label: 'Complemento' },
  ];

  buildForm(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      proprietario: [''],
      descricao: [''],
      distrito_id: [null],
      municipio_id: [null],
      complemento: [''],
    });
  }

  onPageSizeChange(newSize: number): void {
    this.take.set(newSize);
  }

  onEdit(fazenda: FazendaModel) {
    this.form.patchValue(fazenda);
  }

  onDelete(fazenda: FazendaModel) {
    this.deletar(fazenda.id_fazenda);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.salvar(this.form.value);
      this.form.reset();
    }
  }

  onRowSelect(rows: FazendaModel[]) {
    console.log('Fazendas selecionadas:', rows);
  }
}
