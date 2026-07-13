import { ClienteService } from '../services/clienteService';
import { perguntar } from '../utils/Funcoes_auxiliares';

const clienteService = new ClienteService();

export async function exibirMenuClientes(): Promise<void> {
  let voltar = false;

  while (!voltar) {
    console.log('\n--- MENU CLIENTES ---');
    console.log('1. Cadastrar cliente');
    console.log('2. Listar clientes');
    console.log('3. Consultar cliente por id');
    console.log('4. Atualizar cliente');
    console.log('5. Remover cliente');
    console.log('0. Voltar ao menu principal');

    const opcao = await perguntar('Escolha uma opção: ');

    try {
      switch (opcao) {
        case '1':
          await cadastrarCliente();
          break;
        case '2':
          await listarClientes();
          break;
        case '3':
          await consultarCliente();
          break;
        case '4':
          await atualizarCliente();
          break;
        case '5':
          await removerCliente();
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

async function cadastrarCliente(): Promise<void> {
  const nome = await perguntar('Nome do cliente: ');
  const cliente = await clienteService.cadastrar(nome);
  console.log(`Cliente cadastrado com sucesso! ID: ${cliente.id}`);
}

async function listarClientes(): Promise<void> {
  const clientes = await clienteService.listar();
  if (clientes.length === 0) {
    console.log('Nenhum cliente cadastrado.');
    return;
  }
  console.log('\n--- Lista de Clientes ---');
  clientes.forEach((cliente) => {
    console.log(`ID: ${cliente.id} | Nome: ${cliente.nome}`);
  });
}

async function consultarCliente(): Promise<void> {
  const id = Number(await perguntar('Digite o id do cliente: '));
  const cliente = await clienteService.buscarPorId(id);
  console.log(`ID: ${cliente.id} | Nome: ${cliente.nome}`);
}

async function atualizarCliente(): Promise<void> {
  const id = Number(await perguntar('Digite o id do cliente a atualizar: '));
  const nome = await perguntar('Novo nome do cliente: ');
  const cliente = await clienteService.atualizar(id, nome);
  console.log(`Cliente atualizado com sucesso! ID: ${cliente.id} | Nome: ${cliente.nome}`);
}

async function removerCliente(): Promise<void> {
  const id = Number(await perguntar('Digite o id do cliente a remover: '));
  await clienteService.remover(id);
  console.log('Cliente removido com sucesso!');
}