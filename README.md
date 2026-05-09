# Expense Tracker API

A production-ready backend API for expense tracking, built with Express, PostgreSQL, Prisma, JWT authentication, and Swagger documentation.

## What it does

- Register and authenticate users with secure password hashing
- Issue JWT access and refresh tokens with logout support
- Manage income and expense transactions with filters and pagination
- Create and update user categories with default seeded values
- Provide a dashboard summary with balance, totals, monthly metrics, and category expense breakdown
- Enforce validation, security middleware, Helmet, CORS, and rate limiting

## Tech stack

- Node.js, Express
- PostgreSQL, Prisma ORM
- JWT, bcrypt
- Zod validation
- Swagger/OpenAPI documentation
- Docker support

## Structure

- `src/controllers` - request handlers
- `src/services` - business logic
- `src/repositories` - Prisma database access
- `src/middlewares` - auth and error handling
- `src/routes` - API routes
- `src/schemas` - validation rules
- `src/config` - environment configuration
- `src/prisma` - schema and seed scripts
- `src/docs` - Swagger definition

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Lymm-08/Expense-Tracker-API.git
   cd Expense-Tracker-API
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and update values.
4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
5. Apply migrations:
   ```bash
   npm run prisma:migrate
   ```
6. Start the app:
   ```bash
   npm run dev
   ```

## Environment variables

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

## Routes

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

## Documentation

Open Swagger docs after starting the server:

```bash
http://localhost:3000/api/v1/docs
```

## Demo

> Add your demo GIF here to show the API working in action.

## Run tests

```bash
npm test
```

## Docker

```bash
docker build -t expense-tracker-api .
docker run --env-file .env -p 3000:3000 expense-tracker-api
```

Or use Docker Compose:

```bash
docker compose up --build
```
