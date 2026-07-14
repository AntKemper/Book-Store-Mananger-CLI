import { pool } from '../database/connection';

export class RelatorioRepository {

  async livrosDisponiveis(): Promise<any[]> {
    const query = `
      SELECT titulo, quantidade_disponivel
      FROM livros
      WHERE quantidade_disponivel > 0
      ORDER BY titulo
    `;
    const resultado = await pool.query(query);
    return resultado.rows;
  }

  async livrosEmprestados(): Promise<any[]> {
    const query = `
      SELECT DISTINCT livros.titulo, clientes.nome AS cliente, emprestimos.data_emprestimo
      FROM emprestimos
      INNER JOIN livros ON emprestimos.livro_id = livros.id
      INNER JOIN clientes ON emprestimos.cliente_id = clientes.id
      WHERE emprestimos.data_devolucao IS NULL
      ORDER BY emprestimos.data_emprestimo
    `;
    const resultado = await pool.query(query);
    return resultado.rows;
  }

  async livrosCadastradosPorAutor(): Promise<any[]> {
    const query = `
      SELECT autores.nome AS autor, COUNT(livros.id) AS quantidade_livros
      FROM autores
      LEFT JOIN livros ON livros.autor_id = autores.id
      GROUP BY autores.id, autores.nome
      ORDER BY quantidade_livros DESC
    `;
    const resultado = await pool.query(query);
    return resultado.rows;
  }

  async quantidadeEmprestimosPorLivro(): Promise<any[]> {
    const query = `
      SELECT livros.titulo, COUNT(emprestimos.id) AS total_emprestimos
      FROM livros
      LEFT JOIN emprestimos ON emprestimos.livro_id = livros.id
      GROUP BY livros.id, livros.titulo
      ORDER BY total_emprestimos DESC
      LIMIT 10
    `;
    const resultado = await pool.query(query);
    return resultado.rows;
  }

  async clientesComEmprestimosAtivos(): Promise<any[]> {
    const query = `
      SELECT clientes.nome, COUNT(emprestimos.id) AS emprestimos_ativos
      FROM clientes
      INNER JOIN emprestimos ON emprestimos.cliente_id = clientes.id
      WHERE emprestimos.data_devolucao IS NULL
      GROUP BY clientes.id, clientes.nome
      ORDER BY emprestimos_ativos DESC
    `;
    const resultado = await pool.query(query);
    return resultado.rows;
  }
}