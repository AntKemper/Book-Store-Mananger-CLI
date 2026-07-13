import { EmprestimoService } from '../services/emprestimoService';
import { perguntar } from '../utils/Funcoes_auxiliares';

const emprestimoService = new EmprestimoService();

export async function exibirMenuEmprestimos(): Promise<void> {
  let voltar = false;

  while (!voltar) {
    console.log('\n--- MENU EMPRÉSTIMOS ---');
    console.log('1. Registrar empréstimo');
    console.log('2. Registrar devolução');
    console.log('3. Listar todos os empréstimos');
    console.log('4. Listar empréstimos ativos');
    console.log('0. Voltar ao menu principal');

    const opcao = await perguntar('Escolha uma opção: ');

    try {
      switch (opcao) {
        case '1':
          await registrarEmprestimo();
          break;
        case '2':
          await registrarDevolucao();
          break;
        case '3':
          await listarTodosEmprestimos();
          break;
        case '4':
          await listarEmprestimosAtivos();
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

async function registrarEmprestimo(): Promise<void> {
  const livro_id = Number(await perguntar('ID do livro: '));
  const cliente_id = Number(await perguntar('ID do cliente: '));
  const emprestimo = await emprestimoService.emprestar(livro_id, cliente_id);
  console.log(`Empréstimo registrado! ID do empréstimo: ${emprestimo.id}`);
}

async function registrarDevolucao(): Promise<void> {
  const emprestimo_id = Number(await perguntar('ID do empréstimo: '));
  await emprestimoService.devolver(emprestimo_id);
  console.log('Devolução registrada!');
}

async function listarTodosEmprestimos(): Promise<void> {
  const emprestimos = await emprestimoService.listarTodos();
  if (emprestimos.length === 0) {
    console.log('Nenhum empréstimo registrado.');
    return;
  }
  console.log('\n--- Todos os Empréstimos ---');
  emprestimos.forEach((emp) => {
    const devolucao = emp.data_devolucao ? emp.data_devolucao : 'ainda não devolvido';
    console.log(
      `ID: ${emp.id} | Livro: ${emp.livro} | Cliente: ${emp.cliente} | Emprestado em: ${emp.data_emprestimo} | Devolvido em: ${devolucao}`
    );
  });
}

async function listarEmprestimosAtivos(): Promise<void> {
  const emprestimos = await emprestimoService.listarAtivos();
  if (emprestimos.length === 0) {
    console.log('Nenhum empréstimo ativo no momento.');
    return;
  }
  console.log('\n--- Empréstimos Ativos ---');
  emprestimos.forEach((emp) => {
    console.log(
      `ID: ${emp.id} | Livro: ${emp.livro} | Cliente: ${emp.cliente} | Emprestado em: ${emp.data_emprestimo}`
    );
  });
}