export interface Livro {
  id?: number;
  titulo: string;
  autor_id: number;
  quantidade_total: number;
  quantidade_disponivel?: number;
}