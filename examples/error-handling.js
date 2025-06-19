/**
 * Error Handling Example
 * 
 * This example demonstrates comprehensive error handling using
 * the SDK's specific error types
 */

import { 
  CarespaceAPI,
  CarespaceError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ServerError,
  NetworkError,
  TimeoutError
} from '@carespace/sdk-js';

const carespace = new CarespaceAPI({
  baseURL: 'https://api.carespace.ai',
  apiKey: 'your-api-key-here',
  timeout: 5000 // Short timeout for demonstration
});

async function comprehensiveErrorHandling() {
  try {
    // This will likely fail for demonstration
    const user = await carespace.users.getUser('invalid-user-id');
    console.log('User:', user);
    
  } catch (error) {
    console.log('Error caught:', error.constructor.name);
    console.log('Error message:', error.message);
    
    // Handle specific error types
    if (error instanceof AuthenticationError) {
      console.log('🔒 Authentication Error');
      console.log('Action: Redirect to login page');
      console.log('Suggested fix: Check your API key or login again');
      
    } else if (error instanceof AuthorizationError) {
      console.log('🚫 Authorization Error');
      console.log('Action: Show access denied message');
      console.log('Suggested fix: Contact admin for permissions');
      
    } else if (error instanceof NotFoundError) {
      console.log('🔍 Not Found Error');
      console.log('Action: Show "resource not found" message');
      console.log('Suggested fix: Check the resource ID');
      
    } else if (error instanceof ValidationError) {
      console.log('✏️ Validation Error');
      console.log('Action: Show validation errors to user');
      if (error.errors && error.errors.length > 0) {
        console.log('Validation details:', error.errors);
      }
      
    } else if (error instanceof RateLimitError) {
      console.log('⏱️ Rate Limit Error');
      console.log('Action: Implement retry with backoff');
      console.log('Suggested fix: Wait before retrying');
      
    } else if (error instanceof TimeoutError) {
      console.log('⏰ Timeout Error');
      console.log('Action: Retry the request');
      console.log('Suggested fix: Check network connection');
      
    } else if (error instanceof NetworkError) {
      console.log('🌐 Network Error');
      console.log('Action: Show offline message');
      console.log('Suggested fix: Check internet connection');
      
    } else if (error instanceof ServerError) {
      console.log('🔥 Server Error');
      console.log('Action: Show "service unavailable" message');
      console.log('Suggested fix: Try again later');
      
    } else if (error instanceof CarespaceError) {
      console.log('🔧 Generic Carespace Error');
      console.log('Status Code:', error.statusCode);
      console.log('Response:', error.response);
      
    } else {
      console.log('❌ Unexpected Error');
      console.log('This should not happen with the SDK');
    }
  }
}

async function retryLogicExample() {
  const maxRetries = 3;
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    try {
      console.log(`Attempt ${retryCount + 1}/${maxRetries}`);
      const users = await carespace.users.getUsers();
      console.log('Success! Got users:', users.length);
      break; // Success, exit retry loop
      
    } catch (error) {
      retryCount++;
      
      if (error instanceof TimeoutError || error instanceof NetworkError) {
        console.log(`Retryable error: ${error.message}`);
        
        if (retryCount < maxRetries) {
          const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
          console.log(`Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          console.log('Max retries reached, giving up');
          throw error;
        }
      } else {
        // Non-retryable error, throw immediately
        console.log('Non-retryable error, not retrying');
        throw error;
      }
    }
  }
}

async function gracefulDegradationExample() {
  try {
    // Try to get detailed user data
    const userProfile = await carespace.users.getUserProfile();
    console.log('Got full user profile:', userProfile);
    
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof AuthorizationError) {
      console.log('Could not get full profile, using basic info instead');
      
      try {
        // Fallback to basic user list
        const users = await carespace.users.getUsers({ limit: 1 });
        console.log('Using basic user data:', users[0]);
        
      } catch (fallbackError) {
        console.log('All user data unavailable, using cached/default data');
        const defaultUser = { name: 'Guest User', email: 'guest@example.com' };
        console.log('Using default data:', defaultUser);
      }
    } else {
      // For other errors, re-throw
      throw error;
    }
  }
}

// Run examples
console.log('=== Comprehensive Error Handling ===');
comprehensiveErrorHandling();

console.log('\n=== Retry Logic Example ===');
retryLogicExample();

console.log('\n=== Graceful Degradation Example ===');
gracefulDegradationExample();