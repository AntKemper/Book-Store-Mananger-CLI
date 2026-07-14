import { RelatorioRepository } from '../repositories/relatorioRepository';

export class RelatorioService {
  private relatorioRepository: RelatorioRepository;

  constructor() {
    this.relatorioRepository = new RelatorioRepository();
  }

  async livrosDisponiveis(): Promise<any[]> {
    return await this.relatorioRepository.livrosDisponiveis();
  }

  async livrosEmprestados(): Promise<any[]> {
    return await this.relatorioRepository.livrosEmprestados();
  }

  async livrosCadastradosPorAutor(): Promise<any[]> {
    return await this.relatorioRepository.livrosCadastradosPorAutor();
  }

  async quantidadeEmprestimosPorLivro(): Promise<any[]> {
    return await this.relatorioRepository.quantidadeEmprestimosPorLivro();
  }

  async clientesComEmprestimosAtivos(): Promise<any[]> {
    return await this.relatorioRepository.clientesComEmprestimosAtivos();
  }
}