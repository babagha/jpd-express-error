/**
 * @file This module provides two helper functions to handle errors within the application:
 *       - handleError: Formats and sends HTTP responses based on predefined error messages.
 *       - handlePrismaError: Handles specific Prisma errors and optionally transforms them 
 *         into a custom AppError.
 *
 * These functions help ensure that errors are consistently managed and returned to the client 
 * with the correct HTTP status codes and messages.
 */

import { Response } from 'express';
import { ErrorMessage } from '../types/errorMessage';
import { ApiResponse } from './apiResponse';

const isDev = process.env.NODE_ENV === 'development';



/**
 * Formats and sends an HTTP response based on the specified error message.
 *
 * This function uses a switch statement to determine the appropriate HTTP status code
 * and response body, depending on the received error message. If the application is running
 * in development mode, the actual error message is sent in the response. Otherwise, a
 * generic message is used to avoid leaking sensitive information.
 *
 * @function
 * @name handleError
 * @param {Error} error - The error object caught in a controller or service.
 * @param {Response} res - The Express.js response object used to send the HTTP response.
 * @returns {void} This function sends an HTTP response and then returns immediately.
 */
const handleError = (error: Error, res: Response): void => {
  switch (error.message as ErrorMessage) {
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
      const message400error: ErrorMessage = isDev ? error.message as ErrorMessage : 'An error occurred while processing your request' as ErrorMessage;
      res.status(400).json(ApiResponse.error(message400error));
      return;

    // 401 Unauthorized
    case 'Unauthorized':
    case 'Invalid password':
    case 'Invalid token':
    case 'Token expired':
    case 'Missing token':
    case 'Invalid credentials':
      const message401error: ErrorMessage = isDev ? error.message as ErrorMessage : 'Unauthorized' as ErrorMessage;
      res.status(401).json(ApiResponse.error(message401error));
      return;

    // 403 Forbidden
    case 'Forbidden':
    case 'Insufficient permissions':
    case 'Access denied':
      const message403error: ErrorMessage = isDev ? error.message as ErrorMessage : 'Forbidden' as ErrorMessage;
      res.status(403).json(ApiResponse.error(message403error));
      return;

    // 404 Not Found
    case 'User not found':
    case 'Resource not found':
    case 'Cart not found':
    case 'Product not found':
      const message404error: ErrorMessage = isDev ? error.message as ErrorMessage : 'Resource not found' as ErrorMessage;
      res.status(404).json(ApiResponse.error(message404error));
      return;

    // 409 Conflict
    case 'User already exists':
    case 'Email already in use':
    case 'Resource already exists':
    case 'Foreign key constraint failed':
      const message409error: ErrorMessage = isDev ? error.message as ErrorMessage : 'Resource already exists' as ErrorMessage;
      res.status(409).json(ApiResponse.error(message409error));
      return;

    // 422 Unprocessable Entity
    case 'Validation error':
    case 'Invalid email format':
    case 'Password too weak':
      const message422error: ErrorMessage = isDev ? error.message as ErrorMessage : 'Validation error' as ErrorMessage;
      res.status(422).json(ApiResponse.error(message422error));
      return;

    // 429 Too Many Requests
    case 'Too many requests':
    case 'Rate limit exceeded':
      const message429error: ErrorMessage = isDev ? error.message as ErrorMessage : 'Too many requests' as ErrorMessage;
      res.status(429).json(ApiResponse.error(message429error));
      return;

    // 500 Internal Server Error (default case)
    case 'Internal server error':
    case 'Database connection error':
    case 'File upload error':
    case 'File deletion error':
    case 'File read error':
    case 'File write error':
      const message500error: ErrorMessage = isDev ? error.message as ErrorMessage : 'Internal Server Error' as ErrorMessage;
      res.status(500).json(ApiResponse.error(message500error));
      return;

    default:
      const message500Defaulterror: ErrorMessage = isDev ? error.message as ErrorMessage : 'Internal Server Error' as ErrorMessage;
      res.status(500).json(ApiResponse.error(message500Defaulterror));
      return;
  }
};



export { handleError };