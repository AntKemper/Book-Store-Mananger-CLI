	CREATE TABLE autores (
		id SERIAL PRIMARY KEY,
			nome VARCHAR(100) NOT NULL
			
	);


	CREATE TABLE livros (
		id SERIAL PRIMARY KEY,
			titulo VARCHAR(150) NOT NULL,
			autor_id INTEGER NOT NULL REFERENCES autores(id),
			quantidade_total INTEGER NOT NULL,
			quantidade_disponivel INTEGER NOT NULL
	);


	CREATE TABLE clientes (
		id SERIAL PRIMARY KEY,
			nome VARCHAR(100) NOT NULL
			
	);


	CREATE TABLE emprestimos (
		id SERIAL PRIMARY KEY,
			livro_id INTEGER NOT NULL REFERENCES livros(id),
			cliente_id INTEGER NOT NULL REFERENCES clientes(id),
			data_emprestimo DATE NOT NULL DEFAULT CURRENT_DATE,
			data_devolucao DATE
			
	);


	--Dados par popular o banco de dados:
	--Rodar com os Drop TABLE para limpar o banco de dados antes de popular, 
	--assim os ids sempre são renovados.

	
DROP TABLE IF EXISTS emprestimos;
DROP TABLE IF EXISTS livros;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS autores;

CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor_id INTEGER NOT NULL REFERENCES autores(id),
    quantidade_total INTEGER NOT NULL,
    quantidade_disponivel INTEGER NOT NULL
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE emprestimos (
    id SERIAL PRIMARY KEY,
    livro_id INTEGER NOT NULL REFERENCES livros(id),
    cliente_id INTEGER NOT NULL REFERENCES clientes(id),
    data_emprestimo DATE NOT NULL DEFAULT CURRENT_DATE,
    data_devolucao DATE
);

INSERT INTO autores (nome) VALUES
('Fiódor Dostoiévski');

INSERT INTO livros (titulo, autor_id, quantidade_total, quantidade_disponivel) VALUES
('Crime e Castigo', 1, 3, 3),
('Os Irmãos Karamázov', 1, 3, 3),
('O Idiota', 1, 2, 2),
('Os Demônios', 1, 2, 2),
('Memórias do Subsolo', 1, 4, 4),
('O Jogador', 1, 3, 3),
('Recordações da Casa dos Mortos', 1, 2, 2),
('Noites Brancas', 1, 3, 3);


INSERT INTO clientes (nome) VALUES
('Antonio Kemper'),
('Prof. Davi'),
('SC Tec'),
('Vanderlei Monitor');
