import { CarespaceClient } from './client.js';
import { AuthAPI } from './api/auth.js';
import { UsersAPI } from './api/users.js';
import { ClientsAPI } from './api/clients.js';
import { ProgramsAPI } from './api/programs.js';

/**
 * Main Carespace API class
 *
 * This is the primary entry point for the Carespace SDK. It provides access to all
 * API endpoints through specialized sub-APIs (auth, users, clients, programs).
 *
 * @example
 * ```javascript
 * import { CarespaceAPI } from '@carespace/sdk-js';
 *
 * const carespace = new CarespaceAPI({
 *   baseURL: 'https://api.carespace.ai',
 *   apiKey: 'your-api-key'
 * });
 *
 * // Use the sub-APIs
 * const users = await carespace.users.getUsers();
 * const programs = await carespace.programs.getPrograms();
 * ```
 */
export class CarespaceAPI {
  /**
   * Create a new CarespaceAPI instance
   *
   * @param {Object} config - Configuration options
   * @param {string} [config.baseURL='https://api-dev.carespace.ai'] - Base URL for the API
   * @param {string} [config.apiKey] - API key for authentication
   * @param {number} [config.timeout=30000] - Request timeout in milliseconds
   * @param {Object} [config.headers={}] - Additional headers to include with requests
   */
  constructor(config = {}) {
    this.client = new CarespaceClient(config);

    // Initialize API endpoints
    this.auth = new AuthAPI(this.client);
    this.users = new UsersAPI(this.client);
    this.clients = new ClientsAPI(this.client);
    this.programs = new ProgramsAPI(this.client);
  }

  /**
   * Set or update the API key for authentication
   *
   * @param {string} apiKey - The API key to use for authentication
   */
  setApiKey(apiKey) {
    this.client.setApiKey(apiKey);
  }

  /**
   * Get the underlying HTTP client instance
   *
   * @returns {CarespaceClient} The HTTP client instance
   */
  getClient() {
    return this.client;
  }
}
