import { pool } from '../database/connection';
import { Emprestimo } from '../models/Emprestimo';

export class EmprestimoRepository {

  async criar(emprestimo: Emprestimo): Promise<Emprestimo> {
    try {
      const query = `
        INSERT INTO emprestimos (livro_id, cliente_id)
        VALUES ($1, $2)
        RETURNING *
      `;
      const valores = [emprestimo.livro_id, emprestimo.cliente_id];
      const resultado = await pool.query(query, valores);
      return resultado.rows[0];
    } catch (error) {
      console.error('Erro ao criar empréstimo:', error);
      throw error;
    }
  }

  async listarTodos(): Promise<any[]> {
    try {
      const query = `
        SELECT
          emprestimos.id,
          livros.titulo AS livro,
          clientes.nome AS cliente,
          emprestimos.data_emprestimo,
          emprestimos.data_devolucao
        FROM emprestimos
        INNER JOIN livros ON emprestimos.livro_id = livros.id
        INNER JOIN clientes ON emprestimos.cliente_id = clientes.id
        ORDER BY emprestimos.data_emprestimo DESC
      `;
      const resultado = await pool.query(query);
      return resultado.rows;
    } catch (error) {
      console.error('Erro ao listar empréstimos:', error);
      throw error;
    }
  }

  async buscarPorId(id: number): Promise<Emprestimo | null> {
    try {
      const query = 'SELECT * FROM emprestimos WHERE id = $1';
      const resultado = await pool.query(query, [id]);
      return resultado.rows[0] || null;
    } catch (error) {
      console.error('Erro ao buscar empréstimo:', error);
      throw error;
    }
  }

  async registrarDevolucao(id: number): Promise<Emprestimo | null> {
    try {
      const query = `
        UPDATE emprestimos
        SET data_devolucao = CURRENT_DATE
        WHERE id = $1
        RETURNING *
      `;
      const resultado = await pool.query(query, [id]);
      return resultado.rows[0] || null;
    } catch (error) {
      console.error('Erro ao registrar devolução:', error);
      throw error;
    }
  }

  async listarAtivos(): Promise<any[]> {
    try {
      const query = `
        SELECT
          emprestimos.id,
          livros.titulo AS livro,
          clientes.nome AS cliente,
          emprestimos.data_emprestimo
        FROM emprestimos
        INNER JOIN livros ON emprestimos.livro_id = livros.id
        INNER JOIN clientes ON emprestimos.cliente_id = clientes.id
        WHERE emprestimos.data_devolucao IS NULL
        ORDER BY emprestimos.data_emprestimo
      `;
      const resultado = await pool.query(query);
      return resultado.rows;
    } catch (error) {
      console.error('Erro ao listar empréstimos ativos:', error);
      throw error;
    }
  }
}