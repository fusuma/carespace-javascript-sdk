// Main exports
export { CarespaceAPI } from './api.js';
export { CarespaceClient } from './client.js';

// API endpoint exports
export { AuthAPI } from './api/auth.js';
export { UsersAPI } from './api/users.js';
export { ClientsAPI } from './api/clients.js';
export { ProgramsAPI } from './api/programs.js';
export { BaseAPI } from './api/base.js';

// Error exports
export {
  CarespaceError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ServerError,
  NetworkError,
  TimeoutError
} from './errors.js';

// Default export for convenience
export { CarespaceAPI as default } from './api.js';
