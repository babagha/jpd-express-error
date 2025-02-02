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



/**
 * Predefined error messages as a constant object with auto-completion
 */
export const ERROR_MESSAGES: Record<ErrorMessage, ErrorMessage> = {
  "Error logging out": "Error logging out",
  "Invalid request": "Invalid request",
  "Missing required fields": "Missing required fields",
  "Invalid data format": "Invalid data format",
  "Invalid request format": "Invalid request format",
  "Unsupported media type": "Unsupported media type",
  "Too many parameters": "Too many parameters",
  "Invalid query parameters": "Invalid query parameters",
  "Cart creation failed": "Cart creation failed",
  "Unauthorized": "Unauthorized",
  "Invalid password": "Invalid password",
  "Invalid token": "Invalid token",
  "Token expired": "Token expired",
  "Missing token": "Missing token",
  "Invalid credentials": "Invalid credentials",
  "Forbidden": "Forbidden",
  "Insufficient permissions": "Insufficient permissions",
  "Access denied": "Access denied",
  "Resource not found": "Resource not found",
  "User not found": "User not found",
  "Cart not found": "Cart not found",
  "Product not found": "Product not found",
  "User already exists": "User already exists",
  "Email already in use": "Email already in use",
  "Resource already exists": "Resource already exists",
  "Foreign key constraint failed": "Foreign key constraint failed",
  "Validation error": "Validation error",
  "Invalid email format": "Invalid email format",
  "Password too weak": "Password too weak",
  "Too many requests": "Too many requests",
  "Rate limit exceeded": "Rate limit exceeded",
  "Internal server error": "Internal server error",
  "Database connection error": "Database connection error",
  "File upload error": "File upload error",
  "File deletion error": "File deletion error",
  "File read error": "File read error",
  "File write error": "File write error",
  "An error occurred while processing your request": "An error occurred while processing your request"
} as const;