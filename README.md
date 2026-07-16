# Book Store Manager CLI 

 O Book Store Manager é um Sistema de gerenciamento de Bibliotecas, desenvolvido com tecnologias apresentadas em sala de aula, como o TypeScript, juntamente com o gerenciador de banco de dados PostGreSQL. 

 ## Objetivo: 

Tem a finalidade de implementar os conhecimentos adquiridos durante a primeira etapa do curso de criando um gerenciador de bibliotecas. 

## Tecnologias utilizadas; 

 - Node.js;  

- TypeScript; 

- PostgreSQL;  

- Biblioteca pg (driver de conexão com PostgreSQL);  

- dotenv (Utilizado para carregar variaveis, evitando vazamentos para o GitHub). 

 
## Requisitos Para Execução; 

 Antes de começar, você precisa: 

1. Utilize um editor de codigo recomendo o VSCode encontrado em: https://code.visualstudio.com/download?_exp_download=fb315fc982 

2. Node Js encontrado em:https://nodejs.org/   

3. PostgreSql encontrado em: https://www.postgresql.org/download/

4. No Terminal de comando no seu editor de codigo instale o dotenv, digitando:
 ```
    npm install dotenv
 ```
## Configuração do Bancode Dados;  

Com o PostGreSql instalado, encontre o aplicativo PgAdmin, nele você vai precisar da senha criada na isntalacção do PostGreSql, em seguida no campo esquerdo clique com o botão direito do mouse em PostGreSql “versão” (ex: PostGreSql 18), em Create>Database, nomeie com book_store_manager. 

## Instalação;  

1. Clone o projeto do GitHub, digitando no terminal de comando do VSCode “Git clone https://github.com/AntKemper/Book-Store-Mananger-CLI.git “ 

2. Digite no terminal do VSCode.

    ```

    npm install

em seguida 

  ```
     code .
 ```

 
Pronto irá abrir os arquivos no VSCode. 

## Execução: 

1. Vá na raiz do arquivo “BOOK-STORE-MANAGER-CLI, crie um arquivo chamado  .env, dentro dele cole o script abaixo e configure:
```
PGHOST=localhost 
PGPORT=5432 (porta deve ser a mesma do pgadmin )
PGUSER=postgres (Esse é o padrão se você mudou use ele.)
PGPASSWORD=XXX  (aqui digite a senha do PostgreSql )
PGDATABASE=book_store_manager 
```
Deve ficar neste formato:
```
PGHOST=localhost 
PGPORT=5432 
PGUSER=postgres 
PGPASSWORD=senhapostgresql  
PGDATABASE=book_store_manager 
```
2. Agora no projeto vá na pasta database>schema.sql e copie o codigo.  

3. Vá no Pgadmin e clique com o botão direito em book_store-manager, vá em Query tool e cole o arquivo e execute o script, isso vai criar as tabelas e popular o projeto, com alguns livros. 

4. Vá ao terminal e digite: 

```
npm run dev
```

Isso vai iniciar a aplicação.

 
## Arquitetura do projeto: 

Separa as responsabilidades e facilita a manutenção
```
Book_Store_Manager_CLI/
├── controllers/     # Interação com o usuário 
├── database/        # Conexão com o banco e script SQL
├── menus/           # Menu principal
├── models/          # Interfaces das entidades
├── repositories/    # Consultas SQL (INSERT, SELECT, UPDATE, DELETE)
├── services/        # Regras de negócio e validações
├── src/
│   └── main.ts      # Ponto de entrada da aplicação
├── utils/           # Funções auxiliares (leitura do terminal)
└── .env             
```
## Funcionalidades implementadas:

### 1. Gerenciamento de Autores;

Cadastrar autor
Listar todos os autores
Consultar autor por ID
Atualizar autor
Remover autor

### 2. Gerenciamento de Livros;

Cadastrar livro (título, autor, quantidade)
Listar todos os livros (mostrando disponibilidade)
Consultar livro por ID
Atualizar livro
Remover livro
Validação: não permite cadastrar/atualizar livro com autor inexistente

### 3. Gerenciamento de Clientes;

Cadastrar cliente
Listar todos os clientes
Consultar cliente por ID
Atualizar cliente
Remover cliente

### 4. Empréstimos

Registrar empréstimo 
Registrar devolução 
Listar todos os empréstimos 
Listar apenas empréstimos ativos 
Controle automático de disponibilidade 

 ### 5. Relatórios Gerenciais

Livros disponíveis
Livros emprestados 
Livros cadastrados por autor 
Quantidade de empréstimos por livro 
Clientes com empréstimos ativos

## Exemplos de utilização: 

### Tela principal:

## BOOK STORE MANAGER
1. Autores
2. Livros
3. Clientes
4. Empréstimos
5. Relatórios
0. Encerrar aplicação

Digite o numero desejado, o sistema é intuitivo e direcionado pelos numeros pretendidos.

Exemplo: 

# 1. Em autores (1):

### ---MENU AUTORES ---
1. Cadastrar autor
2. Listar autores
3. Consultar autor por id
4. Atualizar autor
5. Remover autor
0. Voltar ao menu principal

# 2. Em livros (2): 

### --- MENU LIVROS ---
1. Cadastrar livro
2. Listar livros
3. Consultar livro por id
4. Atualizar livro
5. Remover livro
0. Voltar ao menu principal

# 3. Em Clietes (3):

### --- MENU CLIENTES ---
1. Cadastrar cliente
2. Listar clientes
3. Consultar cliente por id
4. Atualizar cliente
5. Remover cliente
0. Voltar ao menu principal

# 4. Em emprestimos (4):

### --- MENU EMPRÉSTIMOS ---
1. Registrar empréstimo
2. Registrar devolução
3. Listar todos os empréstimos
4. Listar empréstimos ativos
0. Voltar ao menu principal

# 5. Em relatórios(5): 

### --- MENU RELATÓRIOS ---
1. Livros disponíveis
2. Livros emprestados
3. Livros cadastrados por autor
4. Quantidade de empréstimos por livro
5. Clientes com empréstimos ativos
0. Voltar ao menu principal


### Link do Kanban: https://trello.com/invite/b/6a4e7fd582987be499c0911b/ATTIbe7ab90dba2ad89cf6839728aa05f24dF08AC54C/book-store-manage

 
