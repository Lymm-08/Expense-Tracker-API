const { z } = require('zod');

const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Category name must be at least 2 characters'),
  }),
});

const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid('A valid category ID is required'),
  }),
  body: z.object({
    name: z.string().min(2, 'Category name must be at least 2 characters'),
  }),
});

const deleteCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid('A valid category ID is required'),
  }),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
};
