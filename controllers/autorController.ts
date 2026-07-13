import { AutorService } from '../services/autorService';
import { perguntar } from '../utils/Funcoes_auxiliares';

const autorService = new AutorService();

export async function exibirMenuAutores(): Promise<void> {
  let voltar = false;

  while (!voltar) {
    console.log('\n--- MENU AUTORES ---');
    console.log('1. Cadastrar autor');
    console.log('2. Listar autores');
    console.log('3. Consultar autor por id');
    console.log('4. Atualizar autor');
    console.log('5. Remover autor');
    console.log('0. Voltar ao menu principal');

    const opcao = await perguntar('Escolha uma opção: ');

    try {
      switch (opcao) {
        case '1':
          await cadastrarAutor();
          break;
        case '2':
          await listarAutores();
          break;
        case '3':
          await consultarAutor();
          break;
        case '4':
          await atualizarAutor();
          break;
        case '5':
          await removerAutor();
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

async function cadastrarAutor(): Promise<void> {
  const nome = await perguntar('Nome do autor: ');
  const autor = await autorService.cadastrar(nome);
  console.log(`Autor cadastrado com sucesso! ID: ${autor.id}`);
}

async function listarAutores(): Promise<void> {
  const autores = await autorService.listar();
  if (autores.length === 0) {
    console.log('Nenhum autor cadastrado.');
    return;
  }
  console.log('\n--- Lista de Autores ---');
  autores.forEach((autor) => {
    console.log(`ID: ${autor.id} | Nome: ${autor.nome}`);
  });
}

async function consultarAutor(): Promise<void> {
  const id = Number(await perguntar('Digite o id do autor: '));
  const autor = await autorService.buscarPorId(id);
  console.log(`ID: ${autor.id} | Nome: ${autor.nome}`);
}

async function atualizarAutor(): Promise<void> {
  const id = Number(await perguntar('Digite o id do autor a atualizar: '));
  const nome = await perguntar('Novo nome do autor: ');
  const autor = await autorService.atualizar(id, nome);
  console.log(`Autor atualizado com sucesso! ID: ${autor.id} | Nome: ${autor.nome}`);
}

async function removerAutor(): Promise<void> {
  const id = Number(await perguntar('Digite o id do autor a remover: '));
  await autorService.remover(id);
  console.log('Autor removido com sucesso!');
}