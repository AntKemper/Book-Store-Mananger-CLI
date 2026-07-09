import { ClienteRepository } from '../repositories/ClienteRepository';
import { Cliente } from '../models/Cliente';

export class ClienteService {
  private clienteRepository: ClienteRepository;

  constructor() {
    this.clienteRepository = new ClienteRepository();
  }

  async cadastrar(nome: string): Promise<Cliente> {
    if (!nome || nome.trim() === '') {
      throw new Error('O nome do cliente não pode ser vazio.');
    }
    return await this.clienteRepository.criar({ nome });
  }

  async listar(): Promise<Cliente[]> {
    return await this.clienteRepository.listarTodos();
  }

  async buscarPorId(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.buscarPorId(id);
    if (!cliente) {
      throw new Error(`Cliente com id ${id} não encontrado.`);
    }
    return cliente;
  }

  async atualizar(id: number, nome: string): Promise<Cliente> {
    await this.buscarPorId(id);
    if (!nome || nome.trim() === '') {
      throw new Error('O nome do cliente não pode ser vazio.');
    }
    const clienteAtualizado = await this.clienteRepository.atualizar(id, { nome });
    if (!clienteAtualizado) {
      throw new Error(`Não foi possível atualizar o cliente com id ${id}.`);
    }
    return clienteAtualizado;
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    const removido = await this.clienteRepository.remover(id);
    if (!removido) {
      throw new Error(`Não foi possível remover o cliente com id ${id}.`);
    }
  }
}