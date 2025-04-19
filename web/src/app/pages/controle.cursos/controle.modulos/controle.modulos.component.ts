import { Component } from '@angular/core';
import { TableComponent } from "../../../core/ui/components/table/table.component";
import { TableLayoutComponent } from "../../../core/ui/components/table-layout/table-layout.component";
import { RouterSubmenu } from '../../../dtos/submenu/submenu.dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModuloModel } from '../../../models/usuario/controle.usuario.model';
import { ModuloService } from '../../../services/curso/modulo.service';
import { BaseController } from '../../../services/base.crud.controller';
import { SubmenuComponent } from "../../../core/ui/components/submenu/submenu.component";

@Component({
  selector: 'app-controle.modulos',
  standalone: true,
  imports: [TableComponent, TableLayoutComponent, SubmenuComponent, ReactiveFormsModule],
  templateUrl: './controle.modulos.component.html',
  styleUrl: './controle.modulos.component.css'
})
export class ControleModulosComponent extends BaseController<ModuloModel> {
   data: ModuloModel | null = null;
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
  constructor(
    protected override fb: FormBuilder,
    cursoService: ModuloService
  ) {
    super(fb, cursoService,'id_modulo' );
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

  onEdit(data: ModuloModel) {
    this.form.patchValue(data);
  }

  onDelete(data: ModuloModel) {
    this.deletar(data.id_modulo);
  }

  onSubmit(): void {

    if (this.form.valid) {
      this.salvar(this.form.value);
      this.form.reset();
    }
  }

  onRowSelect(rows: ModuloModel[]) {
    console.log('Cursos selecionados:', rows);
  }
}
