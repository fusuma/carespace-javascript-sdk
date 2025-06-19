import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { AuthAPI } from '../api/auth.js';

describe('AuthAPI', () => {
  let authAPI;
  let mockClient;

  beforeEach(() => {
    mockClient = {
      post: jest.fn()
    };
    authAPI = new AuthAPI(mockClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should make POST request to /auth/login', async () => {
      const credentials = { email: 'test@example.com', password: 'password' };
      mockClient.post.mockResolvedValue({ token: 'test-token' });

      const result = await authAPI.login(credentials);

      expect(mockClient.post).toHaveBeenCalledWith('/auth/login', credentials);
      expect(result).toEqual({ token: 'test-token' });
    });
  });

  describe('logout', () => {
    it('should make POST request to /auth/logout', async () => {
      mockClient.post.mockResolvedValue({ success: true });

      const result = await authAPI.logout();

      expect(mockClient.post).toHaveBeenCalledWith('/auth/logout', undefined);
      expect(result).toEqual({ success: true });
    });
  });

  describe('refreshToken', () => {
    it('should make POST request to /auth/refresh', async () => {
      const refreshToken = 'refresh-token';
      mockClient.post.mockResolvedValue({ token: 'new-token' });

      const result = await authAPI.refreshToken(refreshToken);

      expect(mockClient.post).toHaveBeenCalledWith('/auth/refresh', { refresh_token: refreshToken });
      expect(result).toEqual({ token: 'new-token' });
    });
  });

  describe('forgotPassword', () => {
    it('should make POST request to /auth/forgot-password', async () => {
      const email = 'test@example.com';
      mockClient.post.mockResolvedValue({ success: true });

      const result = await authAPI.forgotPassword(email);

      expect(mockClient.post).toHaveBeenCalledWith('/auth/forgot-password', { email });
      expect(result).toEqual({ success: true });
    });
  });

  describe('resetPassword', () => {
    it('should make POST request to /auth/reset-password', async () => {
      const token = 'reset-token';
      const password = 'new-password';
      mockClient.post.mockResolvedValue({ success: true });

      const result = await authAPI.resetPassword(token, password);

      expect(mockClient.post).toHaveBeenCalledWith('/auth/reset-password', { token, password });
      expect(result).toEqual({ success: true });
    });
  });

  describe('changePassword', () => {
    it('should make POST request to /auth/change-password', async () => {
      const currentPassword = 'old-password';
      const newPassword = 'new-password';
      mockClient.post.mockResolvedValue({ success: true });

      const result = await authAPI.changePassword(currentPassword, newPassword);

      expect(mockClient.post).toHaveBeenCalledWith('/auth/change-password', {
        current_password: currentPassword,
        new_password: newPassword
      });
      expect(result).toEqual({ success: true });
    });
  });

  describe('verifyEmail', () => {
    it('should make POST request to /auth/verify-email', async () => {
      const token = 'verify-token';
      mockClient.post.mockResolvedValue({ success: true });

      const result = await authAPI.verifyEmail(token);

      expect(mockClient.post).toHaveBeenCalledWith('/auth/verify-email', { token });
      expect(result).toEqual({ success: true });
    });
  });

  describe('resendVerification', () => {
    it('should make POST request to /auth/resend-verification', async () => {
      const email = 'test@example.com';
      mockClient.post.mockResolvedValue({ success: true });

      const result = await authAPI.resendVerification(email);

      expect(mockClient.post).toHaveBeenCalledWith('/auth/resend-verification', { email });
      expect(result).toEqual({ success: true });
    });
  });
});
