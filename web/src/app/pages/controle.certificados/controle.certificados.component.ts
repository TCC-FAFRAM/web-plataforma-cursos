import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseController } from '../../services/base.crud.controller';
import { CertificadoModel } from '../../models/usuario/controle.usuario.model';
import { CertificadoService } from '../../services/certificado/certificado.service';
import { TableLayoutComponent } from '../../core/ui/components/table-layout/table-layout.component';
import { TableComponent } from '../../core/ui/components/table/table.component';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../../core/ui/components/dropdown/dropdown.component';
import { convertDropdownList, DropdownDTO } from '../../dtos/dropdown/dropdown.dto';
import { CursoService } from '../../services/curso/curso.service';
import { UsuarioService } from '../../services/usuarios/usuario.service';

@Component({
  selector: 'app-controle.certificados',
  standalone: true,
  imports: [CommonModule, TableComponent, TableLayoutComponent, ReactiveFormsModule, DropdownComponent],
  templateUrl: './controle.certificados.component.html',
  styleUrl: './controle.certificados.component.css',
})
export class ControleCertificadosComponent extends BaseController<CertificadoModel> {

  serviceUsuario = inject(UsuarioService);
  serviceCurso = inject(CursoService);
  certificado: CertificadoModel | null  = null;

  columns = [
    { field: 'id_certificado', label: 'ID' },
    { field: 'Usuario.nome', label: 'Usuário' },
    { field: 'Curso.titulo', label: 'Curso' },
    { field: 'data_emissao', label: 'Data de Emissão' },
    { field: 'url_certificado', label: 'URL do Certificado' },
    { field: 'status', label: 'Status' },
  ];

  statusOptions = [
    { label: 'Inativo', value: 'INATIVO' },
    { label: 'Solicitado', value: 'SOLICITADO' },
    { label: 'Gerado', value: 'GERADO' },
    { label: 'Aprovado', value: 'APROVADO' },
    { label: 'Recebido', value: 'RECEBIDO' },
  ];
   selectedOptions = 'Selecione o Status';


   dropdownItemsUsuarios: DropdownDTO[] = []
   selectedUsuario = '';
   selectedUsuarioLabel = 'Selecione o Usuario';


   dropdownItemsCertificado: DropdownDTO[] = []
   selectedCetificado = '';
   selectedCertificadoLabel = 'Selecione o Certificado';



    ngOnInit(): void {
      this.listUsuasio('');
      this.listCursos('');
    }


     listUsuasio(search?: string) {
      this.serviceUsuario.getAll({
        fromObject: {
          search: search  ?? ''
        }
      }).subscribe({
        next: result => {
          this.dropdownItemsUsuarios = convertDropdownList(result.data, ['nome','id_usuario']);
        }
      })
     }

     listCursos(search?: string) {
      this.serviceCurso.getAll({
        fromObject: {
          search: search  ?? ''
        }
      }).subscribe({
        next: result => {
          this.dropdownItemsCertificado = convertDropdownList(result.data, ['titulo','id_curso']);
        }
      })
     }

  constructor(
    protected override fb: FormBuilder,
    certificadoService: CertificadoService
  ) {
    super(fb, certificadoService, 'id_certificado');
    this.form = this.buildForm();
    this.carregar();
  }


    onNovo() {
  this.form.reset();
  this.activeEdit.set(false);

}
  buildForm(): FormGroup {
    return this.fb.group({
      fk_id_usuario: [null, Validators.required, ],
      fk_id_curso: [null, Validators.required],
      url_certificado: ['', Validators.required],
      status: ['INATIVO', Validators.required],
    });
  }

  onPageSizeChange(newSize: number): void {
    this.take.set(newSize);
  }

  onEdit(certificado: CertificadoModel) {
    this.form.patchValue(certificado);
    this.selectedUsuarioLabel = certificado.Usuario.nome;
    this.selectedUsuario = certificado.Usuario.id_usuario.toString();

    this.selectedOptions = certificado.status;
    this.selectedCetificado = certificado.Curso.id_curso.toString();

    this.selectedCertificadoLabel = certificado.Curso.titulo;

    this.certificado = certificado;
    this.activeEdit.set(true);


  }

  onDelete(certificado: CertificadoModel) {
    this.deletar(certificado.id_certificado);
  }

  onSubmit(): void {
    this.form.get('fk_id_usuario')?.setValue(this.selectedUsuario);
    this.form.get('fk_id_curso')?.setValue(this.selectedCetificado);
    this.form.get('status')?.setValue(this.selectedOptions);

    if (this.form.valid && this.activeEdit()) {
      const provaAtualizada = {
        ...this.form.value,
        id_certificado: this.certificado?.id_certificado
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

  onRowSelect(rows: CertificadoModel[]) {
    console.log('Certificados selecionados:', rows);
  }
}
