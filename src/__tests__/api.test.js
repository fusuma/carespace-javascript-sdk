import { describe, it, expect, beforeEach } from '@jest/globals';
import { CarespaceAPI } from '../api.js';

describe('CarespaceAPI', () => {
  let api;

  beforeEach(() => {
    api = new CarespaceAPI({
      baseURL: 'https://api.test.com',
      apiKey: 'test-key'
    });
  });

  describe('constructor', () => {
    it('should initialize all API endpoints', () => {
      expect(api.auth).toBeDefined();
      expect(api.users).toBeDefined();
      expect(api.clients).toBeDefined();
      expect(api.programs).toBeDefined();
    });

    it('should create a client instance', () => {
      expect(api.client).toBeDefined();
      expect(typeof api.client.setApiKey).toBe('function');
    });
  });

  describe('setApiKey', () => {
    it('should update the client api key', () => {
      // This test just ensures the method exists and can be called
      expect(() => api.setApiKey('new-key')).not.toThrow();
    });
  });

  describe('getClient', () => {
    it('should return the client instance', () => {
      const client = api.getClient();
      expect(client).toBe(api.client);
    });
  });
});
