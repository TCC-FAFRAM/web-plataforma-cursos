
export interface UsuarioModel {
    id_usuario: number;
    nome: string;
    sobre_nome: string;
    email: string;
    senha: string;
    cpf: string;
    tipo: 'USER' | 'ADMIN' | 'MASTER';
    data_cadastro: string;
    fk_id_funcao?: number | null;
    fk_id_fazenda?: number | null;
    distrito_id?: number | null;
    municipio_id?: number | null;
    complemento?: string | null;
    Funcao?: FuncaoModel | null;
    Fazenda?: FazendaModel| null;
    Certificados?: CertificadoModel[];
    TentativasProva?: TentativasProvaModel[];
    CursosConcluidos?: CursosConcluidosModel[];
    LiberacoesCursoFuncionario?: LiberacaoCursoModel[];
    LiberacoesCursoAdmin?: LiberacaoCursoModel[];
  }

  export interface FazendaModel {
    id_fazenda: number;
    nome: string;
    proprietario?: string | null;
    descricao?: string | null;
    distrito_id?: number | null;
    municipio_id?: number | null;
    complemento?: string | null;
  }

  export interface FuncaoModel {
    id_funcao: number;
    nome: string;
    descricao: string;
    FuncaoCurso: FuncaoCursoModel[];
  }

  export interface CursoModel {
    id_curso: number;
    titulo: string;
    descricao: string;
    url_img: string;
  }

  export interface FuncaoCursoModel {
    fk_id_funcao: number;
    fk_id_curso: number;
    Curso: CursoModel;
  }

  export interface AulaModel {
    id_aula: number;
    titulo: string;
    url_video: string;
    duracao: number;
    fk_id_curso: number;

    Modulo: ModuloModel;
  }

  export interface CursosConcluidosModel {
    id_concluidos: number;
    fk_id_usuario: number;
    fk_id_aula: number;
    completado_em: string;
  }

  export interface CertificadoModel {
    id_certificado: number;
    fk_id_usuario: number;
    fk_id_curso: number;
    data_emissao: string;
    url_certificado: string;
    status: 'INATIVO' | 'SOLICITADO' | 'GERADO' | 'APROVADO' | 'RECEBIDO';
    Usuario: UsuarioModel,
    Curso: CursoModel
  }

  export interface ProvaModel {
    id_prova: number;
    fk_id_modulo: number;
    nota_minima: number;
    total_perguntas: number;
    Modulo: ModuloModel;
    Questoes: QuestaoModel[];
  }

export interface QuestaoModel {
  id_questao: number;
  pergunta: string;
  opcoes: string[];        // Array de alternativas
  resposta_correta: number; // Índice da opção correta
  peso: number;
  fk_id_prova: number;
  Prova?: ProvaModel;       // opcional, se vier expandido
}

export interface RespostaQuestaoModel {
  id_resposta: number;
  fk_id_questao: number;
  fk_id_tentativa: number;
  resposta_aluno: number; // Índice ou valor da resposta do aluno

  Questao?: QuestaoModel;                // Relação opcional expandida
  TentativaProva?: TentativasProvaModel; // Relação opcional expandida
}


  export interface TentativasProvaModel {
    id_tentativa_prova: number;
    fk_id_funcionario: number;
    fk_id_prova: number;
    nota: number;
    data_tentativa: string;
    passou: boolean;
  }

  export interface LiberacaoCursoModel {
    id_liberacao_curso: number;
    fk_id_funcionario: number;
    fk_id_curso: number;
    fk_id_admin: number;
    data_liberacao: string;

    Curso : CursoModel;
    Admin: UsuarioModel;
    Funcionario: UsuarioModel;

  }

  export interface LogModel {
    id_log: number;
    tabela: string;
    operacao: string;
    id_registro: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dados_antigos?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dados_novos?: any;
    data_registro: string;
  }


  export interface ModuloModel {
    id_modulo: number;
    titulo: string;
    descricao: string;
    ordem: number;
    concluido: boolean;
    fk_id_curso: number;
    fk_id_modulo_anterior?: number | null;

    // Relacionamentos
    Curso: CursoModel;
    Aulas: AulaModel[];
    ModuloAnterior?: ModuloModel | null;
    ModulosPosteriores?: ModuloModel[];
    Prova?: ProvaModel | null;
  }
