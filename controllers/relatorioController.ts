import { RelatorioService } from '../services/relatorioService';
import { perguntar } from '../utils/Funcoes_auxiliares';

const relatorioService = new RelatorioService();

export async function exibirMenuRelatorios(): Promise<void> {
  let voltar = false;

  while (!voltar) {
    console.log('\n--- MENU RELATÓRIOS ---');
    console.log('1. Livros disponíveis');
    console.log('2. Livros emprestados');
    console.log('3. Livros cadastrados por autor');
    console.log('4. Quantidade de empréstimos por livro');
    console.log('5. Clientes com empréstimos ativos');
    console.log('0. Voltar ao menu principal');

    const opcao = await perguntar('Escolha uma opção: ');

    try {
      switch (opcao) {
        case '1':
          await relatorioLivrosDisponiveis();
          break;
        case '2':
          await relatorioLivrosEmprestados();
          break;
        case '3':
          await relatorioLivrosCadastradosPorAutor();
          break;
        case '4':
          await relatorioQuantidadeEmprestimosPorLivro();
          break;
        case '5':
          await relatorioClientesComEmprestimosAtivos();
          break;
        case '0':
          voltar = true;
          break;
        default:
          console.log('Opção inválida. Tente novamente.');
      }
    } catch (error: any) {
      console.log(`Erro: ${error.message}`);
    }
  }
}

async function relatorioLivrosDisponiveis(): Promise<void> {
  const dados = await relatorioService.livrosDisponiveis();
  if (dados.length === 0) {
    console.log('Nenhum livro disponível no momento.');
    return;
  }
  console.log('\n--- Livros Disponíveis ---');
  dados.forEach((item) => {
    console.log(`${item.titulo} | Disponíveis: ${item.quantidade_disponivel}`);
  });
}

async function relatorioLivrosEmprestados(): Promise<void> {
  const dados = await relatorioService.livrosEmprestados();
  if (dados.length === 0) {
    console.log('Nenhum livro emprestado no momento.');
    return;
  }
  console.log('\n--- Livros Emprestados ---');
  dados.forEach((item) => {
    console.log(`${item.titulo} | Cliente: ${item.cliente} | Data: ${item.data_emprestimo}`);
  });
}

async function relatorioLivrosCadastradosPorAutor(): Promise<void> {
  const dados = await relatorioService.livrosCadastradosPorAutor();
  console.log('\n--- Livros Cadastrados por Autor ---');
  dados.forEach((item) => {
    console.log(`${item.autor} | Quantidade de livros: ${item.quantidade_livros}`);
  });
}

async function relatorioQuantidadeEmprestimosPorLivro(): Promise<void> {
  const dados = await relatorioService.quantidadeEmprestimosPorLivro();
  console.log('\n--- Quantidade de Empréstimos por Livro (Top 10) ---');
  dados.forEach((item) => {
    console.log(`${item.titulo} | Total de empréstimos: ${item.total_emprestimos}`);
  });
}

async function relatorioClientesComEmprestimosAtivos(): Promise<void> {
  const dados = await relatorioService.clientesComEmprestimosAtivos();
  if (dados.length === 0) {
    console.log('Nenhum cliente com empréstimo ativo no momento.');
    return;
  }
  console.log('\n--- Clientes com Empréstimos Ativos ---');
  dados.forEach((item) => {
    console.log(`${item.nome} | Empréstimos ativos: ${item.emprestimos_ativos}`);
  });
}