# Projeto Full Stack

Aplicação full stack para gerenciamento de **clientes, produtos, tarefas e pedidos**, com frontend em Angular, backend em NestJS e banco de dados MySQL.

O sistema possui operações de cadastro, consulta, edição e exclusão dos registros, além de buscas, relacionamentos entre entidades e um dashboard com informações gerais da aplicação.

## Como o sistema funciona

A aplicação é dividida em três partes:

```text
Frontend Angular
      ↓
API NestJS
      ↓
TypeORM
      ↓
MySQL
```

- **Frontend:** interface utilizada pelo usuário.
- **Backend:** API responsável pelas regras de negócio e acesso aos dados.
- **Banco de dados:** armazena os registros da aplicação.

O frontend e o backend são executados em containers Docker através de um Docker Compose.

O MySQL é executado separadamente, em outro Docker Compose, funcionando como um serviço independente. A comunicação entre o backend e o banco acontece através de uma Docker Network compartilhada.

---

# Como executar o projeto

## Pré-requisitos

Para executar o sistema é necessário ter instalado:

- Git
- Docker
- Docker Compose

Não é necessário instalar Node.js, Angular, NestJS ou MySQL diretamente na máquina para executar a aplicação através dos containers.

## 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd Projeto-Aprendizado-Nest
```

## 2. Configurar as variáveis de ambiente

Antes de iniciar os containers, crie os arquivos `.env` a partir dos arquivos `.env.example` disponíveis no projeto.

### Backend

No diretório `backend/`, crie:

```text
backend/.env
```

Exemplo:

```env
PORT=3000

DB_HOST=mysql-db
DB_PORT=3306
DB_USER=nest
DB_PASSWORD=nest123
DB_NAME=projeto_nest
```

Descrição:

- `PORT`: porta utilizada pela API NestJS.
- `DB_HOST`: nome do serviço/container MySQL acessível pela Docker Network.
- `DB_PORT`: porta interna do MySQL.
- `DB_USER`: usuário utilizado pelo backend para acessar o banco.
- `DB_PASSWORD`: senha do usuário do banco.
- `DB_NAME`: nome do banco utilizado pela aplicação.

> Dentro da rede Docker, o backend deve acessar o MySQL pelo nome do serviço, e não por `localhost`.

### Banco de dados

No diretório responsável pelo MySQL, crie:

```text
database/.env
```

Exemplo:

```env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=projeto_nest
MYSQL_USER=nest
MYSQL_PASSWORD=nest123
```

Os valores de:

```text
MYSQL_DATABASE
MYSQL_USER
MYSQL_PASSWORD
```

devem corresponder respectivamente a:

```text
DB_NAME
DB_USER
DB_PASSWORD
```

configurados no backend.

### Frontend

O frontend utiliza a URL da API para realizar as requisições HTTP.

A configuração deve apontar para:

```text
http://localhost:3000
```

quando o sistema estiver sendo acessado localmente pelo navegador.

Caso o projeto utilize uma variável de ambiente para essa configuração, utilize:

```env
API_URL=http://localhost:3000
```

## 3. Criar a Docker Network compartilhada

Como o banco e a aplicação utilizam Docker Compose separados, ambos precisam estar conectados à mesma network.

Crie a network uma única vez:

```bash
docker network create projeto-network
```

Caso ela já exista, não é necessário executar esse comando novamente.

## 4. Iniciar o banco de dados

Entre no diretório responsável pelo banco:

```bash
cd database
```

Inicie o MySQL:

```bash
docker compose up -d
```

Depois retorne para a raiz do projeto:

```bash
cd ..
```

## 5. Iniciar frontend e backend

Na raiz do projeto:

```bash
docker compose up -d --build
```

Esse comando inicia:

- Frontend Angular
- Backend NestJS

O backend se comunica com o MySQL através da Docker Network compartilhada.

## 6. Acessar a aplicação

Com os containers em execução:

```text
Frontend:
http://localhost:4200

Backend:
http://localhost:3000

