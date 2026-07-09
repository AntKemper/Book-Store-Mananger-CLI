import { EmprestimoRepository } from '../repositories/EmprestimoRepository';
import { LivroRepository } from '../repositories/LivroRepository';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { Emprestimo } from '../models/Emprestimo';

export class EmprestimoService {
  private emprestimoRepository: EmprestimoRepository;
  private livroRepository: LivroRepository;
  private clienteRepository: ClienteRepository;

  constructor() {
    this.emprestimoRepository = new EmprestimoRepository();
    this.livroRepository = new LivroRepository();
    this.clienteRepository = new ClienteRepository();
  }

  async emprestar(livro_id: number, cliente_id: number): Promise<Emprestimo> {
    // 1. Verifica se o livro existe
    const livro = await this.livroRepository.buscarPorId(livro_id);
    if (!livro) {
      throw new Error(`Livro com id ${livro_id} não encontrado.`);
    }

    // 2. Verifica se o cliente existe
    const cliente = await this.clienteRepository.buscarPorId(cliente_id);
    if (!cliente) {
      throw new Error(`Cliente com id ${cliente_id} não encontrado.`);
    }

    // 3. Verifica disponibilidade
    if (livro.quantidade_disponivel === undefined || livro.quantidade_disponivel <= 0) {
      throw new Error(`O livro "${livro.titulo}" não possui exemplares disponíveis no momento.`);
    }

    // 4. Cria o empréstimo
    const emprestimo = await this.emprestimoRepository.criar({ livro_id, cliente_id });

    // 5. Decrementa a disponibilidade do livro
    await this.livroRepository.decrementarDisponivel(livro_id);

    return emprestimo;
  }

  async devolver(emprestimo_id: number): Promise<Emprestimo> {
    // 1. Verifica se o empréstimo existe
    const emprestimo = await this.emprestimoRepository.buscarPorId(emprestimo_id);
    if (!emprestimo) {
      throw new Error(`Empréstimo com id ${emprestimo_id} não encontrado.`);
    }

    // 2. Verifica se já foi devolvido
    if (emprestimo.data_devolucao) {
      throw new Error(`Este empréstimo já foi devolvido anteriormente.`);
    }

    // 3. Registra a devolução
    const emprestimoAtualizado = await this.emprestimoRepository.registrarDevolucao(emprestimo_id);
    if (!emprestimoAtualizado) {
      throw new Error(`Não foi possível registrar a devolução do empréstimo ${emprestimo_id}.`);
    }

    // 4. Incrementa a disponibilidade do livro
    await this.livroRepository.incrementarDisponivel(emprestimo.livro_id);

    return emprestimoAtualizado;
  }

  async listarTodos(): Promise<any[]> {
    return await this.emprestimoRepository.listarTodos();
  }

  async listarAtivos(): Promise<any[]> {
    return await this.emprestimoRepository.listarAtivos();
  }
}