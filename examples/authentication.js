/**
 * Authentication Example
 * 
 * This example demonstrates authentication flows including login,
 * token management, and password operations
 */

import { 
  CarespaceAPI, 
  AuthenticationError, 
  ValidationError 
} from '@carespace/sdk-js';

// Initialize SDK without API key (we'll get it from login)
const carespace = new CarespaceAPI({
  baseURL: 'https://api.carespace.ai'
});

async function authenticationExample() {
  try {
    // 1. Login with credentials
    console.log('Logging in...');
    const loginResult = await carespace.auth.login({
      email: 'user@example.com',
      password: 'your-password'
    });
    
    console.log('Login successful!');
    console.log('Access Token:', loginResult.access_token);
    console.log('Refresh Token:', loginResult.refresh_token);
    
    // 2. Set the API key for authenticated requests
    carespace.setApiKey(loginResult.access_token);
    
    // 3. Now you can make authenticated requests
    const profile = await carespace.users.getUserProfile();
    console.log('User Profile:', profile);
    
    // 4. Refresh token when needed
    console.log('Refreshing token...');
    const refreshResult = await carespace.auth.refreshToken(loginResult.refresh_token);
    console.log('New Access Token:', refreshResult.access_token);
    
    // Update the API key with new token
    carespace.setApiKey(refreshResult.access_token);
    
    // 5. Change password (optional)
    // await carespace.auth.changePassword('current-password', 'new-password');
    // console.log('Password changed successfully');
    
    // 6. Logout
    await carespace.auth.logout();
    console.log('Logged out successfully');
    
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error('Authentication failed:', error.message);
      console.log('Please check your credentials');
    } else if (error instanceof ValidationError) {
      console.error('Validation error:', error.message);
      console.log('Please check your input data');
    } else {
      console.error('Unexpected error:', error.message);
    }
  }
}

async function passwordResetExample() {
  try {
    // Send password reset email
    console.log('Sending password reset email...');
    await carespace.auth.forgotPassword('user@example.com');
    console.log('Password reset email sent');
    
    // Reset password with token (you would get this from the email)
    // await carespace.auth.resetPassword('reset-token-from-email', 'new-password');
    // console.log('Password reset successfully');
    
  } catch (error) {
    console.error('Password reset error:', error.message);
  }
}

async function emailVerificationExample() {
  try {
    // Verify email with token
    // await carespace.auth.verifyEmail('verification-token-from-email');
    // console.log('Email verified successfully');
    
    // Resend verification email
    await carespace.auth.resendVerification('user@example.com');
    console.log('Verification email resent');
    
  } catch (error) {
    console.error('Email verification error:', error.message);
  }
}

// Run examples
console.log('=== Authentication Example ===');
authenticationExample();

console.log('\n=== Password Reset Example ===');
passwordResetExample();

console.log('\n=== Email Verification Example ===');
emailVerificationExample();