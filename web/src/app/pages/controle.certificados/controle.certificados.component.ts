import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseController } from '../../services/base.crud.controller';
import { CertificadoModel } from '../../models/usuario/controle.usuario.model';
import { CertificadoService } from '../../services/certificado/certificado.service';
import { TableLayoutComponent } from '../../core/ui/components/table-layout/table-layout.component';
import { TableComponent } from '../../core/ui/components/table/table.component';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../../core/ui/components/dropdown/dropdown.component';

@Component({
  selector: 'app-controle.certificados',
  standalone: true,
  imports: [CommonModule, TableComponent, TableLayoutComponent, ReactiveFormsModule],
  templateUrl: './controle.certificados.component.html',
  styleUrl: './controle.certificados.component.css',
})
export class ControleCertificadosComponent extends BaseController<CertificadoModel> {
  columns = [
    { field: 'id_certificado', label: 'ID' },
    { field: 'fk_id_usuario', label: 'ID do Usuário' },
    { field: 'fk_id_curso', label: 'ID do Curso' },
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

  constructor(
    protected override fb: FormBuilder,
    certificadoService: CertificadoService
  ) {
    super(fb, certificadoService);
    this.form = this.buildForm();
    this.carregar();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      fk_id_usuario: [null, Validators.required],
      fk_id_curso: [null, Validators.required],
      data_emissao: ['', Validators.required],
      url_certificado: ['', Validators.required],
      status: ['INATIVO', Validators.required],
    });
  }

  onPageSizeChange(newSize: number): void {
    this.take.set(newSize);
  }

  onEdit(certificado: CertificadoModel) {
    this.form.patchValue(certificado);
  }

  onDelete(certificado: CertificadoModel) {
    this.deletar(certificado.id_certificado);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.salvar(this.form.value);
      this.form.reset();
    }
  }

  onRowSelect(rows: CertificadoModel[]) {
    console.log('Certificados selecionados:', rows);
  }
}
