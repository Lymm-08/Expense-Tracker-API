const bcrypt = require('bcrypt');
const ApiError = require('../utils/apiError');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt.utils');
const userRepository = require('../repositories/user.repository');
const refreshTokenRepository = require('../repositories/refreshToken.repository');
const categoryRepository = require('../repositories/category.repository');
const prisma = require('../prisma/client');

const defaultCategories = ['Salary', 'Investment', 'Food', 'Transportation', 'Entertainment', 'Health', 'Bills', 'Other'];

async function registerUser({ name, email, password }) {
  const existing = await userRepository.findUserByEmail(email);
  if (existing) {
    throw new ApiError('Email already registered', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser({
    name,
    email,
    password: hashedPassword,
  });

  const categories = defaultCategories.map((name) => ({ name, userId: user.id }));
  await prisma.category.createMany({ data: categories });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

async function loginUser({ email, password }) {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new ApiError('Invalid credentials', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError('Invalid credentials', 401);
  }

  const payload = { id: user.id, role: user.role, email: user.email };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const expiresAt = new Date(Date.now() + parseRefreshExpiration());
  await refreshTokenRepository.createRefreshToken({ token: refreshToken, userId: user.id, expiresAt });

  return { accessToken, refreshToken };
}

function parseRefreshExpiration() {
  const value = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';
  const match = value.match(/^(\d+)([smhd])$/);

  if (!match) {
    return 7 * 24 * 60 * 60 * 1000;
  }

  const amount = Number(match[1]);
  const unit = match[2];

  switch (unit) {
    case 's': return amount * 1000;
    case 'm': return amount * 60 * 1000;
    case 'h': return amount * 60 * 60 * 1000;
    case 'd': return amount * 24 * 60 * 60 * 1000;
    default: return amount * 1000;
  }
}

async function refreshTokens({ refreshToken }) {
  try {
    const decoded = verifyRefreshToken(refreshToken);
    const storedToken = await refreshTokenRepository.findRefreshToken(refreshToken);

    if (!storedToken || storedToken.userId !== decoded.id) {
      throw new ApiError('Refresh token invalid', 401);
    }

    await refreshTokenRepository.deleteRefreshToken(refreshToken);

    const payload = { id: decoded.id, role: decoded.role, email: decoded.email };
    const accessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);
    const expiresAt = new Date(Date.now() + parseRefreshExpiration());

    await refreshTokenRepository.createRefreshToken({ token: newRefreshToken, userId: decoded.id, expiresAt });

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw new ApiError('Refresh token invalid or expired', 401);
  }
}

async function logoutUser({ refreshToken }) {
  await refreshTokenRepository.deleteRefreshToken(refreshToken);
}

module.exports = {
  registerUser,
  loginUser,
  refreshTokens,
  logoutUser,
};
