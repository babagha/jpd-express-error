import { ErrorMessage } from '../types/errorMessage';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorMessage: ErrorMessage;

  /**
   * Creates an instance of AppError.
   *
   * @param {ErrorMessage} errorMessage - The predefined error message.
   * @param {number} [statusCode] - Optional HTTP status code. If not provided, a default value is determined based on the error message.
   */
  constructor(errorMessage: ErrorMessage, statusCode?: number) {
    super(errorMessage);
    this.errorMessage = errorMessage;
    this.statusCode = statusCode || AppError.getDefaultStatusCode(errorMessage);
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Maps an ErrorMessage to its default HTTP status code.
   *
   * @param {ErrorMessage} errorMessage - The error message.
   * @returns {number} The corresponding HTTP status code.
   */
  private static getDefaultStatusCode(errorMessage: ErrorMessage): number {
    switch (errorMessage) {
      // 400 Bad Request
      case 'Error logging out':
      case 'Invalid request':
      case 'Missing required fields':
      case 'Invalid data format':
      case 'Invalid request format':
      case 'Unsupported media type':
      case 'Too many parameters':
      case 'Invalid query parameters':
      case 'Cart creation failed':
        return 400;

      // 401 Unauthorized
      case 'Unauthorized':
      case 'Invalid password':
      case 'Invalid token':
      case 'Token expired':
      case 'Missing token':
      case 'Invalid credentials':
        return 401;

      // 403 Forbidden
      case 'Forbidden':
      case 'Insufficient permissions':
      case 'Access denied':
        return 403;

      // 404 Not Found
      case 'User not found':
      case 'Resource not found':
      case 'Cart not found':
      case 'Product not found':
        return 404;

      // 409 Conflict
      case 'User already exists':
      case 'Email already in use':
      case 'Resource already exists':
        return 409;

      // 422 Unprocessable Entity
      case 'Validation error':
      case 'Invalid email format':
      case 'Password too weak':
        return 422;

      // 429 Too Many Requests
      case 'Too many requests':
      case 'Rate limit exceeded':
        return 429;

      // Valeur par défaut en cas de non correspondance
      default:
        return 500;
    }
  }
}