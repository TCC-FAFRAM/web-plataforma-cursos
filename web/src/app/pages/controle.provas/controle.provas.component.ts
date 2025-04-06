import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseController } from '../../services/base.crud.controller';
import { ProvaService } from '../../services/provas/provas.service';
import { ProvaModel } from '../../models/usuario/controle.usuario.model';
import { DropdownComponent } from '../../core/ui/components/dropdown/dropdown.component';
import { TableLayoutComponent } from '../../core/ui/components/table-layout/table-layout.component';
import { TableComponent } from '../../core/ui/components/table/table.component';
import { CommonModule } from '@angular/common';
import { CursoService } from '../../services/curso/curso.service';
import { convertDropdownList, DropdownDTO } from '../../dtos/dropdown/dropdown.dto';


@Component({
  selector: 'app-controle.provas',
  standalone: true,
  imports: [CommonModule, TableComponent, TableLayoutComponent, ReactiveFormsModule, DropdownComponent],
  templateUrl: './controle.provas.component.html',
  styleUrl: './controle.provas.component.css'
})
export class ControleProvasComponent extends BaseController<ProvaModel> {
  serviceCurso = inject(CursoService);
  prova: ProvaModel | null = null; 
  constructor(
    protected override fb: FormBuilder,
    provaService: ProvaService
  ) {
    super(fb, provaService, 'id_prova');
    this.form = this.buildForm();
    this.carregar();
  }

     dropdownItemsCurso: DropdownDTO[] = []
     selectedCurso= '';
     selectedCursoLabel = 'Selecione o Curso';
    
    
  
      ngOnInit(): void {
        this.listUsuasio('');
      }
      
    
       listUsuasio(search?: string) {
        this.serviceCurso.getAll({
          fromObject: {
            search: search  ?? ''
          }
        }).subscribe({
          next: result => {
            this.dropdownItemsCurso = convertDropdownList(result.data, ['titulo','id_curso']);
          }
        })
       }

  columns = [
    { field: 'id_prova', label: 'ID' },
    { field: 'Curso.titulo', label: 'Curso' },
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
    this.prova = prova;
    this.form.patchValue(prova);
    this.selectedCurso = prova.Curso.id_curso.toString();
    this.selectedCursoLabel = prova.Curso.titulo;
    this.activeEdit.set(true);
  }

  onDelete(prova: ProvaModel) {
    this.deletar(prova.id_prova);
  }

  onSubmit(): void {
    this.form.get('fk_id_curso')?.setValue(this.selectedCurso);
    
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.valid && this.activeEdit()) {
      const provaAtualizada = {
        ...this.form.value,
        id_prova: this.prova?.id_prova 
      };
      this.atualizar(provaAtualizada);
      this.form.reset();
    } else if(this.form.valid) {
      this.salvar(this.form.value);
      this.form.reset();
    }
  }

  onRowSelect(rows: ProvaModel[]) {
    
  }
}
