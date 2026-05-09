const express = require('express');
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const { createCategorySchema, updateCategorySchema, deleteCategorySchema } = require('../schemas/category.schema');

const router = express.Router();

router.use(authMiddleware);
router.post('/', validationMiddleware(createCategorySchema), categoryController.createCategory);
router.get('/', categoryController.listCategories);
router.put('/:id', validationMiddleware(updateCategorySchema), categoryController.updateCategory);
router.delete('/:id', validationMiddleware(deleteCategorySchema), categoryController.deleteCategory);

module.exports = router;
