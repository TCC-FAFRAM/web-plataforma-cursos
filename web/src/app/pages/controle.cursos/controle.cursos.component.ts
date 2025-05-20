import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseController } from '../../services/base.crud.controller';
import { CursoService } from '../../services/curso/curso.service';
import { CursoModel } from '../../models/usuario/controle.usuario.model';
import { TableComponent } from '../../core/ui/components/table/table.component';
import { TableLayoutComponent } from '../../core/ui/components/table-layout/table-layout.component';
import { DropdownComponent } from '../../core/ui/components/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { SubmenuComponent } from "../../core/ui/components/submenu/submenu.component";
import { RouterSubmenu } from '../../dtos/submenu/submenu.dto';


@Component({
  selector: 'app-controle.cursos',
  standalone: true,
  imports: [CommonModule, TableComponent, TableLayoutComponent, ReactiveFormsModule, SubmenuComponent],
  templateUrl: './controle.cursos.component.html',
  styleUrl: './controle.cursos.component.css'
})
export class ControleCursosComponent extends BaseController<CursoModel> {
  data: CursoModel | null = null;
  routerSubmenu: RouterSubmenu[]= [ 
    {
      active: true,
      label: 'Cursos',
      router: '/controlecursos'
    },
    {
      active: false,
      label: 'Modulos',
      router: '/controlemodulos'
    },
    {
      active: false,
      label: 'Aulas',
      router: '/controleaula'
    }

  ];
  activeFormulario = signal(false);
  constructor(
    protected override fb: FormBuilder,
    cursoService: CursoService
  ) {
    super(fb, cursoService,'id_curso' );
    this.form = this.buildForm();
    this.carregar();
    
  }

  onNovo() {
  this.form.reset();
  this.activeEdit.set(false);
  this.activeFormulario.set(true);
  this.data = null;
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
      url_img: ['', [Validators.required, Validators.maxLength(150)]]
    });
  }

  onPageSizeChange(newSize: number): void {
    this.take.set(newSize);
  }

  onEdit(curso: CursoModel) {
    this.form.patchValue(curso);
    this.activeEdit.set(true);
    this.activeFormulario.set(true);
    this.data = curso;

  }

  onDelete(curso: CursoModel) {
    this.deletar(curso.id_curso);
  }

  onSubmit(): void {
    if (this.form.valid && this.activeEdit()) {
      const newAula = {
         id_curso: this.data?.id_curso,
         ...this.form.value
       }
 
       this.atualizar(newAula);
       this.form.reset();
       this.activeEdit.set(false);
     } else {
       const newAula = {
         ...this.form.value
       }
 
       this.salvar(newAula);
       this.form.reset();
     }
   }
  

  onRowSelect(rows: CursoModel[]) {
    console.log('Cursos selecionados:', rows);
  }
}
