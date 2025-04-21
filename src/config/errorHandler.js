import { appError } from './appError.js';

export const errorHandler = (err, req, res, next) => {
  const statusCode = err instanceof appError ? err.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error'
  });
};
