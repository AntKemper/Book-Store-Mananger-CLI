import { AutorRepository } from '../repositories/AutorRepository';
import { Autor } from '../models/Autor';

export class AutorService {
  private autorRepository: AutorRepository;

  constructor() {
    this.autorRepository = new AutorRepository();
  }

  async cadastrar(nome: string): Promise<Autor> {
    if (!nome || nome.trim() === '') {
      throw new Error('O nome do autor não pode ser vazio.');
    }
    return await this.autorRepository.criar({ nome });
  }

  async listar(): Promise<Autor[]> {
    return await this.autorRepository.listarTodos();
  }

  async buscarPorId(id: number): Promise<Autor> {
    const autor = await this.autorRepository.buscarPorId(id);
    if (!autor) {
      throw new Error(`Autor com id ${id} não encontrado.`);
    }
    return autor;
  }

  async atualizar(id: number, nome: string): Promise<Autor> {
    await this.buscarPorId(id); // valida que existe antes de atualizar
    if (!nome || nome.trim() === '') {
      throw new Error('O nome do autor não pode ser vazio.');
    }
    const autorAtualizado = await this.autorRepository.atualizar(id, { nome });
    if (!autorAtualizado) {
      throw new Error(`Não foi possível atualizar o autor com id ${id}.`);
    }
    return autorAtualizado;
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id); // valida que existe antes de remover
    const removido = await this.autorRepository.remover(id);
    if (!removido) {
      throw new Error(`Não foi possível remover o autor com id ${id}.`);
    }
  }
}