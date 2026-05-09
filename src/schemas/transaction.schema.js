const { z } = require('zod');

const transactionBase = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  amount: z.number().positive('Amount must be a positive number'),
  type: z.enum(['income', 'expense']),
  categoryId: z.string().uuid('A valid category ID is required'),
});

const createTransactionSchema = z.object({
  body: transactionBase,
});

const updateTransactionSchema = z.object({
  params: z.object({
    id: z.string().uuid('A valid transaction ID is required'),
  }),
  body: transactionBase.partial(),
});

const getTransactionsSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    perPage: z.string().optional(),
    type: z.enum(['income', 'expense']).optional(),
    category: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    minAmount: z.string().optional(),
    maxAmount: z.string().optional(),
    search: z.string().optional(),
  }),
});

const getTransactionSchema = z.object({
  params: z.object({
    id: z.string().uuid('A valid transaction ID is required'),
  }),
});

module.exports = {
  createTransactionSchema,
  updateTransactionSchema,
  getTransactionsSchema,
  getTransactionSchema,
};
