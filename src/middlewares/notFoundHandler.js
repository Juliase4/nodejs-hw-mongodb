import createError from 'http-errors';

export function notFoundHandler(req, res, next) {
  const error = createError(404, 'Route not found');
  next(error);
}
