import { pool } from '../database/connection';
import { Cliente } from '../models/Cliente';

export class ClienteRepository {

  async criar(cliente: Cliente): Promise<Cliente> {
    try {
      const query = 'INSERT INTO clientes (nome) VALUES ($1) RETURNING *';
      const resultado = await pool.query(query, [cliente.nome]);
      return resultado.rows[0];
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }
  }

  async listarTodos(): Promise<Cliente[]> {
    try {
      const query = 'SELECT * FROM clientes ORDER BY nome';
      const resultado = await pool.query(query);
      return resultado.rows;
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
      throw error;
    }
  }

  async buscarPorId(id: number): Promise<Cliente | null> {
    try {
      const query = 'SELECT * FROM clientes WHERE id = $1';
      const resultado = await pool.query(query, [id]);
      return resultado.rows[0] || null;
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      throw error;
    }
  }

  async atualizar(id: number, cliente: Cliente): Promise<Cliente | null> {
    try {
      const query = 'UPDATE clientes SET nome = $1 WHERE id = $2 RETURNING *';
      const resultado = await pool.query(query, [cliente.nome, id]);
      return resultado.rows[0] || null;
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    }
  }

  async remover(id: number): Promise<boolean> {
    try {
      const query = 'DELETE FROM clientes WHERE id = $1';
      const resultado = await pool.query(query, [id]);
      return (resultado.rowCount ?? 0) > 0;
    } catch (error) {
      console.error('Erro ao remover cliente:', error);
      throw error;
    }
  }
}