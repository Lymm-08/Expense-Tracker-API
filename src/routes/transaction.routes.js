const express = require('express');
const transactionController = require('../controllers/transaction.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const {
  createTransactionSchema,
  updateTransactionSchema,
  getTransactionsSchema,
  getTransactionSchema,
} = require('../schemas/transaction.schema');

const router = express.Router();

router.use(authMiddleware);
router.post('/', validationMiddleware(createTransactionSchema), transactionController.createTransaction);
router.get('/', validationMiddleware(getTransactionsSchema), transactionController.listTransactions);
router.get('/:id', validationMiddleware(getTransactionSchema), transactionController.getTransaction);
router.put('/:id', validationMiddleware(updateTransactionSchema), transactionController.updateTransaction);
router.delete('/:id', validationMiddleware(getTransactionSchema), transactionController.deleteTransaction);

module.exports = router;
