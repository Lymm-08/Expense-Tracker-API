const { z } = require('zod');

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('A valid email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('A valid email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
});

const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(10, 'Refresh token is required'),
  }),
});

const logoutSchema = refreshSchema;

module.exports = {
  registerSchema,
  loginSchema,
  refreshSchema,
  logoutSchema,
};
