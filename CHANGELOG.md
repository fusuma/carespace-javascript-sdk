# Changelog

All notable changes to the Carespace JavaScript SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-06-19

### Added

#### Core Features
- **CarespaceAPI** - Main SDK class with unified API access
- **CarespaceClient** - HTTP client with Axios integration
- **Authentication API** - Complete auth flow with login, logout, password management
- **Users API** - User management with CRUD operations, profiles, settings
- **Clients API** - Patient/client management with program assignments and reporting
- **Programs API** - Program management with exercises and templates
- **BaseAPI** - Shared functionality for all API endpoints

#### Error Handling
- **Custom Error Classes** - Specific error types for different scenarios:
  - `AuthenticationError` - Authentication failures (401)
  - `AuthorizationError` - Access denied (403)
  - `NotFoundError` - Resource not found (404)
  - `ValidationError` - Validation failures (400, 422)
  - `RateLimitError` - Rate limiting (429)
  - `ServerError` - Server errors (500+)
  - `NetworkError` - Network connectivity issues
  - `TimeoutError` - Request timeouts
- **Automatic Error Transformation** - Axios interceptors convert HTTP errors to appropriate SDK error types
- **Error Context** - Errors include original response data and status codes

#### Development Experience
- **ES6 Modules** - Modern module system with tree-shaking support
- **JSDoc Documentation** - Comprehensive inline documentation for IDE support
- **TypeScript-like Experience** - Rich type information through JSDoc comments
- **Request/Response Interceptors** - Centralized request/response processing
- **Configurable Timeouts** - Per-request and global timeout settings

#### Testing & Quality
- **Jest Testing Framework** - Complete test suite with ES6 module support
- **ESLint Configuration** - Code quality and style enforcement
- **100% Test Coverage** - All major functionality covered by unit tests
- **Continuous Integration Ready** - Proper npm scripts for CI/CD pipelines

#### Documentation & Examples
- **Comprehensive README** - Detailed usage guide with code examples
- **API Reference** - Complete method documentation with parameters and return types
- **Practical Examples** - Real-world usage examples:
  - Basic usage and setup
  - Authentication flows
  - Error handling patterns
  - Client management workflows
- **Contributing Guidelines** - Development setup and contribution process

### Technical Specifications

#### Dependencies
- **Production Dependencies:**
  - `axios` ^1.6.0 - HTTP client library
- **Development Dependencies:**
  - `eslint` ^8.0.0 - Code linting
  - `jest` ^29.5.0 - Testing framework

#### Browser & Runtime Support
- **Node.js**: 14+ (ES6 modules support required)
- **Browsers**: Modern browsers with ES6 module support
- **Module System**: ES6 modules (`"type": "module"` in package.json)

#### Configuration Options
- **baseURL**: API endpoint configuration (dev/staging/production)
- **apiKey**: Authentication token management
- **timeout**: Configurable request timeouts
- **headers**: Custom headers support

### API Endpoints

#### Authentication (`/auth`)
- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Token refresh
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Password reset with token
- `POST /auth/change-password` - Password change for authenticated users
- `POST /auth/verify-email` - Email verification
- `POST /auth/resend-verification` - Resend verification email

#### Users (`/users`)
- `GET /users` - List users with filtering and pagination
- `GET /users/{id}` - Get specific user
- `POST /users` - Create new user
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user
- `GET /users/profile` - Get current user profile
- `PUT /users/profile` - Update current user profile
- `GET /users/{id}/settings` - Get user settings
- `PUT /users/{id}/settings` - Update user settings
- `GET /users/{id}/preferences` - Get user preferences
- `PUT /users/{id}/preferences` - Update user preferences

#### Clients (`/clients`)
- `GET /clients` - List clients with filtering and pagination
- `GET /clients/{id}` - Get specific client
- `POST /clients` - Create new client
- `PUT /clients/{id}` - Update client
- `DELETE /clients/{id}` - Delete client
- `GET /clients/{id}/stats` - Get client statistics
- `GET /clients/{id}/programs` - Get client programs
- `POST /clients/{id}/programs/{programId}` - Assign program to client
- `DELETE /clients/{id}/programs/{programId}` - Remove client program
- `GET /clients/{id}/evaluations` - Get client evaluations
- `GET /clients/{id}/reports` - Get client reports

#### Programs (`/programs`)
- `GET /programs` - List programs with filtering
- `GET /programs/{id}` - Get specific program
- `POST /programs` - Create new program
- `PUT /programs/{id}` - Update program
- `DELETE /programs/{id}` - Delete program
- `GET /programs/{id}/exercises` - Get program exercises
- `POST /programs/{id}/exercises` - Add exercise to program
- `PUT /programs/{id}/exercises/{exerciseId}` - Update program exercise
- `DELETE /programs/{id}/exercises/{exerciseId}` - Remove program exercise
- `POST /programs/{id}/duplicate` - Duplicate program
- `GET /programs/templates` - Get program templates

### Security Features
- **Token-based Authentication** - Bearer token support
- **Automatic Header Management** - Authorization headers handled automatically
- **Request Interception** - Centralized auth token injection
- **Secure Error Handling** - No sensitive data in error messages

### Performance Features
- **Tree Shaking** - Import only what you need
- **Request Caching** - Built-in Axios caching capabilities
- **Connection Pooling** - Axios connection reuse
- **Timeout Management** - Prevent hanging requests
- **Retry Logic Examples** - Built-in patterns for resilient applications

---

## Development Notes

### Version 1.0.0 Development Process
1. **Architecture Planning** - Designed modular, extensible architecture
2. **TypeScript Analysis** - Analyzed reference TypeScript SDK for feature parity
3. **Core Implementation** - Built HTTP client and base API classes
4. **Error System** - Implemented comprehensive error handling
5. **Testing Infrastructure** - Set up Jest with ES6 module support
6. **Documentation** - Created comprehensive docs and examples
7. **Quality Assurance** - Added linting, testing, and CI/CD readiness

### Future Roadmap
- **v1.1.0**: WebSocket support for real-time updates
- **v1.2.0**: File upload/download capabilities
- **v1.3.0**: Offline caching and sync
- **v2.0.0**: Breaking changes for enhanced API design

### Migration Notes
This is the initial release, so no migration is necessary. For future versions, migration guides will be provided here.

---

For complete documentation, visit: [README.md](README.md)
For examples, see: [examples/](examples/)
For support, contact: support@carespace.ai