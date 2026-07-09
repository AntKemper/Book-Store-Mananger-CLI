import { pool } from '../database/connection';
import { Livro } from '../models/Livro';

export class LivroRepository {

  async criar(livro: Livro): Promise<Livro> {
    try {
      const query = `
        INSERT INTO livros (titulo, autor_id, quantidade_total, quantidade_disponivel)
        VALUES ($1, $2, $3, $3)
        RETURNING *
      `;
      const valores = [livro.titulo, livro.autor_id, livro.quantidade_total];
      const resultado = await pool.query(query, valores);
      return resultado.rows[0];
    } catch (error) {
      console.error('Erro ao criar livro:', error);
      throw error;
    }
  }

  async listarTodos(): Promise<Livro[]> {
    try {
      const query = 'SELECT * FROM livros ORDER BY titulo';
      const resultado = await pool.query(query);
      return resultado.rows;
    } catch (error) {
      console.error('Erro ao listar livros:', error);
      throw error;
    }
  }

  async buscarPorId(id: number): Promise<Livro | null> {
    try {
      const query = 'SELECT * FROM livros WHERE id = $1';
      const resultado = await pool.query(query, [id]);
      return resultado.rows[0] || null;
    } catch (error) {
      console.error('Erro ao buscar livro:', error);
      throw error;
    }
  }

  async atualizar(id: number, livro: Livro): Promise<Livro | null> {
    try {
      const query = `
        UPDATE livros
        SET titulo = $1, autor_id = $2, quantidade_total = $3
        WHERE id = $4
        RETURNING *
      `;
      const valores = [livro.titulo, livro.autor_id, livro.quantidade_total, id];
      const resultado = await pool.query(query, valores);
      return resultado.rows[0] || null;
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
      throw error;
    }
  }

  async remover(id: number): Promise<boolean> {
    try {
      const query = 'DELETE FROM livros WHERE id = $1';
      const resultado = await pool.query(query, [id]);
      return (resultado.rowCount ?? 0) > 0;
    } catch (error) {
      console.error('Erro ao remover livro:', error);
      throw error;
    }
  }

  // Métodos especiais para controle de empréstimo/devolução
  async decrementarDisponivel(id: number): Promise<void> {
    try {
      const query = `
        UPDATE livros
        SET quantidade_disponivel = quantidade_disponivel - 1
        WHERE id = $1
      `;
      await pool.query(query, [id]);
    } catch (error) {
      console.error('Erro ao decrementar disponibilidade:', error);
      throw error;
    }
  }

  async incrementarDisponivel(id: number): Promise<void> {
    try {
      const query = `
        UPDATE livros
        SET quantidade_disponivel = quantidade_disponivel + 1
        WHERE id = $1
      `;
      await pool.query(query, [id]);
    } catch (error) {
      console.error('Erro ao incrementar disponibilidade:', error);
      throw error;
    }
  }
}