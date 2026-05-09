const ApiError = require('../utils/apiError');
const { verifyAccessToken } = require('../utils/jwt.utils');

function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new ApiError('Authentication required', 401));
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(new ApiError('Invalid or expired token', 401));
  }
}

module.exports = authMiddleware;
