
import { Component, inject, OnInit, signal } from '@angular/core';
import { TableLayoutComponent } from "../../../core/ui/components/table-layout/table-layout.component";
import { TableComponent } from "../../../core/ui/components/table/table.component";
import { AulaModel } from '../../../models/usuario/controle.usuario.model';
import { BaseController } from '../../../services/base.crud.controller';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AulaService } from '../../../services/curso/aula.service';
import { ActivatedRoute } from '@angular/router';
import { RouterSubmenu } from '../../../dtos/submenu/submenu.dto';
import { SubmenuComponent } from "../../../core/ui/components/submenu/submenu.component";
import { convertDropdownList, DropdownDTO } from '../../../dtos/dropdown/dropdown.dto';
import { ModuloService } from '../../../services/curso/modulo.service';
import { DropdownComponent } from "../../../core/ui/components/dropdown/dropdown.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-controle.aulas',
  standalone: true,
  imports: [CommonModule, TableLayoutComponent, TableComponent, TableComponent, TableLayoutComponent, ReactiveFormsModule, SubmenuComponent, DropdownComponent],
  templateUrl: './controle.aulas.component.html',
  styleUrl: './controle.aulas.component.css'
})
  export class ControleAulasComponent extends BaseController<AulaModel>  implements OnInit{
  aula: AulaModel | null = null;
  titleCurse = '';
  idCurso: number = 0;
  serviceModulo = inject(ModuloService);
  activeFormulario = signal(false);
  routerSubmenu: RouterSubmenu[]= [
      {
        active: false,
        label: 'Cursos',
        router: '/controlecursos'
      },
      {
        active: false,
        label: 'Modulos',
        router: '/controlemodulos'
      },
      {
        active: true,
        label: 'Aulas',
        router: '/controleaula'
      }

    ];
  constructor(
    protected override fb: FormBuilder,
    aulaService: AulaService,
    private route: ActivatedRoute
  ) {
    super(fb, aulaService,'id_aula' );
    this.form = this.buildForm();


  }

 onNovo() {
  this.form.reset();
  this.activeEdit.set(false);
  this.activeFormulario.set(true);
  this.aula = null;
}



  ngOnInit(): void {
    const resolved = this.route.snapshot.data['aulas'];
    if(resolved != undefined && resolved != null){
      this.items.set(resolved?.data ?? []);
      this.titleCurse =  resolved?.data[0].Curso.titulo ?? 'Aulas';
      this.idCurso = resolved?.data[0].Curso.id_curso;
    }  else {
      this.carregar();
      this.titleCurse = 'Aulas';
      this.listModulo('');
    }

  }

  columns = [
    { field: 'id_aula', label: 'ID' },
    { field: 'titulo', label: 'Título' },
    { field: 'descricao', label: 'Descrição' },
    { field: 'Modulo.titulo', label: 'Modulo' }
  ];

  dropdownItemsModulo: DropdownDTO[] = []
  selectedModulo = 0;
  selectedModuloLabel = 'Selecione o Modulo';



  listModulo(search?: string) {
      this.serviceModulo.getAll({
        fromObject: {
          search: search  ?? ''
        }
      }).subscribe({
        next: result => {
          this.dropdownItemsModulo = convertDropdownList(result.data, ['titulo','id_modulo']);
        }
      })
     }

  buildForm(): FormGroup {
    return this.fb.group({
      titulo: ['', Validators.required],
      url_video: ['', Validators.required],
      duracao: [0, Validators.required],
      descricao: ['', Validators.required],
      fk_id_modulo: [null, Validators.required], 

    });
  }

  onPageSizeChange(newSize: number): void {
    this.take.set(newSize);
  }

  onEdit(data: AulaModel) {
    this.form.patchValue(data);
    this.activeEdit.set(true);
    this.aula = data;
    this.activeFormulario.set(true)
    this.form.get('fk_id_modulo')?.setValue(data.Modulo.id_modulo);
    this.selectedModulo = data.Modulo?.id_modulo;
    this.selectedModuloLabel = data.Modulo?.titulo;
  }

  onDelete(data: AulaModel) {
    this.deletar(data.id_aula);
  }

  onSubmit(): void {
    this.form.get('fk_id_modulo')?.setValue(this.selectedModulo);
    if (this.form.valid && this.activeEdit()) {
     const newAula = {
        id_aula: this.aula?.id_aula,
        ...this.form.value
      }

      this.atualizar(newAula);
      this.form.reset();
    } else {
      const newAula = {
        ...this.form.value
      }

      this.salvar(newAula);
      this.form.reset();
    }
  }

  onRowSelect(rows: AulaModel[]) {
    console.log('Cursos selecionados:', rows);
  }
}
