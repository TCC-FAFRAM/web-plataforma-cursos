export interface LoginUsuarioModel {
    email: string,
    senha: string,
  }
  
export interface CreateUsuarioModel {
  nome: string;
  sobre_nome: string;
  email: string;
  senha: string;
  cpf: string;
  fk_id_fazenda?: number | null;    // Opcional (pode ser null)
  municipio_id: number;
  distrito_id?: number | null;      // Opcional (pode ser null)
  complemento?: string;
}

  