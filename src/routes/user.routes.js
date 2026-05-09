const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const { updateProfileSchema } = require('../schemas/user.schema');

const router = express.Router();

router.use(authMiddleware);
router.get('/me', userController.getProfile);
router.put('/me', validationMiddleware(updateProfileSchema), userController.updateProfile);
router.delete('/me', userController.deleteMe);

module.exports = router;
