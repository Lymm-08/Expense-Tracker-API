const prisma = require('../prisma/client');

async function createTransaction(data) {
  return prisma.transaction.create({ data });
}

async function findTransactionById(id, userId) {
  return prisma.transaction.findFirst({ where: { id, userId } });
}

async function findTransactions(filters) {
  return prisma.transaction.findMany(filters);
}

async function countTransactions(where) {
  return prisma.transaction.count({ where });
}

async function updateTransaction(id, userId, data) {
  return prisma.transaction.updateMany({ where: { id, userId }, data });
}

async function deleteTransaction(id, userId) {
  return prisma.transaction.deleteMany({ where: { id, userId } });
}

module.exports = {
  createTransaction,
  findTransactionById,
  findTransactions,
  countTransactions,
  updateTransaction,
  deleteTransaction,
};
