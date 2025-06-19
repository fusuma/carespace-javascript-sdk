# Carespace JavaScript SDK

[![npm version](https://badge.fury.io/js/%40carespace%2Fsdk-js.svg)](https://badge.fury.io/js/%40carespace%2Fsdk-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, lightweight JavaScript SDK for the Carespace API. Built with ES6 modules, Axios HTTP client, and comprehensive error handling for healthcare and rehabilitation applications.

## Features

- 🚀 **Modern ES6 Modules** - Tree-shakeable and lightweight
- 🔒 **Built-in Authentication** - Token-based auth with automatic headers
- 🛡️ **Comprehensive Error Handling** - Specific error types for different scenarios
- 📱 **Cross-platform** - Works in Node.js and modern browsers
- 🧪 **Fully Tested** - 100% test coverage with Jest
- 📚 **TypeScript-like Experience** - JSDoc comments for IDE support
- ⚡ **Request/Response Interceptors** - Centralized request/response processing

## Installation

```bash
npm install @carespace/sdk-js
```

## Quick Start

```javascript
import { CarespaceAPI } from '@carespace/sdk-js';

// Initialize the SDK
const carespace = new CarespaceAPI({
  baseURL: 'https://api.carespace.ai', // Optional: defaults to dev environment
  apiKey: 'your-api-key-here',
  timeout: 30000 // Optional: request timeout in ms
});

// Start using the API
try {
  const users = await carespace.users.getUsers();
  console.log('Users:', users);
} catch (error) {
  console.error('Error:', error.message);
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseURL` | string | `'https://api-dev.carespace.ai'` | API base URL |
| `apiKey` | string | `undefined` | API authentication key |
| `timeout` | number | `30000` | Request timeout in milliseconds |
| `headers` | object | `{}` | Additional headers for all requests |

## Authentication

### Login and Token Management

```javascript
// Login with credentials
const loginResult = await carespace.auth.login({
  email: 'user@example.com',
  password: 'your-password'
});

// Set the API key from login response
carespace.setApiKey(loginResult.access_token);

// Refresh token when needed
const refreshResult = await carespace.auth.refreshToken(loginResult.refresh_token);
```

### Password Management

```javascript
// Forgot password
await carespace.auth.forgotPassword('user@example.com');

// Reset password with token
await carespace.auth.resetPassword('reset-token', 'new-password');

// Change password (when authenticated)
await carespace.auth.changePassword('current-password', 'new-password');
```

## API Endpoints

### Users API

```javascript
// Get all users with optional filtering
const users = await carespace.users.getUsers({
  page: 1,
  limit: 10,
  search: 'john'
});

// Get specific user
const user = await carespace.users.getUser('user-id');

// Create new user
const newUser = await carespace.users.createUser({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'therapist'
});

// Update user
const updatedUser = await carespace.users.updateUser('user-id', {
  name: 'Jane Doe',
  email: 'jane@example.com'
});

// Delete user
await carespace.users.deleteUser('user-id');

// Get/Update user profile (current user)
const profile = await carespace.users.getUserProfile();
await carespace.users.updateUserProfile({ name: 'Updated Name' });

// User settings and preferences
const settings = await carespace.users.getUserSettings('user-id');
await carespace.users.updateUserSettings('user-id', { theme: 'dark' });

const preferences = await carespace.users.getUserPreferences('user-id');
await carespace.users.updateUserPreferences('user-id', { notifications: true });
```

### Clients API

```javascript
// Get all clients
const clients = await carespace.clients.getClients({
  page: 1,
  limit: 20,
  status: 'active'
});

// Get specific client
const client = await carespace.clients.getClient('client-id');

// Create new client
const newClient = await carespace.clients.createClient({
  name: 'Patient Name',
  email: 'patient@example.com',
  dateOfBirth: '1990-01-01',
  condition: 'knee-injury'
});

// Update client
const updatedClient = await carespace.clients.updateClient('client-id', {
  status: 'active',
  notes: 'Progress update'
});

// Client statistics
const stats = await carespace.clients.getClientStats('client-id');

// Client programs
const programs = await carespace.clients.getClientPrograms('client-id');
await carespace.clients.assignProgramToClient('client-id', 'program-id', {
  startDate: '2024-01-01',
  targetCompletionWeeks: 12
});

// Client evaluations and reports
const evaluations = await carespace.clients.getClientEvaluations('client-id');
const reports = await carespace.clients.getClientReports('client-id', {
  startDate: '2024-01-01',
  endDate: '2024-12-31'
});
```

### Programs API

```javascript
// Get all programs
const programs = await carespace.programs.getPrograms({
  category: 'rehabilitation',
  difficulty: 'beginner'
});

// Get specific program
const program = await carespace.programs.getProgram('program-id');

// Create new program
const newProgram = await carespace.programs.createProgram({
  name: 'Knee Rehabilitation',
  description: 'Post-surgery knee rehabilitation program',
  duration: '8 weeks',
  exercises: ['exercise-1', 'exercise-2']
});

// Update program
const updatedProgram = await carespace.programs.updateProgram('program-id', {
  name: 'Advanced Knee Rehab',
  difficulty: 'intermediate'
});

// Program exercises
const exercises = await carespace.programs.getProgramExercises('program-id');
await carespace.programs.addExerciseToProgram('program-id', {
  name: 'Leg Extensions',
  sets: 3,
  reps: 15,
  weight: '10kg'
});

await carespace.programs.updateProgramExercise('program-id', 'exercise-id', {
  sets: 4,
  reps: 12
});

// Duplicate and templates
const duplicatedProgram = await carespace.programs.duplicateProgram('program-id', {
  name: 'Modified Knee Rehab'
});

const templates = await carespace.programs.getProgramTemplates();
```

## Error Handling

The SDK provides specific error types for different scenarios:

```javascript
import { 
  CarespaceAPI,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ServerError,
  NetworkError,
  TimeoutError
} from '@carespace/sdk-js';

try {
  const user = await carespace.users.getUser('invalid-id');
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.log('Authentication failed - check your API key');
    // Redirect to login
  } else if (error instanceof NotFoundError) {
    console.log('User not found');
    // Show not found message
  } else if (error instanceof ValidationError) {
    console.log('Validation failed:', error.errors);
    // Show validation errors to user
  } else if (error instanceof RateLimitError) {
    console.log('Rate limit exceeded - please try again later');
    // Implement retry logic
  } else if (error instanceof TimeoutError) {
    console.log('Request timed out');
    // Retry the request
  } else if (error instanceof NetworkError) {
    console.log('Network error - check your connection');
    // Show offline message
  } else {
    console.error('Unexpected error:', error.message);
  }
}
```

## Advanced Usage

### Using the HTTP Client Directly

```javascript
import { CarespaceClient } from '@carespace/sdk-js';

const client = new CarespaceClient({
  baseURL: 'https://api.carespace.ai',
  apiKey: 'your-api-key',
  timeout: 15000
});

// Make custom requests
const response = await client.get('/custom-endpoint');
const data = await client.post('/custom-endpoint', {
  customField: 'value'
});

// With custom headers
const dataWithHeaders = await client.post('/endpoint', data, {
  headers: {
    'X-Custom-Header': 'value'
  }
});
```

### Request/Response Interceptors

The SDK automatically handles:
- Authentication headers
- Error parsing and transformation
- Request/response logging (in development)
- Timeout handling

### Environment-specific Configuration

```javascript
// Development
const devCarespace = new CarespaceAPI({
  baseURL: 'https://api-dev.carespace.ai',
  apiKey: process.env.CARESPACE_DEV_API_KEY
});

// Production
const prodCarespace = new CarespaceAPI({
  baseURL: 'https://api.carespace.ai',
  apiKey: process.env.CARESPACE_PROD_API_KEY,
  timeout: 10000 // Shorter timeout for production
});

// Staging
const stagingCarespace = new CarespaceAPI({
  baseURL: 'https://api-staging.carespace.ai',
  apiKey: process.env.CARESPACE_STAGING_API_KEY
});
```

## Browser Support

The SDK works in all modern browsers that support:
- ES6 Modules
- Promises/async-await
- Fetch API (or Axios in Node.js)

For older browsers, you may need polyfills for:
- Promise
- Fetch API
- ES6 features

## Node.js Support

- **Minimum version**: Node.js 14+
- **Recommended**: Node.js 18+ for best performance
- **ES Modules**: Requires `"type": "module"` in package.json or `.mjs` file extension

## Development

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Linting

```bash
# Check for linting errors
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

## TypeScript Support

While this is a JavaScript SDK, it includes comprehensive JSDoc comments for excellent IDE support and type checking. If you're using TypeScript, the JSDoc comments provide rich type information.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run the test suite: `npm test`
5. Run linting: `npm run lint`
6. Commit your changes: `git commit -am 'Add feature'`
7. Push to the branch: `git push origin feature-name`
8. Submit a pull request

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📧 **Email**: support@carespace.ai
- 📚 **Documentation**: [https://docs.carespace.ai](https://docs.carespace.ai)
- 🐛 **Issues**: [GitHub Issues](https://github.com/fusuma/carespace-javascript-sdk/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/fusuma/carespace-javascript-sdk/discussions)

---

Made with ❤️ by the Carespace team