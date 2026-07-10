import { perguntar, fecharLeitura } from '../utils/Funcoes_auxiliares';

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
        console.log('Autores (ainda vamos implementar)');
        break;
      case '2':
        console.log('Livros (ainda vamos implementar)');
        break;
      case '3':
        console.log('Clientes (ainda vamos implementar)');
        break;
      case '4':
        console.log('Empréstimos (ainda vamos implementar)');
        break;
      case '5':
        console.log('Relatórios (ainda vamos implementar)');
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