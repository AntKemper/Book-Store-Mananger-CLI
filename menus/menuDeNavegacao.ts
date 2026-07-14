import { perguntar, fecharLeitura } from '../utils/Funcoes_auxiliares';
import { exibirMenuAutores } from '../controllers/autorController';
import { exibirMenuLivros } from '../controllers/livroController';
import { exibirMenuClientes } from '../controllers/clienteController';
import { exibirMenuEmprestimos } from '../controllers/emprestimoController';
import { exibirMenuRelatorios } from '../controllers/relatorioController';

export async function exibirMenuPrincipal(): Promise<void> {
  let continuar = true;

  while (continuar) {
    console.log('\nBOOK STORE MANAGER');
    console.log('1. Autores');
    console.log('2. Livros');
    console.log('3. Clientes');
    console.log('4. Empréstimos');
    console.log('5. Relatórios');
    console.log('0. Encerrar aplicação');

    const opcao = await perguntar('Escolha uma opção: ');

    switch (opcao) {
      case '1':
        await exibirMenuAutores();
        break;
      case '2':
        await exibirMenuLivros();
        break;
      case '3':
        await exibirMenuClientes();
        break;
      case '4':
        await exibirMenuEmprestimos();
        break;
      case '5':
        await exibirMenuRelatorios();
        break;
      case '0':
        console.log('Encerrando...');
        continuar = false;
        break;
      default:
        console.log('Opção inválida. Tente novamente.');
    }
  }

  fecharLeitura();
}