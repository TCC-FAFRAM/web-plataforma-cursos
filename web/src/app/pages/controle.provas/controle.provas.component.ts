import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProvaService } from '../../services/provas/provas.service';
import { ProvaModel, QuestaoModel } from '../../models/usuario/controle.usuario.model';
import { QuestaoService } from '../../services/provas/questoes.service';
import { CommonModule } from '@angular/common';
import { DropdownDTO, convertDropdownList } from '../../dtos/dropdown/dropdown.dto';
import { DropdownComponent } from "../../core/ui/components/dropdown/dropdown.component";
import { ModuloService } from '../../services/curso/modulo.service';

@Component({
  selector: 'app-controle-provas',
  templateUrl: './controle.provas.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownComponent],
  styleUrls: ['./controle.provas.component.css']
})
export class ControleProvasComponent implements OnInit {
  provaForm: FormGroup;
  questaoForm: FormGroup;
  questoes: QuestaoModel[] = [];
  idProva = 0;
  
  dropdownItemsModulo: DropdownDTO[] = [];
  selectedModulo = 0;
  selectedModuloLabel = 'Selecione o Módulo';
  edit = false;
  showNovaQuestao = false;

  // Para acessar as opções do formulário de questão
  get opcoes() { return this.questaoForm.get('opcoes') as FormArray; }

  serviceModulo = inject(ModuloService);

  constructor(
    private fb: FormBuilder,
    private provaService: ProvaService,
    private questaoService: QuestaoService,
  ) {

    this.provaForm = this.fb.group({
      nota_minima: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      total_perguntas: [0],
      fk_id_modulo: [0, Validators.required],
    });

    this.questaoForm = this.fb.group({
      pergunta: ['', Validators.required],
      opcoes: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ]),
      resposta_correta: [0, Validators.required],
      peso: [1, [Validators.required, Validators.min(0.5)]],
    });
  }

ngOnInit(): void {
  this.listModulo();

  const moduloSalvo = localStorage.getItem('moduloSelecionado');
  if (moduloSalvo) {
    setTimeout(() => {
      this.selectedModulo = Number(moduloSalvo);
      this.onSelectec(Number(moduloSalvo));
    }, 200);
  }
}


  listModulo(search?: string) {
    this.serviceModulo.getAll({
      fromObject: {
        search: search ?? ''
      }
    }).subscribe({
      next: result => {
        this.dropdownItemsModulo = convertDropdownList(result.data, ['titulo', 'id_modulo']);
      }
    });
  }

onSelectec(id_modulo: number) {
  this.selectedModulo = id_modulo;
  localStorage.setItem('moduloSelecionado', String(id_modulo));
  this.showNovaQuestao = false;

  this.provaService.findById(id_modulo).subscribe({
    next: (prova) => {
      if (prova) {
        this.edit = true;
        this.idProva = prova.id_prova;
        this.provaForm.patchValue({
          fk_id_modulo: prova.fk_id_modulo,
          nota_minima: prova.nota_minima

        });
        this.questoes = prova.Questoes || [];

        this.provaForm.get('total_perguntas')?.setValue(this.questoes.length);
      } else {
        this.edit = false;
        this.provaForm.reset();
        this.questoes = [];
        this.provaForm.get('total_perguntas')?.setValue(0);
        localStorage.removeItem('moduloSelecionado');
      }
    }
  });
}


get respostaCorretaCtrl(): FormControl {
  return this.questaoForm.get('resposta_correta') as FormControl;
}

  addOpcao() {
    this.opcoes.push(this.fb.control('', Validators.required));
  }
  removeOpcao(i: number) {
    if (this.opcoes.length > 2) this.opcoes.removeAt(i);
  }

  onSubmitProva() {
    this.provaForm.get('fk_id_modulo')?.setValue(this.selectedModulo);

    

    if (!this.edit && this.provaForm.valid) {
      const novaProva: ProvaModel = this.provaForm.value;
      this.provaService.create(novaProva).subscribe({
        next: () => {
          this.provaForm.reset();
          this.selectedModuloLabel = 'Selecione Módulo';
          this.selectedModulo = 0;
          this.questoes = [];
        }
      });
    } else if (this.edit && this.provaForm.valid) {
      const novaProva: ProvaModel = this.provaForm.value;
      this.provaService.update(novaProva, this.idProva).subscribe({
        next: () => {
          this.provaForm.reset();
          this.selectedModuloLabel = 'Selecione Módulo';
          this.selectedModulo = 0;
          this.questoes = [];
        }
      });
    }
  }

  onDeletePergunta(id: number, modulo: number){
     this.questaoService.delete(id).subscribe({ next: e =>  this.onSelectec(modulo)});
  }

  onSubmitQuestao() {
    if (this.questaoForm.valid && this.idProva) {
      const novaQuestao: any = {
        ...this.questaoForm.value,
        opcoes: this.questaoForm.value.opcoes,
        fk_id_prova: this.idProva
      };
      this.questaoService.create(novaQuestao).subscribe({
        next: () => {
          this.questaoForm.reset();
          this.questaoForm.setControl('opcoes', this.fb.array([
            this.fb.control('', Validators.required),
            this.fb.control('', Validators.required)
          ]));
          this.showNovaQuestao = false; // Esconde o formulário após salvar
          // Atualiza as questões após salvar
          this.onSelectec(this.selectedModulo);
        }
      });
    }
  }
}
