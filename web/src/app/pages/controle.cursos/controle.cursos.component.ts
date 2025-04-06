import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseController } from '../../services/base.crud.controller';
import { CursoService } from '../../services/curso/curso.service';
import { CursoModel } from '../../models/usuario/controle.usuario.model';
import { TableComponent } from '../../core/ui/components/table/table.component';
import { TableLayoutComponent } from '../../core/ui/components/table-layout/table-layout.component';
import { DropdownComponent } from '../../core/ui/components/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-controle.cursos',
  standalone: true,
  imports: [CommonModule, TableComponent, TableLayoutComponent, ReactiveFormsModule, DropdownComponent],
  templateUrl: './controle.cursos.component.html',
  styleUrl: './controle.cursos.component.css'
})
export class ControleCursosComponent extends BaseController<CursoModel> {
  corso: CursoModel | null = null;
  constructor(
    protected override fb: FormBuilder,
    cursoService: CursoService
  ) {
    super(fb, cursoService,'id_curso' );
    this.form = this.buildForm();
    this.carregar();
    
  }

  columns = [
    { field: 'id_curso', label: 'ID' },
    { field: 'titulo', label: 'Título' },
    { field: 'descricao', label: 'Descrição' }
  ]; 

  buildForm(): FormGroup {
    return this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  onPageSizeChange(newSize: number): void {
    this.take.set(newSize);
  }

  onEdit(curso: CursoModel) {
    this.form.patchValue(curso);
  }

  onDelete(curso: CursoModel) {
    this.deletar(curso.id_curso);
  }

  onSubmit(): void {

    if (this.form.valid) {
      this.salvar(this.form.value);
      this.form.reset();
    }
  }

  onRowSelect(rows: CursoModel[]) {
    console.log('Cursos selecionados:', rows);
  }
}
