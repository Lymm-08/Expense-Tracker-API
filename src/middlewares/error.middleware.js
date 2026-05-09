const ApiError = require('../utils/apiError');

function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  const response = {
    status: 'error',
    message,
  };

  if (process.env.NODE_ENV === 'development' && err.stack) {
    response.stack = err.stack;
  }

  if (err instanceof ApiError) {
    return res.status(statusCode).json(response);
  }

  console.error(err);
  return res.status(statusCode).json(response);
}

module.exports = errorMiddleware;
