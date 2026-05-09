const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'Expense Tracker API',
    version: '1.0.0',
    description: 'Backend API for managing personal expenses, transactions, categories, and dashboard summaries.',
  },
  servers: [
    { url: '/api/v1', description: 'Local API server' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      AuthRequest: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'user@example.com' },
          password: { type: 'string', example: 'securePassword123' },
        },
        required: ['email', 'password'],
      },
      UserResponse: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
          role: { type: 'string' },
        },
      },
      Transaction: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          amount: { type: 'number' },
          type: { type: 'string', enum: ['income', 'expense'] },
          categoryId: { type: 'string' },
          userId: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Category: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      AuthRequest: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'user@example.com' },
          password: { type: 'string', example: 'securePassword123' },
        },
        required: ['email', 'password'],
      },
      AuthResponse: {
        type: 'object',
        properties: {
          accessToken: { type: 'string' },
          refreshToken: { type: 'string' },
        },
      },
      RefreshRequest: {
        type: 'object',
        properties: {
          refreshToken: { type: 'string' },
        },
        required: ['refreshToken'],
      },
      UserResponse: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
          role: { type: 'string' },
        },
      },
      TransactionInput: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Freelance Payment' },
          amount: { type: 'number', example: 1200.5 },
          type: { type: 'string', enum: ['income', 'expense'] },
          categoryId: { type: 'string', example: 'uuid-category-id' },
        },
        required: ['title', 'amount', 'type', 'categoryId'],
      },
      TransactionResponse: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          amount: { type: 'number' },
          type: { type: 'string' },
          categoryId: { type: 'string' },
          userId: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      CategoryInput: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Utilities' },
        },
        required: ['name'],
      },
      CategoryResponse: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthRequest' } } },
        },
        responses: {
          201: { description: 'User created' },
          400: { description: 'Validation error' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Authenticate and receive tokens',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthRequest' } } },
        },
        responses: {
          200: { description: 'Login successful' },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/auth/refresh': {
      post: {
        tags: ['Auth'],
        summary: 'Refresh access token',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/RefreshRequest' } } },
        },
        responses: {
          200: { description: 'Tokens refreshed' },
          401: { description: 'Invalid refresh token' },
        },
      },
    },
    '/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Logout and revoke refresh token',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/RefreshRequest' } } },
        },
        responses: {
          204: { description: 'Logged out successfully' },
        },
      },
    },
    '/users/me': {
      get: {
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        summary: 'Get current user profile',
        responses: {
          200: { description: 'User profile returned' },
          401: { description: 'Unauthorized' },
        },
      },
      put: {
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        summary: 'Update current user profile',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Updated profile returned' },
          400: { description: 'Validation error' },
        },
      },
      delete: {
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        summary: 'Delete current user account',
        responses: {
          204: { description: 'Account deleted' },
        },
      },
    },
    '/transactions': {
      post: {
        tags: ['Transactions'],
        security: [{ bearerAuth: [] }],
        summary: 'Create a new transaction',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/TransactionInput' } } },
        },
        responses: {
          201: { description: 'Transaction created' },
        },
      },
      get: {
        tags: ['Transactions'],
        security: [{ bearerAuth: [] }],
        summary: 'List transactions with optional filters',
        responses: {
          200: { description: 'Transaction list returned' },
        },
      },
    },
    '/transactions/{id}': {
      get: {
        tags: ['Transactions'],
        security: [{ bearerAuth: [] }],
        summary: 'Get a transaction by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Transaction returned' },
          404: { description: 'Not found' },
        },
      },
      put: {
        tags: ['Transactions'],
        security: [{ bearerAuth: [] }],
        summary: 'Update a transaction',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/TransactionInput' } } },
        },
        responses: {
          200: { description: 'Transaction updated' },
          400: { description: 'Validation error' },
        },
      },
      delete: {
        tags: ['Transactions'],
        security: [{ bearerAuth: [] }],
        summary: 'Delete a transaction',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          204: { description: 'Transaction deleted' },
        },
      },
    },
    '/categories': {
      post: {
        tags: ['Categories'],
        security: [{ bearerAuth: [] }],
        summary: 'Create a new category',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CategoryInput' } } },
        },
        responses: {
          201: { description: 'Category created' },
        },
      },
      get: {
        tags: ['Categories'],
        security: [{ bearerAuth: [] }],
        summary: 'List all categories for the current user',
        responses: {
          200: { description: 'Category list returned' },
        },
      },
    },
    '/categories/{id}': {
      put: {
        tags: ['Categories'],
        security: [{ bearerAuth: [] }],
        summary: 'Update a category',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CategoryInput' } } },
        },
        responses: {
          200: { description: 'Category updated' },
          400: { description: 'Validation error' },
        },
      },
      delete: {
        tags: ['Categories'],
        security: [{ bearerAuth: [] }],
        summary: 'Delete a category',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          204: { description: 'Category deleted' },
        },
      },
    },
    '/dashboard/summary': {
      get: {
        tags: ['Dashboard'],
        security: [{ bearerAuth: [] }],
        summary: 'Get financial summary data for the current user',
        responses: {
          200: { description: 'Dashboard data returned' },
        },
      },
    },
  },
};

module.exports = swaggerDefinition;
