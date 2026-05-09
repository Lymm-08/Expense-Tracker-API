const jwt = require('jsonwebtoken');
const config = require('../config');

function generateAccessToken(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.accessTokenExpiresIn });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, config.refreshTokenSecret, { expiresIn: config.refreshTokenExpiresIn });
}

function verifyAccessToken(token) {
  return jwt.verify(token, config.jwtSecret);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, config.refreshTokenSecret);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
