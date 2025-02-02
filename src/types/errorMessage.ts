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
export const ERROR_MESSAGES: Record<ErrorMessage, string> = {
  "Error logging out": "Error while logging out.",
  "Invalid request": "The request is invalid.",
  "Missing required fields": "Some required fields are missing.",
  "Invalid data format": "The provided data format is incorrect.",
  "Invalid request format": "Request format is not supported.",
  "Unsupported media type": "The provided media type is not supported.",
  "Too many parameters": "Too many parameters provided.",
  "Invalid query parameters": "Query parameters are invalid.",
  "Cart creation failed": "Failed to create cart.",
  "Unauthorized": "You are not authorized to access this resource.",
  "Invalid password": "The provided password is incorrect.",
  "Invalid token": "The token provided is invalid.",
  "Token expired": "Your token has expired.",
  "Missing token": "Token is missing.",
  "Invalid credentials": "The credentials provided are incorrect.",
  "Forbidden": "You do not have permission to access this resource.",
  "Insufficient permissions": "You lack the required permissions.",
  "Access denied": "Access to this resource has been denied.",
  "Resource not found": "The requested resource could not be found.",
  "User not found": "The requested user does not exist.",
  "Cart not found": "Cart not found.",
  "Product not found": "Product not found.",
  "User already exists": "A user with this information already exists.",
  "Email already in use": "The provided email is already in use.",
  "Resource already exists": "The requested resource already exists.",
  "Foreign key constraint failed": "Database constraint violation.",
  "Validation error": "There was a validation error.",
  "Invalid email format": "The email format is invalid.",
  "Password too weak": "The provided password is too weak.",
  "Too many requests": "You have made too many requests. Try again later.",
  "Rate limit exceeded": "Rate limit has been exceeded.",
  "Internal server error": "An internal server error occurred.",
  "Database connection error": "Database connection failed.",
  "File upload error": "Error occurred while uploading file.",
  "File deletion error": "Error occurred while deleting file.",
  "File read error": "Error occurred while reading file.",
  "File write error": "Error occurred while writing file.",
  "An error occurred while processing your request": "An unexpected error occurred."
} as const;