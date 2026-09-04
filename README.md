# Projeto Full Stack

Aplicação full stack para gerenciamento de **clientes, produtos, tarefas e pedidos**, desenvolvida com Angular no frontend, NestJS no backend, MySQL como banco de dados e Nginx como ponto único de entrada da aplicação.

O sistema possui operações de cadastro, consulta, edição e exclusão de registros, filtros, relacionamentos entre entidades, autenticação com JWT, controle de acesso por perfil e um dashboard com informações gerais da aplicação.

---

# Como o sistema funciona

A aplicação está organizada em quatro partes principais:

```text
Browser
   ↓
Nginx :8080
   ├── /      → arquivos estáticos do Angular
   └── /api   → API NestJS
                    ↓
                  TypeORM
                    ↓
                  MySQL
```

- **Frontend:** interface Angular utilizada pelo usuário.
- **Nginx:** ponto único de entrada da aplicação. Serve os arquivos estáticos do Angular e encaminha as requisições `/api` para o backend.
- **Backend:** API NestJS responsável pelas regras de negócio, autenticação, autorização e acesso aos dados.
- **Banco de dados:** MySQL responsável pela persistência das informações.

---

# Arquitetura Docker

O projeto utiliza Docker Compose dividido por responsabilidade:

```text
Projeto
│
├── frontend/
│   ├── Dockerfile
│   └── docker-compose.yml
│       └── frontend-build
│
├── backend/
│   ├── Dockerfile
│   └── docker-compose.yml
│       └── nest-backend
│
├── database/
│   └── docker-compose.yml
│       └── mysql-db
│
├── nginx/
│   ├── nginx.conf
│   └── docker-compose.yml
│       └── nginx
│
└── docker-compose.yml
    └── inclui os serviços da aplicação
```

Os containers permanentes são:

```text
nginx
nest-backend
mysql-db
```

O serviço:

```text
frontend-build
```

é um **job temporário**. Ele executa `npm run build`, gera o `dist/` do Angular e termina com `Exited (0)` quando o processo é concluído corretamente.

O Nginx depende desse job:

```text
frontend-build
      ↓
 npm run build
      ↓
    dist/
      ↓
 Exited (0)
      ↓
    Nginx
```

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
git clone https://github.com/GabrielBza/Projeto-Aprendizado-Nest.git
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

JWT_SECRET=uma_chave_secreta
```

Descrição:

- `PORT`: porta interna utilizada pela API NestJS.
- `DB_HOST`: nome do serviço/container MySQL acessível pela Docker Network.
- `DB_PORT`: porta interna do MySQL.
- `DB_USER`: usuário utilizado pelo backend para acessar o banco.
- `DB_PASSWORD`: senha do usuário do banco.
- `DB_NAME`: nome do banco utilizado pela aplicação.
- `JWT_SECRET`: chave utilizada para assinar e validar os tokens JWT.

> Dentro da rede Docker, o backend acessa o MySQL pelo nome do serviço, e não por `localhost`.

## 3. Criar a Docker Network compartilhada

Os serviços utilizam uma Docker Network externa compartilhada.

Crie a network uma única vez:

```bash
docker network create projeto-aprendizado-network
```

Caso ela já exista, não é necessário executar o comando novamente.

## 4. Subir a aplicação

Na raiz do projeto:

```bash
docker compose up -d --build
```

Durante a inicialização:

```text
1. MySQL é iniciado
2. Backend NestJS é iniciado
3. frontend-build executa npm run build
4. frontend-build termina com sucesso
5. Nginx inicia e passa a servir a aplicação
```

## 5. Acessar a aplicação

Com os containers em execução:

```text
Aplicação:
http://localhost:8080

Swagger via Nginx:
http://localhost:8080/api/docs
```

O navegador utiliza apenas o Nginx como ponto de entrada. As chamadas do frontend para o backend são feitas através de caminhos relativos iniciados por `/api`.

Exemplo:

```http
GET /api/clientes
```

O Nginx recebe a requisição e a encaminha internamente para o NestJS.

---

# Build do frontend durante o desenvolvimento

Como o Angular é servido pelo Nginx como arquivos estáticos, alterações feitas no frontend precisam gerar um novo build.

Na raiz do projeto:

```bash
docker compose run --rm frontend-build
```

Esse comando:

```text
código Angular alterado
        ↓
