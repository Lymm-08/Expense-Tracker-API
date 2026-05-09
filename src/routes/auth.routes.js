const express = require('express');
const authController = require('../controllers/auth.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
const { registerSchema, loginSchema, refreshSchema, logoutSchema } = require('../schemas/auth.schema');

const router = express.Router();

router.post('/register', validationMiddleware(registerSchema), authController.register);
router.post('/login', validationMiddleware(loginSchema), authController.login);
router.post('/refresh', validationMiddleware(refreshSchema), authController.refresh);
router.post('/logout', validationMiddleware(logoutSchema), authController.logout);

module.exports = router;
