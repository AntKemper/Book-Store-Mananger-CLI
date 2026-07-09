import { LivroRepository } from '../repositories/LivroRepository';
import { AutorRepository } from '../repositories/AutorRepository';
import { Livro } from '../models/Livro';

export class LivroService {
  private livroRepository: LivroRepository;
  private autorRepository: AutorRepository;

  constructor() {
    this.livroRepository = new LivroRepository();
    this.autorRepository = new AutorRepository();
  }

  async cadastrar(titulo: string, autor_id: number, quantidade_total: number): Promise<Livro> {
    if (!titulo || titulo.trim() === '') {
      throw new Error('O título do livro não pode ser vazio.');
    }
    if (quantidade_total <= 0) {
      throw new Error('A quantidade total deve ser maior que zero.');
    }

    const autor = await this.autorRepository.buscarPorId(autor_id);
    if (!autor) {
      throw new Error(`Autor com id ${autor_id} não encontrado. Cadastre o autor antes de cadastrar o livro.`);
    }

    return await this.livroRepository.criar({ titulo, autor_id, quantidade_total });
  }

  async listar(): Promise<Livro[]> {
    return await this.livroRepository.listarTodos();
  }

  async buscarPorId(id: number): Promise<Livro> {
    const livro = await this.livroRepository.buscarPorId(id);
    if (!livro) {
      throw new Error(`Livro com id ${id} não encontrado.`);
    }
    return livro;
  }

  async atualizar(id: number, titulo: string, autor_id: number, quantidade_total: number): Promise<Livro> {
    await this.buscarPorId(id);

    const autor = await this.autorRepository.buscarPorId(autor_id);
    if (!autor) {
      throw new Error(`Autor com id ${autor_id} não encontrado.`);
    }

    const livroAtualizado = await this.livroRepository.atualizar(id, { titulo, autor_id, quantidade_total });
    if (!livroAtualizado) {
      throw new Error(`Não foi possível atualizar o livro com id ${id}.`);
    }
    return livroAtualizado;
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    const removido = await this.livroRepository.remover(id);
    if (!removido) {
      throw new Error(`Não foi possível remover o livro com id ${id}.`);
    }
  }
}