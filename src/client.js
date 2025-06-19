import axios from 'axios';
import { createError, TimeoutError, NetworkError } from './errors.js';

/**
 * HTTP client for Carespace API
 *
 * Provides a simplified interface for making HTTP requests to the Carespace API
 * with automatic error handling, authentication, and request/response interceptors.
 *
 * @example
 * ```javascript
 * const client = new CarespaceClient({
 *   baseURL: 'https://api.carespace.ai',
 *   apiKey: 'your-api-key',
 *   timeout: 30000
 * });
 *
 * const data = await client.get('/users');
 * ```
 */
export class CarespaceClient {
  /**
   * Create a new CarespaceClient instance
   *
   * @param {Object} config - Configuration options
   * @param {string} [config.baseURL='https://api-dev.carespace.ai'] - Base URL for the API
   * @param {string} [config.apiKey] - API key for authentication
   * @param {number} [config.timeout=30000] - Request timeout in milliseconds
   * @param {Object} [config.headers={}] - Additional headers to include with requests
   */
  constructor(config = {}) {
    this.baseURL = config.baseURL || 'https://api-dev.carespace.ai';
    this.apiKey = config.apiKey;
    this.timeout = config.timeout || 30000;

    // Create axios instance with default configuration
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      }
    });

    // Setup request interceptor for authentication
    this.client.interceptors.request.use(
      (config) => {
        if (this.apiKey) {
          config.headers.Authorization = `Bearer ${this.apiKey}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Setup response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          // Server responded with error status
          const { status, data } = error.response;
          const errorMessage = data?.message || data?.error || `HTTP ${status}: ${error.response.statusText}`;
          throw createError(status, errorMessage, error.response);
        } else if (error.request) {
          // Request was made but no response received
          if (error.code === 'ECONNABORTED') {
            throw new TimeoutError('Request timeout');
          }
          throw new NetworkError('Network error - no response received');
        } else {
          // Something happened in setting up the request
          throw new NetworkError(`Request setup error: ${error.message}`);
        }
      }
    );
  }

  /**
   * Set or update the API key for authentication
   *
   * @param {string} apiKey - The API key to use for authentication
   */
  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * Make a GET request
   *
   * @param {string} url - The URL to request
   * @param {Object} [options={}] - Additional axios options
   * @returns {Promise<any>} The response data
   * @throws {CarespaceError} When the request fails
   */
  async get(url, options = {}) {
    const response = await this.client.get(url, options);
    return response.data;
  }

  /**
   * Make a POST request
   *
   * @param {string} url - The URL to request
   * @param {any} data - The data to send in the request body
   * @param {Object} [options={}] - Additional axios options
   * @returns {Promise<any>} The response data
   * @throws {CarespaceError} When the request fails
   */
  async post(url, data, options = {}) {
    const response = await this.client.post(url, data, options);
    return response.data;
  }

  /**
   * Make a PUT request
   *
   * @param {string} url - The URL to request
   * @param {any} data - The data to send in the request body
   * @param {Object} [options={}] - Additional axios options
   * @returns {Promise<any>} The response data
   * @throws {CarespaceError} When the request fails
   */
  async put(url, data, options = {}) {
    const response = await this.client.put(url, data, options);
    return response.data;
  }

  /**
   * Make a PATCH request
   *
   * @param {string} url - The URL to request
   * @param {any} data - The data to send in the request body
   * @param {Object} [options={}] - Additional axios options
   * @returns {Promise<any>} The response data
   * @throws {CarespaceError} When the request fails
   */
  async patch(url, data, options = {}) {
    const response = await this.client.patch(url, data, options);
    return response.data;
  }

  /**
   * Make a DELETE request
   *
   * @param {string} url - The URL to request
   * @param {Object} [options={}] - Additional axios options
   * @returns {Promise<any>} The response data
   * @throws {CarespaceError} When the request fails
   */
  async delete(url, options = {}) {
    const response = await this.client.delete(url, options);
    return response.data;
  }
}
