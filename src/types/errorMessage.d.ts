export type ErrorMessage =
  // 400 Bad Request
  | 'Error logging out'
  | 'Invalid request'
  | 'Missing required fields'
  | 'Invalid data format'
  | 'Invalid request format'
  | 'Unsupported media type'
  | 'Too many parameters'
  | 'Invalid query parameters'
  | 'Cart creation failed'

  // 401 Unauthorized
  | 'Unauthorized'
  | 'Invalid password'
  | 'Invalid token'
  | 'Token expired'
  | 'Missing token'
  | 'Invalid credentials'

  // 403 Forbidden
  | 'Forbidden'
  | 'Insufficient permissions'
  | 'Access denied'

  // 404 Not Found
  | 'Resource not found'
  | 'User not found'
  | 'Cart not found'
  | 'Product not found'

  // 409 Conflict
  | 'User already exists'
  | 'Email already in use'
  | 'Resource already exists'
  | 'Foreign key constraint failed'

  // 422 Unprocessable Entity
  | 'Validation error'
  | 'Invalid email format'
  | 'Password too weak'

  // 429 Too Many Requests
  | 'Too many requests'
  | 'Rate limit exceeded'

  // 500 Internal Server Error
  | 'Internal server error'
  | 'Database connection error'
  | 'File upload error'
  | 'File deletion error'
  | 'File read error'
  | 'File write error'

  // Generic
  | 'An error occurred while processing your request';