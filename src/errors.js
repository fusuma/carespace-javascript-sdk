/**
 * Base error class for all Carespace API errors
 */
export class CarespaceError extends Error {
  constructor(message, statusCode = null, response = null) {
    super(message);
    this.name = 'CarespaceError';
    this.statusCode = statusCode;
    this.response = response;
  }
}

/**
 * Authentication related errors (401)
 */
export class AuthenticationError extends CarespaceError {
  constructor(message = 'Authentication failed', statusCode = 401, response = null) {
    super(message, statusCode, response);
    this.name = 'AuthenticationError';
  }
}

/**
 * Authorization related errors (403)
 */
export class AuthorizationError extends CarespaceError {
  constructor(message = 'Access denied', statusCode = 403, response = null) {
    super(message, statusCode, response);
    this.name = 'AuthorizationError';
  }
}

/**
 * Resource not found errors (404)
 */
export class NotFoundError extends CarespaceError {
  constructor(message = 'Resource not found', statusCode = 404, response = null) {
    super(message, statusCode, response);
    this.name = 'NotFoundError';
  }
}

/**
 * Validation errors (400, 422)
 */
export class ValidationError extends CarespaceError {
  constructor(message = 'Validation failed', statusCode = 400, response = null, errors = []) {
    super(message, statusCode, response);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

/**
 * Rate limiting errors (429)
 */
export class RateLimitError extends CarespaceError {
  constructor(message = 'Rate limit exceeded', statusCode = 429, response = null) {
    super(message, statusCode, response);
    this.name = 'RateLimitError';
  }
}

/**
 * Server errors (500+)
 */
export class ServerError extends CarespaceError {
  constructor(message = 'Internal server error', statusCode = 500, response = null) {
    super(message, statusCode, response);
    this.name = 'ServerError';
  }
}

/**
 * Network/timeout errors
 */
export class NetworkError extends CarespaceError {
  constructor(message = 'Network error', response = null) {
    super(message, null, response);
    this.name = 'NetworkError';
  }
}

/**
 * Request timeout errors
 */
export class TimeoutError extends NetworkError {
  constructor(message = 'Request timeout', response = null) {
    super(message, response);
    this.name = 'TimeoutError';
  }
}

/**
 * Create appropriate error based on status code and response
 */
export function createError(status, message, response = null) {
  switch (status) {
  case 401:
    return new AuthenticationError(message, status, response);
  case 403:
    return new AuthorizationError(message, status, response);
  case 404:
    return new NotFoundError(message, status, response);
  case 400:
  case 422:
    return new ValidationError(message, status, response);
  case 429:
    return new RateLimitError(message, status, response);
  case 500:
  case 502:
  case 503:
  case 504:
    return new ServerError(message, status, response);
  default:
    return new CarespaceError(message, status, response);
  }
}
