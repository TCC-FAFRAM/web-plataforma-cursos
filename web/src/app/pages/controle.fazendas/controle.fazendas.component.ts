import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseController } from '../../services/base.crud.controller';
import { FazendaModel } from '../../models/usuario/controle.usuario.model';
import { FazendaService } from '../../services/fazendas/fazendas.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../core/ui/components/table/table.component';
import { TableLayoutComponent } from '../../core/ui/components/table-layout/table-layout.component';
import { DropdownComponent } from '../../core/ui/components/dropdown/dropdown.component';
import { LocalizacaoService } from '../../services/localidade/localidade.service';
import { UsuarioService } from '../../services/usuarios/usuario.service';


@Component({
  selector: 'app-controle.fazendas',
  standalone: true,
  imports: [CommonModule, TableComponent, TableLayoutComponent, ReactiveFormsModule, DropdownComponent],
  templateUrl: './controle.fazendas.component.html',
  styleUrl: './controle.fazendas.component.css'
})
export class ControleFazendasComponent extends  BaseController<FazendaModel> implements OnInit {
  override form!: FormGroup;
  estados: any[] = [];
  municipios: any[] = [];
  distritos: any[] = [];

    private readonly localizacaoService = inject(LocalizacaoService);
     private readonly fazendaService = inject(FazendaService);
  
  constructor(
    protected override fb: FormBuilder,
    fazendaService: FazendaService
  ) {
    super(fb, fazendaService, 'id_fazenda');
  }

  columns = [
    { field: 'id_fazenda', label: 'ID' },
    { field: 'nome', label: 'Nome' },
    { field: 'proprietario', label: 'Proprietário' },
    { field: 'descricao', label: 'Descrição' },
    { field: 'Distrito.nome', label: 'Distrito' },
    { field: 'Municipio.nome', label: 'Município' },
    { field: 'complemento', label: 'Complemento' },
  ];

  buildForm(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      proprietario: [''],
      descricao: [''],
      estado: [null, Validators.required],          // <<=== AQUI!
      municipio_id: [null, Validators.required],    // <<=== AQUI!
      distrito_id: [null],
      complemento: [''],
    });
  }

  ngOnInit() {
   this.form = this.buildForm();
    this.carregar();

    
    this.localizacaoService.getEstados().subscribe(res => {
      this.estados = Array.isArray(res) ? res : (res as any).data;
    });

    // Quando muda o estado, filtra os municípios localmente
    this.form.get('estado')?.valueChanges.subscribe((id_estado) => {
      if (id_estado) {
        const estadoSelecionado = this.estados.find(e => e.id_estado === id_estado);
        this.municipios = estadoSelecionado ? estadoSelecionado.Municipios : [];
        this.distritos = [];
        this.form.get('municipio_id')?.reset();
        this.form.get('distrito_id')?.reset();
      } else {
        this.municipios = [];
        this.distritos = [];
        this.form.get('municipio_id')?.reset();
        this.form.get('distrito_id')?.reset();
      }
    });

    // Quando muda o município, filtra os distritos localmente
    this.form.get('municipio_id')?.valueChanges.subscribe((id_municipio) => {
      if (id_municipio) {
        const municipioSelecionado = this.municipios.find(m => m.id_municipio === id_municipio);
        this.distritos = municipioSelecionado ? municipioSelecionado.Distritos : [];
        this.form.get('distrito_id')?.reset();
      } else {
        this.distritos = [];
        this.form.get('distrito_id')?.reset();
      }
    });
  }


  onEstadoSelected(id: any) {
    this.form.get('estado')?.setValue(id);
  }
  onMunicipioSelected(id: any) {
    this.form.get('municipio_id')?.setValue(id);
  }
  onDistritoSelected(id: any) {
    this.form.get('distrito_id')?.setValue(id);
  }

  

  onPageSizeChange(newSize: number): void {
    this.take.set(newSize);
  }

  onEdit(fazenda: FazendaModel) {
    this.form.patchValue(fazenda);
  }

  onDelete(fazenda: FazendaModel) {
    this.deletar(fazenda.id_fazenda);
  }

  onSubmit(): void {
    const { estado, ...dados } = this.form.value;
    if (this.form.valid) {
      this.salvar(dados);
      this.form.reset();
    }
  }

  onRowSelect(rows: FazendaModel[]) {
    console.log('Fazendas selecionadas:', rows);
  }
}
