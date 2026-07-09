CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor_id INTEGER NOT NULL REFERENCES autores(id),
    quantidade_total INTEGER NOT NULL DEFAULT 1,
    quantidade_disponivel INTEGER NOT NULL DEFAULT 1
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