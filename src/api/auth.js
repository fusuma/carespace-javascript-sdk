import { BaseAPI } from './base.js';

/**
 * Authentication API endpoints
 *
 * Provides methods for user authentication, password management, and session handling.
 */
export class AuthAPI extends BaseAPI {
  /**
   * Authenticate user with email and password
   *
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User's email address
   * @param {string} credentials.password - User's password
   * @returns {Promise<Object>} Authentication response with tokens
   * @throws {AuthenticationError} When credentials are invalid
   *
   * @example
   * const result = await carespace.auth.login({
   *   email: 'user@example.com',
   *   password: 'password123'
   * });
   * console.log(result.access_token);
   */
  async login(credentials) {
    return this.post('/auth/login', credentials);
  }

  /**
   * Log out the current user
   *
   * @returns {Promise<Object>} Logout response
   * @throws {CarespaceError} When logout fails
   */
  async logout() {
    return this.post('/auth/logout');
  }

  /**
   * Refresh authentication token
   *
   * @param {string} refreshToken - The refresh token
   * @returns {Promise<Object>} New authentication tokens
   * @throws {AuthenticationError} When refresh token is invalid
   */
  async refreshToken(refreshToken) {
    return this.post('/auth/refresh', { refresh_token: refreshToken });
  }

  /**
   * Send password reset email
   *
   * @param {string} email - Email address to send reset link to
   * @returns {Promise<Object>} Success response
   * @throws {NotFoundError} When email is not found
   */
  async forgotPassword(email) {
    return this.post('/auth/forgot-password', { email });
  }

  /**
   * Reset password using reset token
   *
   * @param {string} token - Password reset token
   * @param {string} password - New password
   * @returns {Promise<Object>} Success response
   * @throws {ValidationError} When token is invalid or expired
   */
  async resetPassword(token, password) {
    return this.post('/auth/reset-password', { token, password });
  }

  /**
   * Change password for authenticated user
   *
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Success response
   * @throws {AuthenticationError} When current password is wrong
   * @throws {ValidationError} When new password doesn't meet requirements
   */
  async changePassword(currentPassword, newPassword) {
    return this.post('/auth/change-password', {
      current_password: currentPassword,
      new_password: newPassword
    });
  }

  /**
   * Verify email address using verification token
   *
   * @param {string} token - Email verification token
   * @returns {Promise<Object>} Success response
   * @throws {ValidationError} When token is invalid or expired
   */
  async verifyEmail(token) {
    return this.post('/auth/verify-email', { token });
  }

  /**
   * Resend email verification
   *
   * @param {string} email - Email address to resend verification to
   * @returns {Promise<Object>} Success response
   * @throws {NotFoundError} When email is not found
   */
  async resendVerification(email) {
    return this.post('/auth/resend-verification', { email });
  }
}
