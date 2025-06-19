import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { CarespaceClient } from '../client.js';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

describe('CarespaceClient', () => {
  let client;
  let mockCreate;
  let mockAxiosInstance;

  beforeEach(() => {
    mockAxiosInstance = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: {
          use: jest.fn()
        },
        response: {
          use: jest.fn()
        }
      }
    };

    mockCreate = jest.fn().mockReturnValue(mockAxiosInstance);
    mockedAxios.create = mockCreate;

    client = new CarespaceClient({
      baseURL: 'https://api.test.com',
      apiKey: 'test-key',
      timeout: 5000
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create axios instance with correct config', () => {
      expect(mockCreate).toHaveBeenCalledWith({
        baseURL: 'https://api.test.com',
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });

    it('should use default baseURL if not provided', () => {
      new CarespaceClient();
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: 'https://api-dev.carespace.ai'
        })
      );
    });

    it('should setup request and response interceptors', () => {
      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
    });
  });

  describe('setApiKey', () => {
    it('should update the apiKey property', () => {
      client.setApiKey('new-key');
      expect(client.apiKey).toBe('new-key');
    });
  });

  describe('HTTP methods', () => {
    beforeEach(() => {
      mockAxiosInstance.get.mockResolvedValue({ data: { result: 'test' } });
      mockAxiosInstance.post.mockResolvedValue({ data: { result: 'test' } });
      mockAxiosInstance.put.mockResolvedValue({ data: { result: 'test' } });
      mockAxiosInstance.patch.mockResolvedValue({ data: { result: 'test' } });
      mockAxiosInstance.delete.mockResolvedValue({ data: { result: 'test' } });
    });

    it('should make GET requests', async () => {
      const result = await client.get('/test');
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', {});
      expect(result).toEqual({ result: 'test' });
    });

    it('should make POST requests', async () => {
      const data = { name: 'test' };
      const result = await client.post('/test', data);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', data, {});
      expect(result).toEqual({ result: 'test' });
    });

    it('should make PUT requests', async () => {
      const data = { name: 'test' };
      const result = await client.put('/test', data);
      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/test', data, {});
      expect(result).toEqual({ result: 'test' });
    });

    it('should make PATCH requests', async () => {
      const data = { name: 'test' };
      const result = await client.patch('/test', data);
      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/test', data, {});
      expect(result).toEqual({ result: 'test' });
    });

    it('should make DELETE requests', async () => {
      const result = await client.delete('/test');
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/test', {});
      expect(result).toEqual({ result: 'test' });
    });
  });
});
