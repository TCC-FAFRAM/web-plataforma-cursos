import { Component, inject, OnInit } from '@angular/core';
import { FuncaoModel } from '../../models/usuario/controle.usuario.model';
import { BaseController } from '../../services/base.crud.controller';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FuncaoService } from '../../services/funcao/funcao.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../core/ui/components/table/table.component';
import { TableLayoutComponent } from '../../core/ui/components/table-layout/table-layout.component';
import { DropdownMultpleComponent } from '../../core/ui/components/dropdown_list/dropdown.component';
import { CursoService } from '../../services/curso/curso.service';
import { convertDropdownList, DropdownDTO } from '../../dtos/dropdown/dropdown.dto';

@Component({
  selector: 'app-controle.funcao',
  standalone: true,
  imports: [CommonModule, TableComponent, TableLayoutComponent, ReactiveFormsModule, DropdownMultpleComponent],
  templateUrl: './controle.funcao.component.html',

})
export class ControleFuncaoComponent extends BaseController<FuncaoModel> implements OnInit {
   form2 = new FormGroup({
    categorias: new FormControl([]), 
  });
  
  serviceCurso = inject(CursoService);

 funcaoModel: FuncaoModel | null = null;
  constructor(
    protected override fb: FormBuilder,
    funcaoService: FuncaoService
  ) {
    super(fb, funcaoService,'id_funcao' );
    this.form = this.buildForm();
    this.carregar();
    
    
  }
  ngOnInit(): void {
    this.listCursos();
  }

  dropdownCurso: DropdownDTO[] = [];

  listCursos(search?: string) {
   this.serviceCurso.getAll({
     fromObject: {
       search: search  ?? ''
     }
   }).subscribe({
     next: result => {
       console.table(result.data);
       this.dropdownCurso = convertDropdownList(result.data, ['titulo','id_curso']);
     }
   })
  }

  columns = [
    { field: 'id_funcao', label: 'ID' },
    { field: 'nome', label: 'Nome' },
    { field: 'descricao', label: 'Descrição' }
  ]; 

  buildForm(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      cursos: [[]]
    });
  }

  onPageSizeChange(newSize: number): void {
    this.take.set(newSize);
  }

  onEdit(data: FuncaoModel) {
    this.form.patchValue(data);
    this.activeEdit.set(true);
    this.funcaoModel = data;
  }

  onDelete(data: FuncaoModel) {
    this.deletar(data.id_funcao);
  }

  onSubmit(): void {
    if (this.form.valid && this.activeEdit()) {
      const provaAtualizada = {
        ...this.form.value,
        id_funcao: this.funcaoModel?.id_funcao 
      };
      this.atualizar(provaAtualizada);
      this.form.reset();
    }
    else
    if (this.form.valid) {
      this.salvar(this.form.value);
      this.form.reset();
    }
  }

  onRowSelect(rows: FuncaoModel[]) {
    console.log('Cursos selecionados:', rows);
  }
}
