import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../core/ui/components/table/table.component';
import { TableLayoutComponent } from '../../../core/ui/components/table-layout/table-layout.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownComponent } from '../../../core/ui/components/dropdown/dropdown.component';
import { SubmenuComponent } from '../../../core/ui/components/submenu/submenu.component';
import { RouterSubmenu } from '../../../dtos/submenu/submenu.dto';
import { BaseController } from '../../../services/base.crud.controller';
import { ProvaModel } from '../../../models/usuario/controle.usuario.model';
import { ModuloService } from '../../../services/curso/modulo.service';
import { ProvaService } from '../../../services/provas/provas.service';
import { convertDropdownList, DropdownDTO } from '../../../dtos/dropdown/dropdown.dto';

@Component({
  selector: 'app-controle.questoes',
  standalone: true,
  imports: [CommonModule, TableComponent, TableLayoutComponent, ReactiveFormsModule, DropdownComponent, SubmenuComponent],
  templateUrl: './controle.questoes.component.html',
  styleUrl: './controle.questoes.component.css'
})
export class ControleQuestoesComponent extends BaseController<ProvaModel> {
  serviceModulo = inject(ModuloService);
  prova: ProvaModel | null = null; 

    routerSubmenu: RouterSubmenu[]= [ 
      {
        active: true,
        label: 'Prova',
        router: '/controleprovas'
      },
      {
        active: false,
        label: 'Questoes',
        router: '/controlemodulos'
      },
    
    ]
  constructor(
    protected override fb: FormBuilder,
    provaService: ProvaService
  ) {
    super(fb, provaService, 'id_prova');
    this.form = this.buildForm();
    this.carregar();
  }

    dropdownItemsModulo: DropdownDTO[] = []
    selectedModulo = 0;
    selectedModuloLabel = 'Selecione o Modulo';
    
    
  
      ngOnInit(): void {
        this.listUsuasio('');
      }
      
    
       listUsuasio(search?: string) {
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

  columns = [
    { field: 'id_prova', label: 'ID' },
    { field: 'Modulo.titulo', label: 'Modulo' },
    { field: 'nota_minima', label: 'Nota Mínima' },
    { field: 'total_perguntas', label: 'Total de Perguntas' }
  ];

  buildForm(): FormGroup {
    
    return this.fb.group({
      fk_id_modulo: [null, Validators.required],
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
    this.selectedModulo = prova.fk_id_modulo;
    this.selectedModuloLabel = prova.Modulo.descricao;
    this.activeEdit.set(true);
  }

  onDelete(prova: ProvaModel) {
    this.deletar(prova.id_prova);
  }

  onSubmit(): void {
    this.form.get('fk_id_modulo')?.setValue(this.selectedModulo);
  

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
