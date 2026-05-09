const bcrypt = require('bcrypt');
const ApiError = require('../utils/apiError');
const userRepository = require('../repositories/user.repository');
const prisma = require('../prisma/client');

async function getUserProfile(userId) {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

async function updateUserProfile(userId, updates) {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  const data = {};
  if (updates.name) data.name = updates.name;
  if (updates.email) data.email = updates.email;
  if (updates.password) {
    data.password = await bcrypt.hash(updates.password, 10);
  }

  const updated = await userRepository.updateUser(userId, data);
  return {
    id: updated.id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    updatedAt: updated.updatedAt,
  };
}

async function deleteUserAccount(userId) {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  await prisma.refreshToken.deleteMany({ where: { userId } });
  await prisma.transaction.deleteMany({ where: { userId } });
  await prisma.category.deleteMany({ where: { userId } });
  await userRepository.deleteUser(userId);
}

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
};
