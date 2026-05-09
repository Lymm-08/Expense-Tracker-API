const transactionService = require('../services/transaction.service');

async function createTransaction(req, res, next) {
  try {
    const payload = req.validated.body;
    const transaction = await transactionService.createTransaction(req.user.id, payload);
    res.status(201).json({ status: 'success', data: transaction });
  } catch (error) {
    next(error);
  }
}

async function listTransactions(req, res, next) {
  try {
    const result = await transactionService.listTransactions(req.user.id, req.validated.query);
    res.json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
}

async function getTransaction(req, res, next) {
  try {
    const transaction = await transactionService.getTransactionById(req.user.id, req.validated.params.id);
    res.json({ status: 'success', data: transaction });
  } catch (error) {
    next(error);
  }
}

async function updateTransaction(req, res, next) {
  try {
    const payload = req.validated.body;
    const transaction = await transactionService.updateTransaction(req.user.id, req.validated.params.id, payload);
    res.json({ status: 'success', data: transaction });
  } catch (error) {
    next(error);
  }
}

async function deleteTransaction(req, res, next) {
  try {
    await transactionService.deleteTransaction(req.user.id, req.validated.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTransaction,
  listTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
