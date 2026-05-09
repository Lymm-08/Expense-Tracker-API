const prisma = require('../prisma/client');

async function createCategory(data) {
  return prisma.category.create({ data });
}

async function findCategoryById(id, userId) {
  return prisma.category.findFirst({ where: { id, userId } });
}

async function listCategories(userId) {
  return prisma.category.findMany({ where: { userId }, orderBy: { name: 'asc' } });
}

async function updateCategory(id, userId, data) {
  return prisma.category.updateMany({ where: { id, userId }, data });
}

async function deleteCategory(id, userId) {
  return prisma.category.deleteMany({ where: { id, userId } });
}

module.exports = {
  createCategory,
  findCategoryById,
  listCategories,
  updateCategory,
  deleteCategory,
};
