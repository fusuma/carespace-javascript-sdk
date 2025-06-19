/**
 * Base API class for all endpoints
 *
 * Provides common functionality for all API endpoint classes including URL building,
 * query parameter handling, and HTTP method wrappers.
 */
export class BaseAPI {
  /**
   * Create a new BaseAPI instance
   *
   * @param {CarespaceClient} client - The HTTP client instance
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Build URL with path parameters
   *
   * @param {string} path - URL path with optional {param} placeholders
   * @param {Object} [params={}] - Parameters to replace in the path
   * @returns {string} The built URL with parameters replaced
   *
   * @example
   * buildUrl('/users/{id}/settings', { id: '123' }) // returns '/users/123/settings'
   */
  buildUrl(path, params = {}) {
    let url = path;

    // Replace path parameters
    Object.keys(params).forEach(key => {
      url = url.replace(`{${key}}`, encodeURIComponent(params[key]));
    });

    return url;
  }

  /**
   * Build query string from parameters
   *
   * @param {Object} [params={}] - Query parameters
   * @returns {string} Query string (including '?' prefix) or empty string
   *
   * @example
   * buildQueryParams({ page: 1, limit: 10 }) // returns '?page=1&limit=10'
   */
  buildQueryParams(params = {}) {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(item => searchParams.append(key, item));
        } else {
          searchParams.append(key, value);
        }
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  /**
   * Make a GET request
   *
   * @param {string} path - URL path (may contain {param} placeholders)
   * @param {Object} [params={}] - Path parameters
   * @param {Object} [queryParams={}] - Query parameters
   * @returns {Promise<any>} Response data
   * @throws {CarespaceError} When the request fails
   */
  async get(path, params = {}, queryParams = {}) {
    const url = this.buildUrl(path, params) + this.buildQueryParams(queryParams);
    return this.client.get(url);
  }

  /**
   * Make a POST request
   *
   * @param {string} path - URL path (may contain {param} placeholders)
   * @param {any} data - Request body data
   * @param {Object} [params={}] - Path parameters
   * @returns {Promise<any>} Response data
   * @throws {CarespaceError} When the request fails
   */
  async post(path, data, params = {}) {
    const url = this.buildUrl(path, params);
    return this.client.post(url, data);
  }

  /**
   * Make a PUT request
   *
   * @param {string} path - URL path (may contain {param} placeholders)
   * @param {any} data - Request body data
   * @param {Object} [params={}] - Path parameters
   * @returns {Promise<any>} Response data
   * @throws {CarespaceError} When the request fails
   */
  async put(path, data, params = {}) {
    const url = this.buildUrl(path, params);
    return this.client.put(url, data);
  }

  /**
   * Make a PATCH request
   *
   * @param {string} path - URL path (may contain {param} placeholders)
   * @param {any} data - Request body data
   * @param {Object} [params={}] - Path parameters
   * @returns {Promise<any>} Response data
   * @throws {CarespaceError} When the request fails
   */
  async patch(path, data, params = {}) {
    const url = this.buildUrl(path, params);
    return this.client.patch(url, data);
  }

  /**
   * Make a DELETE request
   *
   * @param {string} path - URL path (may contain {param} placeholders)
   * @param {Object} [params={}] - Path parameters
   * @returns {Promise<any>} Response data
   * @throws {CarespaceError} When the request fails
   */
  async delete(path, params = {}) {
    const url = this.buildUrl(path, params);
    return this.client.delete(url);
  }
}
