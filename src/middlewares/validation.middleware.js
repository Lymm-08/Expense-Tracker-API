const ApiError = require('../utils/apiError');

function validationMiddleware(schema) {
  return (req, res, next) => {
    try {
      const result = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      req.validated = result;
      next();
    } catch (error) {
      return next(new ApiError(error.errors ? error.errors.map((item) => item.message).join(', ') : error.message, 400));
    }
  };
}

module.exports = validationMiddleware;
