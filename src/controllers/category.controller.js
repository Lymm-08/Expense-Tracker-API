const categoryService = require('../services/category.service');

async function createCategory(req, res, next) {
  try {
    const payload = req.validated.body;
    const category = await categoryService.createCategory(req.user.id, payload);
    res.status(201).json({ status: 'success', data: category });
  } catch (error) {
    next(error);
  }
}

async function listCategories(req, res, next) {
  try {
    const categories = await categoryService.listCategories(req.user.id);
    res.json({ status: 'success', data: categories });
  } catch (error) {
    next(error);
  }
}

async function updateCategory(req, res, next) {
  try {
    const payload = req.validated.body;
    const category = await categoryService.updateCategory(req.user.id, req.validated.params.id, payload);
    res.json({ status: 'success', data: category });
  } catch (error) {
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    await categoryService.deleteCategory(req.user.id, req.validated.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createCategory,
  listCategories,
  updateCategory,
  deleteCategory,
};
