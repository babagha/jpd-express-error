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
import { ERROR, ErrorMessage } from '../types/errorMessage';
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
    case ERROR.errorLoggingOut:
    case ERROR.invalidRequest:
    case ERROR.missingRequiredFields:
    case ERROR.invalidDataFormat:
    case ERROR.invalidRequestFormat:
    case ERROR.unsupportedMediaType:
    case ERROR.tooManyParameters:
    case ERROR.invalidQueryParameters:
    case ERROR.cartCreationFailed:
      res.status(400).json(ApiResponse.error(isDev ? error.message as ErrorMessage : ERROR.genericError));
      return;

    // 401 Unauthorized
    case ERROR.unauthorized:
    case ERROR.invalidPassword:
    case ERROR.invalidToken:
    case ERROR.tokenExpired:
    case ERROR.missingToken:
    case ERROR.invalidCredentials:
      res.status(401).json(ApiResponse.error(isDev ? error.message as ErrorMessage : ERROR.unauthorized));
      return;

    // 403 Forbidden
    case ERROR.forbidden:
    case ERROR.insufficientPermissions:
    case ERROR.accessDenied:
      res.status(403).json(ApiResponse.error(isDev ? error.message as ErrorMessage : ERROR.forbidden));
      return;

    // 404 Not Found
    case ERROR.userNotFound:
    case ERROR.resourceNotFound:
    case ERROR.cartNotFound:
    case ERROR.productNotFound:
      res.status(404).json(ApiResponse.error(isDev ? error.message as ErrorMessage : ERROR.resourceNotFound));
      return;

    // 409 Conflict
    case ERROR.userAlreadyExists:
    case ERROR.emailAlreadyInUse:
    case ERROR.resourceAlreadyExists:
    case ERROR.foreignKeyConstraintFailed:
      res.status(409).json(ApiResponse.error(isDev ? error.message as ErrorMessage : ERROR.resourceAlreadyExists));
      return;

    // 422 Unprocessable Entity
    case ERROR.validationError:
    case ERROR.invalidEmailFormat:
    case ERROR.passwordTooWeak:
      res.status(422).json(ApiResponse.error(isDev ? error.message as ErrorMessage : ERROR.validationError));
      return;

    // 429 Too Many Requests
    case ERROR.tooManyRequests:
    case ERROR.rateLimitExceeded:
      res.status(429).json(ApiResponse.error(isDev ? error.message as ErrorMessage : ERROR.tooManyRequests));
      return;

    // 500 Internal Server Error
    case ERROR.internalServerError:
    case ERROR.databaseConnectionError:
    case ERROR.fileUploadError:
    case ERROR.fileDeletionError:
    case ERROR.fileReadError:
    case ERROR.fileWriteError:
      res.status(500).json(ApiResponse.error(isDev ? error.message as ErrorMessage : ERROR.internalServerError));
      return;

    // 500 Internal Server Error (default case)
    case ERROR.genericError:
    default:
      res.status(500).json(ApiResponse.error(isDev ? error.message as ErrorMessage : ERROR.genericError));
      return;
  }
};

export { handleError };