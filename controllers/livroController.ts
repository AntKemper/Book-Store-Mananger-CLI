import { LivroService } from '../services/livroService';
import { perguntar } from '../utils/Funcoes_auxiliares';

const livroService = new LivroService();

export async function exibirMenuLivros(): Promise<void> {
  let voltar = false;

  while (!voltar) {
    console.log('\n--- MENU LIVROS ---');
    console.log('1. Cadastrar livro');
    console.log('2. Listar livros');
    console.log('3. Consultar livro por id');
    console.log('4. Atualizar livro');
    console.log('5. Remover livro');
    console.log('0. Voltar ao menu principal');

    const opcao = await perguntar('Escolha uma opção: ');

    try {
      switch (opcao) {
        case '1':
          await cadastrarLivro();
          break;
        case '2':
          await listarLivros();
          break;
        case '3':
          await consultarLivro();
          break;
        case '4':
          await atualizarLivro();
          break;
        case '5':
          await removerLivro();
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

async function cadastrarLivro(): Promise<void> {
  const titulo = await perguntar('Título do livro: ');
  const autor_id = Number(await perguntar('ID do autor: '));
  const quantidade_total = Number(await perguntar('Quantidade de exemplares: '));
  const livro = await livroService.cadastrar(titulo, autor_id, quantidade_total);
  console.log(`Livro cadastrado com sucesso! ID: ${livro.id}`);
}

async function listarLivros(): Promise<void> {
  const livros = await livroService.listar();
  if (livros.length === 0) {
    console.log('Nenhum livro cadastrado.');
    return;
  }
  console.log('\n--- Lista de Livros ---');
  livros.forEach((livro) => {
    console.log(
      `ID: ${livro.id} | Título: ${livro.titulo} | Autor ID: ${livro.autor_id} | Disponíveis: ${livro.quantidade_disponivel}/${livro.quantidade_total}`
    );
  });
}

async function consultarLivro(): Promise<void> {
  const id = Number(await perguntar('Digite o id do livro: '));
  const livro = await livroService.buscarPorId(id);
  console.log(
    `ID: ${livro.id} | Título: ${livro.titulo} | Autor ID: ${livro.autor_id} | Disponíveis: ${livro.quantidade_disponivel}/${livro.quantidade_total}`
  );
}

async function atualizarLivro(): Promise<void> {
  const id = Number(await perguntar('Digite o id do livro a atualizar: '));
  const titulo = await perguntar('Novo título: ');
  const autor_id = Number(await perguntar('Novo ID do autor: '));
  const quantidade_total = Number(await perguntar('Nova quantidade total: '));
  const livro = await livroService.atualizar(id, titulo, autor_id, quantidade_total);
  console.log(`Livro atualizado com sucesso! ID: ${livro.id}`);
}

async function removerLivro(): Promise<void> {
  const id = Number(await perguntar('Digite o id do livro a remover: '));
  await livroService.remover(id);
  console.log('Livro removido com sucesso!');
}