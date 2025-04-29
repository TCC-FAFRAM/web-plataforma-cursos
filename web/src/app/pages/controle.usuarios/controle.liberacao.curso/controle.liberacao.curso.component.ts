import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../../core/ui/components/table/table.component';
import { TableLayoutComponent } from '../../../core/ui/components/table-layout/table-layout.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownComponent } from '../../../core/ui/components/dropdown/dropdown.component';
import { SubmenuComponent } from '../../../core/ui/components/submenu/submenu.component';
import { convertDropdownList, DropdownDTO } from '../../../dtos/dropdown/dropdown.dto';
import { RouterSubmenu } from '../../../dtos/submenu/submenu.dto';
import { BaseController } from '../../../services/base.crud.controller';
import { LiberacaoCursoService } from '../../../services/curso/liberacao.curso.service';
import { LiberacaoCursoModel } from '../../../models/usuario/controle.usuario.model';
import { CursoService } from '../../../services/curso/curso.service';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { UsuarioAuthService } from '../../../services/autenticacao/usuario.service';


@Component({
  selector: 'app-controle.liberacao.curso',
  standalone: true,
  imports: [CommonModule, TableComponent, TableLayoutComponent, ReactiveFormsModule, DropdownComponent, SubmenuComponent],
  templateUrl: './controle.liberacao.curso.component.html',
  styleUrl: './controle.liberacao.curso.component.css'
})
export class ControleLiberacaoCursoComponent extends BaseController<LiberacaoCursoModel> implements  OnInit {
serviceUsuario = inject(UsuarioService);
serviceCurso = inject(CursoService);
serviceAdmin = inject(UsuarioAuthService);
activeFormulario = signal(false);
data: LiberacaoCursoModel | null = null;

  routerSubmenu: RouterSubmenu[]= [ 
    {
      active: false,
      label: 'Usuarios',
      router: '/controleusuarios'
    },
    {
      active: true,
      label: 'Liberação Curso',
      router: '/controleliberacaocurso'
    },


  ];

  columns = [
    { field: 'id_liberacao_curso', label: 'id' },
    { field: 'Curso.titulo', label: 'Curso' },
    { field: 'Admin.nome', label: 'Administrador' },
    { field: 'Funcionario.nome', label: 'Funcionario' },

  ];

  dropdownsUsuario: DropdownDTO[] = []
  selectedUsuario = 0;
  selectedUsuarioLabel = '';


  dropdownCurso: DropdownDTO[] = []
  selectedCurso = 0;
  selectedCursoLabel = '';

  constructor(
    protected override fb: FormBuilder,
    service: LiberacaoCursoService
  ) {
    super(fb, service, 'id_liberacao_curso');
    this.form = this.buildForm();
    this.carregar();
  }
  ngOnInit(): void {
    this.listUsuario();
    this.listCurso();
  }


   listUsuario(search?: string) {
    this.serviceUsuario.getAll({
      fromObject: {
        search: search  ?? ''
      }
    }).subscribe({
      next: result => {
        this.dropdownsUsuario = convertDropdownList(result.data, ['nome','id_usuario']);
      }
    })
   }

   listCurso(search?: string) {
    this.serviceCurso.getAll({
      fromObject: {
        search: search  ?? ''
      }
    }).subscribe({
      next: result => {
        this.dropdownCurso = convertDropdownList(result.data, ['titulo','id_curso']); 
      }
    })
   }


  buildForm(): FormGroup {
    return this.fb.group({
      fk_id_funcionario: [0, Validators.required],
      fk_id_curso: [0, [Validators.required]],
    });
  }




  onPageSizeChange(newSize: number): void {
    this.take.set(newSize);
  }

  onEdit(data: LiberacaoCursoModel) {
    this.form.patchValue(data);
    this.activeEdit.set(true)
    this.data = data;
    this.activeFormulario.set(true);

  }

  onDelete(data: LiberacaoCursoModel) {
    this.deletar(data.id_liberacao_curso);
  }

  onSubmit(): void {
    this.form.get('fk_id_funcionario')?.setValue(this.selectedUsuario);
    this.form.get('fk_id_curso')?.setValue(this.selectedCurso);

    if (this.form.valid && this.activeEdit()) {
      const usuario = {
        ...this.form.value,
        id_usuario: this.data?.id_liberacao_curso
      };
      this.atualizar(usuario);
      this.selectedCurso = 0;
      this.selectedCursoLabel = '';
      } else {
        const newAula = {
          ...this.form.value
        }
 
        this.salvar(newAula);
        this.form.reset();
        this.selectedCurso = 0;
        this.selectedCursoLabel = '';
      }
  }

  onRowSelect(rows: LiberacaoCursoModel[]) {
    console.log('Selecionados:', rows);
  }
}
