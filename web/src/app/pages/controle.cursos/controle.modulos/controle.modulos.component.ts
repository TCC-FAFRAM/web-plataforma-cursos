
import { Component, inject, signal } from '@angular/core';
import { TableComponent } from "../../../core/ui/components/table/table.component";
import { TableLayoutComponent } from "../../../core/ui/components/table-layout/table-layout.component";
import { RouterSubmenu } from '../../../dtos/submenu/submenu.dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModuloModel } from '../../../models/usuario/controle.usuario.model';
import { ModuloService } from '../../../services/curso/modulo.service';
import { BaseController } from '../../../services/base.crud.controller';
import { SubmenuComponent } from "../../../core/ui/components/submenu/submenu.component";
import { CursoService } from '../../../services/curso/curso.service';
import { convertDropdownList, DropdownDTO } from '../../../dtos/dropdown/dropdown.dto';
import { DropdownComponent } from "../../../core/ui/components/dropdown/dropdown.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-controle.modulos',
  standalone: true,
  imports: [CommonModule, TableComponent, TableLayoutComponent, SubmenuComponent, ReactiveFormsModule, DropdownComponent],
  templateUrl: './controle.modulos.component.html',
  styleUrl: './controle.modulos.component.css'
})
export class ControleModulosComponent extends BaseController<ModuloModel> {
   data: ModuloModel | null = null;
   serviceCurso = inject(CursoService);


  routerSubmenu: RouterSubmenu[]= [
    {
      active: false,
      label: 'Cursos',
      router: '/controlecursos'
    },
    {
      active: true,
      label: 'Modulos',
      router: '/controlemodulos'
    },
    {
      active: false,
      label: 'Aulas',
      router: '/controleaula'
    }

  ];

  columns = [
    { field: 'id_modulo', label: 'ID' },
    { field: 'titulo', label: 'Título' },
    { field: 'descricao', label: 'Descrição' },
    { field: 'ordem', label: 'Ordemss' },
    { field: 'Curso.titulo', label: 'Curso' },
  ];

     dropdownItemsCurso: DropdownDTO[] = []
     selectedCurso = 0;
     selectedCursoLabel = 'Selecione o Curso';
     activeFormulario = signal(false);


  constructor(
    protected override fb: FormBuilder,
    cursoService: ModuloService
  ) {
    super(fb, cursoService,'id_modulo' );
    this.form = this.buildForm();
    this.carregar();

  }

  ngOnInit(): void {
    this.listCursos('');
  }


  listCursos(search?: string) {
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




  buildForm(): FormGroup {
    return this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      ordem: [0, [Validators.required, Validators.min(1)]],
      fk_id_curso: [null, Validators.required],
    });
  }

  onNovo() {
  this.form.reset();
  this.activeEdit.set(false);
  this.activeFormulario.set(true);
  this.data = null;
}



  onPageSizeChange(newSize: number): void {
    this.take.set(newSize);
  }

  onEdit(data: ModuloModel) {
    this.form.patchValue(data);
    this.activeEdit.set(true);
    this.form.get('fk_id_curso')?.setValue(this.selectedCurso);
    this.data = data;
    this.selectedCurso = data.Curso?.id_curso;
    this.selectedCursoLabel = data.Curso?.titulo;
    this.activeEdit.set(true);
    this.activeFormulario.set(true);
  }

  onDelete(data: ModuloModel) {
    this.deletar(data.id_modulo);
  }

  onSubmit(): void {
    this.form.get('fk_id_curso')?.setValue(this.selectedCurso);

    if (this.form.valid && this.activeEdit()) {
      const provaAtualizada = {
        ...this.form.value,
        id_modulo: this.data?.id_modulo
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

  onRowSelect(rows: ModuloModel[]) {
    console.log('Cursos selecionados:', rows);
  }
}
