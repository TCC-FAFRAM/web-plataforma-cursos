import { Component, OnInit } from '@angular/core';
import { TableLayoutComponent } from "../../../core/ui/components/table-layout/table-layout.component";
import { TableComponent } from "../../../core/ui/components/table/table.component";
import { AulaModel } from '../../../models/usuario/controle.usuario.model';
import { BaseController } from '../../../services/base.crud.controller';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AulaService } from '../../../services/curso/aula.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-controle.aulas',
  standalone: true,
  imports: [TableLayoutComponent, TableComponent, TableComponent, TableLayoutComponent, ReactiveFormsModule],
  templateUrl: './controle.aulas.component.html',
  styleUrl: './controle.aulas.component.css'
})
export class ControleAulasComponent extends BaseController<AulaModel>  implements OnInit{
  aula: AulaModel | null = null;
  titleCurse = '';
  idCurso: number = 0;
  constructor(
    protected override fb: FormBuilder,
    aulaService: AulaService,
    private route: ActivatedRoute
  ) {
    super(fb, aulaService,'id_aula' );
    this.form = this.buildForm();
    
  }


  ngOnInit(): void {
    const resolved = this.route.snapshot.data['aulas'];
    this.items.set(resolved?.data ?? []);
    this.titleCurse =  resolved?.data[0].Curso.titulo ?? 'Aulas';
    this.idCurso = resolved?.data[0].Curso.id_curso;
  }

  columns = [ 
    { field: 'id_aula', label: 'ID' },
    { field: 'titulo', label: 'Título' },
    { field: 'descricao', label: 'Descrição' },
    { field: 'Curso.titulo', label: 'Curso' }
  ]; 

  buildForm(): FormGroup {
    return this.fb.group({
      titulo: ['', Validators.required],
      url_video: ['', Validators.required],
      duracao: [0, Validators.required],  
    });
  }

  onPageSizeChange(newSize: number): void {
    this.take.set(newSize);
  }

  onEdit(data: AulaModel) {
    this.form.patchValue(data);
    this.activeEdit.set(true);
    this.aula = data;
  }

  onDelete(data: AulaModel) {
    this.deletar(data.id_aula);
  }

  onSubmit(): void {
      
    if (this.form.valid && this.activeEdit()) {
     let newAula = {
        id_aula: this.aula?.id_aula,
        fk_id_curso: this.idCurso,
        ...this.form.value
      }

      this.atualizar(newAula);
      this.form.reset();
    } else {
      let newAula = {
        fk_id_curso: this.idCurso,
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
