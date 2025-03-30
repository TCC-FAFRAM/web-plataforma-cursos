import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseController } from '../../services/base.crud.controller';
import { ProvaService } from '../../services/provas/provas.service';
import { ProvaModel } from '../../models/usuario/controle.usuario.model';
import { DropdownComponent } from '../../core/ui/components/dropdown/dropdown.component';
import { TableLayoutComponent } from '../../core/ui/components/table-layout/table-layout.component';
import { TableComponent } from '../../core/ui/components/table/table.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-controle.provas',
  standalone: true,
  imports: [CommonModule, TableComponent, TableLayoutComponent, ReactiveFormsModule, DropdownComponent],
  templateUrl: './controle.provas.component.html',
  styleUrl: './controle.provas.component.css'
})
export class ControleProvasComponent extends BaseController<ProvaModel> {
  constructor(
    protected override fb: FormBuilder,
    provaService: ProvaService
  ) {
    super(fb, provaService);
    this.form = this.buildForm();
    this.carregar();
  }

  columns = [
    { field: 'id_prova', label: 'ID' },
    { field: 'fk_id_curso', label: 'ID do Curso' },
    { field: 'nota_minima', label: 'Nota Mínima' },
    { field: 'total_perguntas', label: 'Total de Perguntas' }
  ];

  buildForm(): FormGroup {
    return this.fb.group({
      fk_id_curso: [null, Validators.required],
      nota_minima: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      total_perguntas: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onPageSizeChange(newSize: number): void {
    this.take.set(newSize);
  }

  onEdit(prova: ProvaModel) {
    this.form.patchValue(prova);
  }

  onDelete(prova: ProvaModel) {
    this.deletar(prova.id_prova);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.salvar(this.form.value);
      this.form.reset();
    }
  }

  onRowSelect(rows: ProvaModel[]) {
    console.log('Provas selecionadas:', rows);
  }
}
