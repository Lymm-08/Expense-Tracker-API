const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const transactionRoutes = require('./transaction.routes');
const categoryRoutes = require('./category.routes');
const dashboardRoutes = require('./dashboard.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swagger');

const router = express.Router();

router.get('/health', (req, res) => res.json({ status: 'success', message: 'Expense Tracker API is healthy' }));
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);
router.use('/categories', categoryRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