Swagger:
http://localhost:3000/docs
```

## Verificar os containers

Para visualizar os containers em execução:

```bash
docker ps
```

## Parar os serviços

Para interromper frontend e backend:

```bash
docker compose down
```

Para interromper o banco:

```bash
cd database
docker compose down
```

Os dados do MySQL permanecem armazenados no volume Docker mesmo após o container ser removido.

---

# Funcionalidades

## Clientes

Permite:

- Listar clientes
- Buscar clientes por nome
- Criar clientes
- Editar clientes
- Excluir clientes
- Visualizar a quantidade de registros

## Produtos

Permite:

- Listar produtos
- Buscar produtos
- Criar produtos
- Editar produtos
- Excluir produtos
- Controlar disponibilidade
- Visualizar a quantidade de registros

## Tarefas

Permite:

- Listar tarefas
- Criar tarefas
- Editar tarefas
- Excluir tarefas
- Controlar o status das tarefas

## Pedidos

Permite:

- Listar pedidos
- Criar pedidos
- Editar pedidos
- Excluir pedidos
- Relacionar pedidos a clientes
- Relacionar pedidos a produtos

Os principais relacionamentos são:

```text
Cliente 1 ─── N Pedidos
Produto 1 ─── N Pedidos
```

## Dashboard

O dashboard apresenta uma visão geral das informações cadastradas no sistema, reunindo indicadores dos diferentes módulos da aplicação.

---

# API

O backend disponibiliza uma API REST através do NestJS.

Os principais métodos utilizados são:

```text
GET     Consulta
POST    Criação
PATCH   Atualização
DELETE  Exclusão
```

As listagens também podem receber filtros através de query parameters.

Exemplo:

```http
GET /clientes?nome=Gabriel
```

Sem filtro:

```http
GET /clientes
```

retorna todos os registros disponíveis.

## Swagger

A documentação da API pode ser acessada em:

```text
http://localhost:3000/docs
```

Pelo Swagger é possível visualizar e testar os endpoints disponíveis.

---

# Estrutura do projeto

```text
Projeto
│
├── frontend/
│   └── Aplicação Angular
│
├── backend/
│   ├── API NestJS
│   └── .env
│
├── database/
│   ├── Docker Compose do MySQL
│   └── .env
│
└── docker-compose.yml
    └── Frontend + Backend
```

---

# Docker e persistência

Frontend, backend e banco de dados são executados em containers separados.

```text
Docker Compose da aplicação
├── Angular
└── NestJS
       │
       │ projeto-network
       ↓
Docker Compose do banco
└── MySQL
```

O MySQL utiliza um Docker Volume para persistir os dados:

```text
MySQL
  ↓
Docker Volume
  ↓
Dados persistidos
```

Dessa forma, reiniciar ou recriar o container do banco não remove automaticamente os dados armazenados.

---

# Variáveis de ambiente

Os arquivos `.env` contêm configurações específicas do ambiente e não devem armazenar valores diretamente no código-fonte.

Os arquivos reais `.env` não devem ser versionados.

O repositório deve manter arquivos `.env.example` contendo apenas os nomes das variáveis e valores de exemplo:

```text
backend/.env.example
database/.env.example
```

Exemplo de `backend/.env.example`:

```env
PORT=3000
DB_HOST=mysql-db
DB_PORT=3306
DB_USER=usuario
DB_PASSWORD=senha
DB_NAME=nome_do_banco
```

Exemplo de `database/.env.example`:

```env
MYSQL_ROOT_PASSWORD=senha_root
MYSQL_DATABASE=nome_do_banco
MYSQL_USER=usuario
MYSQL_PASSWORD=senha
```

---

# Tecnologias

### Frontend

- Angular
- TypeScript
- HTML
- CSS

### Backend

- NestJS
- TypeScript
- TypeORM
- Swagger

### Banco de dados

- MySQL

### Infraestrutura

- Docker
- Docker Compose
- Docker Networks
- Docker Volumes