frontend-build
        ↓
npm run build
        ↓
frontend/dist/frontend/browser
        ↓
Nginx passa a servir os novos arquivos
```

Depois do build, atualize o navegador. Em caso de cache, utilize um hard refresh.

---

# Verificar os containers

Para visualizar apenas os containers em execução:

```bash
docker ps
```

O esperado é encontrar os serviços permanentes:

```text
nginx
nest-backend
mysql-db
```

Para visualizar também containers finalizados:

```bash
docker ps -a
```

Nesse caso, o job do frontend pode aparecer como:

```text
frontend-build    Exited (0)
```

`Exited (0)` indica que o build terminou corretamente.

---

# Parar os serviços

Na raiz do projeto:

```bash
docker compose down
```

Os dados do MySQL permanecem armazenados no volume Docker mesmo após a remoção do container.

---

# Autenticação e autorização

A aplicação utiliza autenticação baseada em **JWT (JSON Web Token)**.

O fluxo de autenticação funciona assim:

```text
Usuário envia email e senha
        ↓
NestJS valida as credenciais
        ↓
Backend gera um JWT
        ↓
Frontend salva o token no localStorage
        ↓
Interceptor adiciona o token às requisições
        ↓
Authorization: Bearer <token>
```

O backend valida o token antes de liberar o acesso às rotas protegidas.

O payload do JWT contém informações como:

```text
sub
email
role
iat
exp
```

A aplicação possui dois perfis de usuário:

```text
USER
ADMIN
```

### USER

Possui acesso de leitura às informações permitidas pelo sistema.

### ADMIN

Possui acesso às operações de criação, edição e exclusão.

O frontend utiliza a role do JWT apenas para controlar a exibição de elementos da interface. A validação real de autorização é realizada pelo backend através de Guards.

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
- Visualizar detalhes do pedido
- Relacionar pedidos a clientes
- Relacionar pedidos a produtos
- Controlar o status dos pedidos

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
GET /api/clientes?nome=Gabriel
```

Sem filtro:

```http
GET /api/clientes
```

retorna todos os registros disponíveis.

## Swagger

A documentação da API pode ser acessada através do Nginx:

```text
http://localhost:8080/api/docs
```

Pelo Swagger é possível visualizar e testar os endpoints disponíveis.

---

# Nginx

O Nginx funciona como o único ponto de entrada da aplicação.

Sua responsabilidade é separar as requisições pelo caminho recebido:

```text
/       → Angular
/api/   → NestJS
```

Para o frontend, o Nginx serve diretamente os arquivos gerados pelo build do Angular.

Para a API, ele atua como reverse proxy:

```text
Browser
   ↓
/api/clientes
   ↓
Nginx
   ↓
nest-backend:3000/clientes
```

O uso de `try_files` permite que rotas do Angular, como `/clientes` ou `/produtos`, funcionem corretamente mesmo quando acessadas diretamente pelo navegador.

---

# Docker e persistência

Os serviços se comunicam através da Docker Network compartilhada:

```text
                  projeto-aprendizado-network

Nginx ────────────────────── NestJS ────────────────────── MySQL
```

O backend e o banco não precisam ser acessados diretamente pelo navegador. O Nginx centraliza a entrada HTTP da aplicação.

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

Os arquivos `.env` contêm configurações específicas do ambiente e não devem ter seus valores reais versionados no repositório.

O projeto deve manter arquivos `.env.example` contendo apenas os nomes das variáveis e valores de exemplo:

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
JWT_SECRET=chave_secreta_de_exemplo
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
- JWT
- bcrypt

### Banco de dados

- MySQL

### Infraestrutura

- Docker
- Docker Compose
- Docker Networks
- Docker Volumes
- Nginx

---

# Resumo da arquitetura

```text
Browser
   ↓
localhost:8080
   ↓
Nginx
   ├── / → Angular estático
   └── /api → NestJS
                  ↓
                MySQL
```

O projeto foi estruturado para separar claramente as responsabilidades entre interface, API, persistência e infraestrutura, mantendo cada parte isolada e comunicando-se através da rede Docker.
