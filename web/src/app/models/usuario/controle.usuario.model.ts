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
  }
  
  export interface CursoModel {
    id_curso: number;
    titulo: string;
    descricao: string;
  }
  
  export interface FuncaoCursoModel {
    fk_id_funcao: number;
    fk_id_curso: number;
  }
  
  export interface AulaModel {
    id_aula: number;
    titulo: string;
    url_video: string;
    duracao: number;
    fk_id_curso: number;
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
  }
  
  export interface ProvaModel {
    id_prova: number;
    fk_id_curso: number;
    nota_minima: number;
    total_perguntas: number;
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
  }
  
  export interface LogModel {
    id_log: number;
    tabela: string;
    operacao: string;
    id_registro: number;
    dados_antigos?: any;
    dados_novos?: any;
    data_registro: string;
  }
  