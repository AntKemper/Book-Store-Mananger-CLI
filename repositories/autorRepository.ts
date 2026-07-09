import { pool } from '../database/connection';
import { Autor } from '../models/Autor';

export class AutorRepository {

  async criar(autor: Autor): Promise<Autor> {
    try {
      const query = 'INSERT INTO autores (nome) VALUES ($1) RETURNING *';
      const valores = [autor.nome];
      const resultado = await pool.query(query, valores);
      return resultado.rows[0];
    } catch (error) {
      console.error('Erro ao criar autor:', error);
      throw error;
    }
  }

  async listarTodos(): Promise<Autor[]> {
    try {
      const query = 'SELECT * FROM autores ORDER BY nome';
      const resultado = await pool.query(query);
      return resultado.rows;
    } catch (error) {
      console.error('Erro ao listar autores:', error);
      throw error;
    }
  }

  async buscarPorId(id: number): Promise<Autor | null> {
    try {
      const query = 'SELECT * FROM autores WHERE id = $1';
      const resultado = await pool.query(query, [id]);
      return resultado.rows[0] || null;
    } catch (error) {
      console.error('Erro ao buscar autor:', error);
      throw error;
    }
  }

  async atualizar(id: number, autor: Autor): Promise<Autor | null> {
    try {
      const query = 'UPDATE autores SET nome = $1 WHERE id = $2 RETURNING *';
      const valores = [autor.nome, id];
      const resultado = await pool.query(query, valores);
      return resultado.rows[0] || null;
    } catch (error) {
      console.error('Erro ao atualizar autor:', error);
      throw error;
    }
  }

  async remover(id: number): Promise<boolean> {
    try {
      const query = 'DELETE FROM autores WHERE id = $1';
      const resultado = await pool.query(query, [id]);
      return (resultado.rowCount ?? 0) > 0;
    } catch (error) {
      console.error('Erro ao remover autor:', error);
      throw error;
    }
  }
}