# Expense Tracker API

API backend para controle financeiro com autenticação JWT, validação Zod, PostgreSQL e documentação Swagger.

## Resumo técnico

- Autenticação: registro, login, refresh token, logout
- Usuários: perfil, atualização e exclusão de conta
- Transações: CRUD de receitas e despesas
- Categorias: CRUD com categorias padrão por usuário
- Dashboard: saldo, totais, resumo mensal e percentuais por categoria
- Segurança: Helmet, CORS, rate limiting e validação de entrada

## Tecnologias

- Node.js, Express
- PostgreSQL, Prisma ORM
- JWT, bcrypt
- Zod
- Swagger/OpenAPI
- Docker

## Estrutura principal

- `src/app.js` - configuração do Express
- `src/server.js` - servidor HTTP
- `src/routes` - rotas da API
- `src/controllers` - camada de controle
- `src/services` - regras de negócio
- `src/repositories` - acesso ao banco de dados
- `src/middlewares` - autenticação, validação e erros
- `src/schemas` - validação de payloads
- `src/prisma` - esquema e seed
- `src/docs` - especificação Swagger

## Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/Lymm-08/Expense-Tracker-API.git
   cd Expense-Tracker-API
   ```
2. Instale dependências:
   ```bash
   npm install
   ```
3. Copie `.env.example` para `.env` e configure as variáveis.
4. Gere o cliente Prisma:
   ```bash
   npm run prisma:generate
   ```
5. Execute migrações:
   ```bash
   npm run prisma:migrate
   ```
6. Inicie em modo de desenvolvimento:
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

## Rotas principais

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

A documentação Swagger fica em:

```bash
http://localhost:3000/api/v1/docs
```

## Testes

```bash
npm test
```

## Docker

```bash
docker build -t expense-tracker-api .
docker run --env-file .env -p 3000:3000 expense-tracker-api
```

## Docker Compose

```bash
docker compose up --build
```
