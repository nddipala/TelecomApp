/**
 * Centralized error handling for the Account Service.
 *
 * Routes throw an ApiError (or call next(err)); this middleware shapes a
 * consistent JSON error envelope so the frontend can rely on the same contract
 * across every microservice.
 */

export class ApiError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function notFoundHandler(req, res) {
  res.status(404).json({
    error: {
      message: `Route not found: ${req.method} ${req.originalUrl}`,
      statusCode: 404
    }
  });
}

// Express identifies error middleware by its four-argument signature.
export function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;

  if (statusCode >= 500) {
    console.error(`[error] ${req.method} ${req.originalUrl}`, err);
  }

  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
      statusCode,
      ...(err.details ? { details: err.details } : {})
    }
  });
}
