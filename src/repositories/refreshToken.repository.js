const prisma = require('../prisma/client');

async function createRefreshToken(data) {
  return prisma.refreshToken.create({ data });
}

async function findRefreshToken(token) {
  return prisma.refreshToken.findUnique({ where: { token } });
}

async function deleteRefreshToken(token) {
  return prisma.refreshToken.deleteMany({ where: { token } });
}

async function deleteTokensByUser(userId) {
  return prisma.refreshToken.deleteMany({ where: { userId } });
}

module.exports = {
  createRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  deleteTokensByUser,
};
