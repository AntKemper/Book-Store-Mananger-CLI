import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});


export async function testConnection(): Promise<void> {
  try {
    const client = await pool.connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    client.release();
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    throw error;
  }
}