const ApiError = require('../utils/apiError');
const transactionRepository = require('../repositories/transaction.repository');

function parseNumber(value) {
  const number = Number(value);
  return Number.isNaN(number) ? undefined : number;
}

function parseDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

async function createTransaction(userId, payload) {
  return transactionRepository.createTransaction({
    userId,
    title: payload.title,
    amount: payload.amount,
    type: payload.type,
    categoryId: payload.categoryId,
  });
}

async function listTransactions(userId, query) {
  const page = Math.max(Number(query.page || 1), 1);
  const perPage = Math.min(Math.max(Number(query.perPage || 10), 1), 50);
  const where = { userId };

  if (query.type) where.type = query.type;
  if (query.category) where.categoryId = query.category;
  if (query.search) {
    where.title = { contains: query.search, mode: 'insensitive' };
  }

  const minAmount = parseNumber(query.minAmount);
  const maxAmount = parseNumber(query.maxAmount);
  if (minAmount !== undefined || maxAmount !== undefined) {
    where.amount = {};
    if (minAmount !== undefined) where.amount.gte = minAmount;
    if (maxAmount !== undefined) where.amount.lte = maxAmount;
  }

  const startDate = parseDate(query.startDate);
  const endDate = parseDate(query.endDate);
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt.gte = startDate;
    if (endDate) where.createdAt.lte = endDate;
  }

  const total = await transactionRepository.countTransactions(where);
  const transactions = await transactionRepository.findTransactions({
    where,
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  });

  return {
    meta: {
      page,
      perPage,
      total,
      pages: Math.ceil(total / perPage),
    },
    data: transactions,
  };
}

async function getTransactionById(userId, transactionId) {
  const transaction = await transactionRepository.findTransactionById(transactionId, userId);
  if (!transaction) {
    throw new ApiError('Transaction not found', 404);
  }
  return transaction;
}

async function updateTransaction(userId, transactionId, updates) {
  const transaction = await transactionRepository.findTransactionById(transactionId, userId);
  if (!transaction) {
    throw new ApiError('Transaction not found', 404);
  }

  const data = {};
  if (updates.title !== undefined) data.title = updates.title;
  if (updates.amount !== undefined) data.amount = updates.amount;
  if (updates.type !== undefined) data.type = updates.type;
  if (updates.categoryId !== undefined) data.categoryId = updates.categoryId;

  const result = await transactionRepository.updateTransaction(transactionId, userId, data);
  if (result.count === 0) {
    throw new ApiError('Unable to update transaction', 400);
  }

  return getTransactionById(userId, transactionId);
}

async function deleteTransaction(userId, transactionId) {
  const count = await transactionRepository.deleteTransaction(transactionId, userId);
  if (count.count === 0) {
    throw new ApiError('Transaction not found', 404);
  }
}

module.exports = {
  createTransaction,
  listTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
