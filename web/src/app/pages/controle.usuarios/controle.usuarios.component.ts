import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from "../../core/ui/components/table/table.component";
import { TableLayoutComponent } from "../../core/ui/components/table-layout/table-layout.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from "../../core/ui/components/dropdown/dropdown.component";
import {  FazendaModel, UsuarioModel } from '../../models/usuario/controle.usuario.model';
import { BaseController } from '../../services/base.crud.controller';
import { UsuariosService } from '../../services/usuarios/usuario.service';
import { FuncaoService } from '../../services/funcao/funcao.service';
import { HttpParams } from '@angular/common/http';
import { convertDropdownList, DropdownDTO } from '../../dtos/dropdown/dropdown.dto';
import { DistritoService } from '../../services/ditrito/distrito.service';

@Component({
  selector: 'app-controle.usuarios',
  standalone: true,
  imports: [CommonModule, TableComponent, TableLayoutComponent, ReactiveFormsModule, DropdownComponent],
  templateUrl: './controle.usuarios.component.html',
  styleUrl: './controle.usuarios.component.css'
})
export class ControleUsuariosComponent extends BaseController<UsuarioModel> implements  OnInit {
serviceFuncao = inject(FuncaoService);
serviceDistrito = inject(DistritoService);
usuario: UsuarioModel | null = null; 

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
    { label: 'Administrador', value: 'ADMIN' },
    { label: 'Usuário', value: 'USER' },
  ];
  selectedTipoUsuario = '';

  dropdownUF: DropdownDTO[] = []
  selectedUF = '';

  dropdownMunicipios: DropdownDTO[] = []
  selectedMunicipios = 0;

  dropdownDistrito: DropdownDTO[] = []
  selectedDistrito = 0;


  dropdownItemsFuncao: DropdownDTO[] = []
  selectedFuncao = 0;

  constructor(
    protected override fb: FormBuilder,
    usuariosService: UsuariosService
  ) {
    super(fb, usuariosService, 'id_usuario');
    this.form = this.buildForm();
    this.carregar();
  }
  ngOnInit(): void {
    this.listFuncao('');
    this.listUF();
    if(this.usuario !== null){
      this.listMunicipio(this.usuario.municipio_id, true);
      this.listDistrito(this.usuario.distrito_id);
    }
  }
  

   listFuncao(search?: string) {
    this.serviceFuncao.getAll({
      fromObject: {
        search: search  ?? ''
      }
    }).subscribe({
      next: result => {
        this.dropdownItemsFuncao = convertDropdownList(result.data, ['nome','id_funcao']);
      }
    })
   }

   listUF(search?: string) {
    this.serviceDistrito.getUFs().subscribe({
      next: result => {
        this.dropdownUF = result;
      }
    })
   }

   listMunicipio(uf: any, carregamento: boolean) {
    this.selectedMunicipios = uf;
    this.serviceDistrito.getMunicipios(uf).subscribe({
      next: result => {
        this.dropdownMunicipios = result;
       
      }
    })
   }

   listDistrito(id: any){
    this.selectedMunicipios = id;
    this.serviceDistrito.getDistritos(id).subscribe({
      next: result => {
        this.dropdownDistrito = result;
      }
    })
   }


  buildForm(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sobre_nome: ['', Validators.required],
      cpf: ['', Validators.required],
      complemento: ['', Validators.required],
      tipo: ['', Validators.required],
      distrito_id: [null, Validators.required],
      municipio_id: [null, Validators.required],
      fk_id_funcao: [null, Validators.required],
    });
  }
  onPageSizeChange(newSize: number): void {
    this.take.set(newSize);       
  }   

  onEdit(usuario: UsuarioModel) {
    this.form.patchValue(usuario);
    this.activeEdit.set(true)
    this.usuario = usuario;

  }

  onDelete(usuario: UsuarioModel) {
    this.deletar(usuario.id_usuario);
  }

  onSubmit(): void {
    this.form.get('distrito_id')?.setValue(this.selectedMunicipios);
    this.form.get('municipio_id')?.setValue(this.selectedDistrito);

    this.form.get('tipo')?.setValue(this.selectedTipoUsuario);
    this.form.get('fk_id_funcao')?.setValue(this.selectedFuncao);

    if (this.form.valid && this.activeEdit()) {
      const usuario = {
        ...this.form.value,
        id_usuario: this.usuario?.id_usuario
      };
      this.atualizar(usuario);
      this.form.reset();
    } else if(this.form.valid) {
      this.salvar(this.form.value);
      this.form.reset();
    }
  }

  onRowSelect(rows: UsuarioModel[]) {
    console.log('Selecionados:', rows);
  }
  
}



