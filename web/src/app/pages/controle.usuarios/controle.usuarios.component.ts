import { Component, inject } from '@angular/core';
import { TableComponent } from "../../core/ui/components/table/table.component";
import { TableLayoutComponent } from "../../core/ui/components/table-layout/table-layout.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from "../../core/ui/components/dropdown/dropdown.component";
import {  UsuarioModel } from '../../models/usuario/controle.usuario.model';
import { BaseController } from '../../services/base.crud.controller';
import { UsuariosService } from '../../services/usuarios/usuario.service';

@Component({
  selector: 'app-controle.usuarios',
  standalone: true,
  imports: [CommonModule, TableComponent, TableLayoutComponent, ReactiveFormsModule, DropdownComponent],
  templateUrl: './controle.usuarios.component.html',
  styleUrl: './controle.usuarios.component.css'
})
export class ControleUsuariosComponent extends BaseController<UsuarioModel> {
  columns = [
    { field: 'id_usuario', label: 'ID' },
    { field: 'nome', label: 'Nome' },
    { field: 'sobre_nome', label: 'Sobrenome' },
    { field: 'email', label: 'Email' },
    { field: 'cpf', label: 'CPF' },
    { field: 'data_cadastro', label: 'Data de Cadastro' },
    { field: 'Fazenda', label: 'Fazenda' },
    { field: 'Funcao', label: 'Função' },
    { field: 'Certificados', label: 'Certificados', isArray: true, columnsInside: [
        { field: 'id_certificado', label: 'ID' },
        { field: 'status', label: 'Status' },
        { field: 'data_emissao', label: 'Data de Emissão' }
      ]
    }
  ];
  
  

  dropdownItems = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Usuário', value: 'user' },
    { label: 'Convidado', value: 'guest' }
  ];

  
  selectedTipo = '';

  constructor(
    protected override fb: FormBuilder,
    usuariosService: UsuariosService
  ) {
    super(fb, usuariosService);
    this.form = this.buildForm();
    this.carregar();
  }
  

  buildForm(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sobre_nome: ['', Validators.required],
      cpf: ['', Validators.required],
      complemento: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }
  onPageSizeChange(newSize: number): void {
    this.take.set(newSize);       
  }   

  onEdit(usuario: UsuarioModel) {
    this.form.patchValue(usuario);
  }

  onDelete(usuario: UsuarioModel) {
    this.deletar(usuario.id_usuario);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.salvar(this.form.value);
      this.form.reset();
    }
  }

  onRowSelect(rows: UsuarioModel[]) {
    console.log('Selecionados:', rows);
  }
  
}

