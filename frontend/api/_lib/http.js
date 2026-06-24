/**
 * Shared helpers for the Vercel serverless functions.
 *
 * These functions are the production deployment of the three microservices,
 * consolidated into one Vercel project as individual serverless routes under
 * /api. They reuse the same mock data and response envelope as the standalone
 * Express services in /backend, so the API contract is identical.
 */

export function applyCors(res) {
  // Frontend and API share an origin on Vercel, so CORS is not strictly
  // required — but these headers keep the endpoints callable cross-origin too.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export function sendError(res, statusCode, message, details) {
  return res.status(statusCode).json({
    error: { message, statusCode, ...(details ? { details } : {}) }
  });
}
