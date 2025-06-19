# Carespace SDK Examples

This directory contains practical examples demonstrating how to use the Carespace JavaScript SDK in real-world scenarios.

## Examples Overview

### 1. Basic Usage (`basic-usage.js`)
- SDK initialization
- Simple API calls
- Basic data fetching

**Run with:**
```bash
node examples/basic-usage.js
```

### 2. Authentication (`authentication.js`)
- User login/logout
- Token management
- Password reset flows
- Email verification

**Run with:**
```bash
node examples/authentication.js
```

### 3. Error Handling (`error-handling.js`)
- Comprehensive error handling
- Specific error types
- Retry logic
- Graceful degradation

**Run with:**
```bash
node examples/error-handling.js
```

### 4. Client Management (`client-management.js`)
- CRUD operations for clients (patients)
- Program assignments
- Reporting and evaluations
- Filtering and searching

**Run with:**
```bash
node examples/client-management.js
```

## Prerequisites

Before running the examples:

1. **Install the SDK:**
   ```bash
   npm install @carespace/sdk-js
   ```

2. **Set up your API key:**
   Replace `'your-api-key-here'` in each example with your actual Carespace API key.

3. **Configure the base URL:**
   Update the `baseURL` in examples to match your environment:
   - Development: `https://api-dev.carespace.ai`
   - Staging: `https://api-staging.carespace.ai`
   - Production: `https://api.carespace.ai`

## Environment Setup

### Using Environment Variables

Create a `.env` file in your project root:

```env
CARESPACE_API_KEY=your-api-key-here
CARESPACE_BASE_URL=https://api.carespace.ai
```

Then modify the examples to use environment variables:

```javascript
import { CarespaceAPI } from '@carespace/sdk-js';

const carespace = new CarespaceAPI({
  baseURL: process.env.CARESPACE_BASE_URL,
  apiKey: process.env.CARESPACE_API_KEY
});
```

### Using ES6 Modules

Make sure your `package.json` includes:

```json
{
  "type": "module"
}
```

Or use `.mjs` file extensions for the examples.

## Common Patterns

### Error Handling Pattern
```javascript
import { 
  CarespaceAPI,
  AuthenticationError,
  NotFoundError,
  ValidationError
} from '@carespace/sdk-js';

try {
  const result = await carespace.users.getUser(id);
  // Handle success
} catch (error) {
  if (error instanceof AuthenticationError) {
    // Redirect to login
  } else if (error instanceof NotFoundError) {
    // Show not found message
  } else if (error instanceof ValidationError) {
    // Show validation errors
  } else {
    // Handle unexpected errors
  }
}
```

### Pagination Pattern
```javascript
let page = 1;
const limit = 20;
let hasMore = true;
const allItems = [];

while (hasMore) {
  const items = await carespace.users.getUsers({ page, limit });
  allItems.push(...items);
  
  hasMore = items.length === limit;
  page++;
}
```

### Retry Pattern
```javascript
async function withRetry(operation, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries || !shouldRetry(error)) {
        throw error;
      }
      
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

function shouldRetry(error) {
  return error instanceof TimeoutError || 
         error instanceof NetworkError ||
         (error instanceof ServerError && error.statusCode >= 500);
}
```

## Testing Examples

You can test the examples against a mock server or development environment:

```bash
# Install dependencies
npm install

# Run a specific example
node examples/basic-usage.js

# Run with debug output
DEBUG=carespace:* node examples/authentication.js
```

## Contributing

When adding new examples:

1. Follow the existing code style
2. Include comprehensive error handling
3. Add JSDoc comments for clarity
4. Update this README with the new example
5. Test with both success and error scenarios

## Support

If you encounter issues with the examples:

1. Check that you have the correct API key and permissions
2. Verify the base URL matches your environment
3. Review the error messages for specific guidance
4. Consult the main [README.md](../README.md) for additional help

For additional support, contact: support@carespace.ai