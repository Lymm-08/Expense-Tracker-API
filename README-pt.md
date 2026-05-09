# Expense Tracker API

Uma API backend pronta para produção para rastreamento de despesas, construída com Express, PostgreSQL, Prisma, autenticação JWT e documentação Swagger.

## O que faz

- Cadastra e autentica usuários com hash seguro de senha
- Emite tokens JWT de acesso e refresh com suporte a logout
- Gerencia transações de receita e despesa com filtros e paginação
- Cria e atualiza categorias de usuário com valores padrão criados automaticamente
- Oferece resumo financeiro com saldo, totais, métricas mensais e distribuição de despesas por categoria
- Aplica validação, middleware de segurança, Helmet, CORS e limitação de taxa

## Stack tecnológica

- Node.js, Express
- PostgreSQL, Prisma ORM
- JWT, bcrypt
- Validação Zod
- Documentação Swagger/OpenAPI
- Suporte Docker

## Estrutura

- `src/controllers` - manipuladores de requisição
- `src/services` - lógica de negócio
- `src/repositories` - acesso ao banco com Prisma
- `src/middlewares` - autenticação e tratamento de erros
- `src/routes` - rotas da API
- `src/schemas` - regras de validação
- `src/config` - configuração de ambiente
- `src/prisma` - esquema e scripts de seed
- `src/docs` - definição Swagger

## Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/Lymm-08/Expense-Tracker-API.git
   cd Expense-Tracker-API
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Copie `.env.example` para `.env` e atualize os valores.
4. Gere o cliente Prisma:
   ```bash
   npm run prisma:generate
   ```
5. Aplique as migrações:
   ```bash
   npm run prisma:migrate
   ```
6. Inicie a aplicação:
   ```bash
   npm run dev
   ```

## Variáveis de ambiente

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/expense_tracker?schema=public
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

## Rotas

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/users/me`
- `PUT /api/v1/users/me`
- `DELETE /api/v1/users/me`
- `POST /api/v1/transactions`
- `GET /api/v1/transactions`
- `GET /api/v1/transactions/:id`
- `PUT /api/v1/transactions/:id`
- `DELETE /api/v1/transactions/:id`
- `POST /api/v1/categories`
- `GET /api/v1/categories`
- `PUT /api/v1/categories/:id`
- `DELETE /api/v1/categories/:id`
- `GET /api/v1/dashboard/summary`

## Documentação

Abra a documentação Swagger após iniciar o servidor:

```bash
http://localhost:3000/api/v1/docs
```

## Demo

> Adicione seu GIF de demonstração aqui para mostrar a API em funcionamento.

## Testes

```bash
npm test
```

## Docker

```bash
docker build -t expense-tracker-api .
docker run --env-file .env -p 3000:3000 expense-tracker-api
```

Ou use Docker Compose:

```bash
docker compose up --build
```
