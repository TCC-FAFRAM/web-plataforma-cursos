import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FazendaService } from '../../../services/fazendas/fazendas.service';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { LocalizacaoService } from '../../../services/localidade/localidade.service';
import { DropdownComponent } from "../../../core/ui/components/dropdown/dropdown.component";
import { ModalFeedbackComponent } from "../../../core/ui/components/modal/modal";
import { AutenticacaoService } from '../../../services/autenticacao/autenticacao.service';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownComponent, ModalFeedbackComponent],
  templateUrl: './cadastro.usuario.component.html',
  styleUrl: './cadastro.usuario.component.css'
})
export class CadastroUsuarioComponent implements OnInit {
  showModal = false;
modalType: 'success' | 'error' = 'success';
modalTitle = '';
modalMsg = '';
  form!: FormGroup;
  estados: any[] = [];
  municipios: any[] = [];
  distritos: any[] = [];
  fazendas: any[] = [];
  loading = signal(false);

  private readonly fb = inject(FormBuilder);
  private readonly localizacaoService = inject(LocalizacaoService);
  private readonly fazendaService = inject(FazendaService);
  private readonly  autenticateService = inject(AutenticacaoService);

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sobre_nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      cpf: ['', Validators.required],
      fk_id_fazenda: [0, Validators.required],
      estado: ['', Validators.required],
      municipio_id: ['', Validators.required],
      distrito_id: [''],
      complemento: ['']
    });

    // Carregar todos os estados já com municípios e distritos aninhados
    this.localizacaoService.getEstados().subscribe(res => {
      this.estados = Array.isArray(res) ? res : (res as any).data;
    });

    // Carregar fazendas
    this.fazendaService.getAll({}).subscribe(res => {
      this.fazendas = Array.isArray(res) ? res : res.data;
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

    onFazendaSelected(id: any) {
    this.form.get('fk_id_fazenda')?.setValue(id);
  }

  submit() {
    if (this.form.valid) {
      this.loading.set(true);
      const { estado, ...dados } = this.form.value;
      this.autenticateService.create(dados).subscribe({
        next: () => {
           this.modalType = 'success';
        this.modalTitle = 'Conta criada!';
        this.modalMsg = 'Sua conta foi criada com sucesso. Você já pode acessar a plataforma.';
        this.showModal = true;
          this.form.reset();
        },
        error: (err) => {
            this.modalType = 'error';
        this.modalTitle = 'Erro ao cadastrar';
        this.modalMsg = err.error?.error || err.message || 'Ocorreu um erro ao criar sua conta.';
        this.showModal = true;
        },
        complete: () => this.loading.set(false)
      });
    }
  }

  onCloseModal() {
  this.showModal = false;
}

}
