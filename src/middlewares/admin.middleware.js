const ApiError = require('../utils/apiError');

function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return next(new ApiError('Admin access required', 403));
  }

  next();
}

module.exports = adminMiddleware;
