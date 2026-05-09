const ApiError = require('../utils/apiError');
const categoryRepository = require('../repositories/category.repository');

async function createCategory(userId, payload) {
  return categoryRepository.createCategory({
    name: payload.name,
    userId,
  });
}

async function listCategories(userId) {
  return categoryRepository.listCategories(userId);
}

async function updateCategory(userId, categoryId, payload) {
  const category = await categoryRepository.findCategoryById(categoryId, userId);
  if (!category) {
    throw new ApiError('Category not found', 404);
  }

  const result = await categoryRepository.updateCategory(categoryId, userId, { name: payload.name });
  if (result.count === 0) {
    throw new ApiError('Unable to update category', 400);
  }

  return categoryRepository.findCategoryById(categoryId, userId);
}

async function deleteCategory(userId, categoryId) {
  const result = await categoryRepository.deleteCategory(categoryId, userId);
  if (result.count === 0) {
    throw new ApiError('Category not found', 404);
  }
}

module.exports = {
  createCategory,
  listCategories,
  updateCategory,
  deleteCategory,
};
