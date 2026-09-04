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
   └── /api   → API NestJS compilada
                    ↓
                  TypeORM
                    ↓
                  MySQL
```

- **Frontend:** interface Angular utilizada pelo usuário.
- **Nginx:** ponto único de entrada da aplicação. Serve os arquivos estáticos do Angular e encaminha as requisições `/api` para o backend.
- **Backend:** API NestJS responsável pelas regras de negócio, autenticação, autorização e acesso aos dados.
- **Banco de dados:** MySQL responsável pela persistência das informações.

O Angular não é mantido em execução com `ng serve`. Durante a inicialização, um job Docker executa o build do frontend e gera os arquivos estáticos em `dist/`. Depois que o build termina com sucesso, o Nginx utiliza esses arquivos para servir a aplicação.

O backend também não é executado com `npm run start:dev`. Sua imagem é construída em múltiplos estágios: primeiro o NestJS é compilado com `npm run build`; depois, a imagem final recebe apenas o código compilado e as dependências necessárias para produção, iniciando a API com `npm run start:prod`.

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
│   ├── docker-compose.yml
│   ├── .env
│   └── .env.example
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

O backend, por outro lado, permanece em execução. A diferença é que o container executa o JavaScript já compilado em `dist/`, em vez de utilizar o modo de desenvolvimento com watch.

---

# Build do backend

O Dockerfile do backend utiliza **multi-stage build**.

O primeiro estágio é responsável pela compilação:

```text
Código TypeScript
      ↓
npm ci
      ↓
npm run build
      ↓
    dist/
```

O segundo estágio cria a imagem que realmente será executada:

```text
node:24
   ↓
npm ci --omit=dev
   ↓
copia dist/ do estágio de build
   ↓
npm run start:prod
   ↓
node dist/main
```

Dessa forma, a imagem final não precisa carregar ferramentas utilizadas apenas durante o desenvolvimento, como TypeScript, Nest CLI, Jest e ESLint.

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

## 2. Configurar as variáveis de ambiente do backend

O projeto utiliza um arquivo `.env` no diretório `backend/`.

Crie:

```text
backend/.env
```

utilizando `backend/.env.example` como referência.

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

> Neste projeto, **não existe um arquivo `database/.env`**. A configuração do serviço MySQL fica no Docker Compose da pasta `database/`. Os dados de conexão utilizados pelo backend devem corresponder à configuração do banco.

## 3. Criar a Docker Network compartilhada

Os serviços utilizam uma Docker Network externa compartilhada chamada:

```text
projeto-aprendizado-network
```

Crie a network uma única vez:

```bash
docker network create projeto-aprendizado-network
```

Caso ela já exista, não é necessário executar esse comando novamente.

## 4. Subir a aplicação

Na raiz do projeto:

```bash
docker compose up -d --build
```

Durante o processo:

```text
Docker constrói a imagem do backend
   ↓
NestJS é compilado
   ↓
imagem final do backend é criada

frontend-build executa npm run build
   ↓
gerado dist/ do Angular
   ↓
frontend-build termina com sucesso
   ↓
Nginx inicia
```

Ao final, permanecem em execução:

```text
nginx
nest-backend
mysql-db
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

# Alterações durante o desenvolvimento

## Frontend

Como o Angular é servido pelo Nginx como arquivos estáticos, alterações feitas no frontend precisam gerar um novo build.

Na raiz do projeto:

```bash
docker compose run --rm frontend-build
```

O fluxo é:

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

## Backend

O backend agora executa o código compilado e não utiliza `start:dev` ou watch.

Por isso, após alterar arquivos do backend, é necessário reconstruir sua imagem.

Na raiz do projeto:

```bash
docker compose up -d --build backend
```

O Docker recompila o NestJS durante o build e recria o serviço usando a nova imagem.

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

O frontend também verifica a expiração do token ao acessar rotas protegidas. A validação criptográfica e de segurança do JWT continua sendo responsabilidade do backend.

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

O Nginx funciona como o único ponto de entrada HTTP da aplicação.

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

O backend e o banco não são publicados diretamente para o navegador. O Nginx centraliza a entrada HTTP da aplicação.

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

Neste projeto, o arquivo de variáveis de ambiente utilizado pela aplicação está no backend:

```text
backend/.env
```

O arquivo real `.env` não deve ter seus valores versionados no repositório.

O repositório pode manter:

```text
backend/.env.example
```

com valores de exemplo, por exemplo:

```env
PORT=3000
DB_HOST=mysql-db
DB_PORT=3306
DB_USER=usuario
DB_PASSWORD=senha
DB_NAME=nome_do_banco
JWT_SECRET=chave_secreta_de_exemplo
```

Não existe `database/.env` neste projeto.

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
   ├── / → Angular compilado e servido como arquivos estáticos
   │
   └── /api → NestJS compilado
                  ↓
                MySQL
```

Em tempo de execução:

```text
nginx         → serviço permanente
nest-backend  → serviço permanente, executando npm run start:prod
mysql-db      → serviço permanente

frontend-build → job temporário, executa npm run build e termina
```

O projeto separa as responsabilidades entre interface, API, persistência e infraestrutura, utilizando o Docker para construir e executar cada parte no formato adequado ao seu papel.
