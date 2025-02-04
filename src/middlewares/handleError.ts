import { NextFunction, Request, Response } from 'express';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { ERROR, ErrorMessage } from '../types/errorMessage';
import { JpdError } from '../utils/JpdError';
import { JpdResponse } from '../utils/jpdResponse';
import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';

/**
 * Express middleware to handle application errors consistently.
 * - Handles custom `JpdError`
 * - Handles Prisma errors
 * - Logs unknown errors and returns generic messages in production
 */
export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  let statusCode: number = 500;
  let message: ErrorMessage = ERROR.genericError;

  /**
   * Case 1 : handle custom `JpdError`
   */
  if (err instanceof JpdError) {
    statusCode = err.statusCode;
    message = err.errorMessage;

    switch (err.errorMessage) {
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
        res.status(400).json(JpdResponse.error(isDev ? err.message as ErrorMessage : ERROR.genericError));
        return;
      // 401 Unauthorized
      case ERROR.unauthorized:
      case ERROR.invalidPassword:
      case ERROR.invalidToken:
      case ERROR.tokenExpired:
      case ERROR.missingToken:
      case ERROR.invalidCredentials:
        res.status(401).json(JpdResponse.error(isDev ? err.message as ErrorMessage : ERROR.unauthorized));
        return;
      // 403 Forbidden
      case ERROR.forbidden:
      case ERROR.insufficientPermissions:
      case ERROR.accessDenied:
        res.status(403).json(JpdResponse.error(isDev ? err.message as ErrorMessage : ERROR.forbidden));
        return;
      // 404 Not Found
      case ERROR.userNotFound:
      case ERROR.resourceNotFound:
      case ERROR.cartNotFound:
      case ERROR.productNotFound:
        res.status(404).json(JpdResponse.error(isDev ? err.message as ErrorMessage : ERROR.resourceNotFound));
        return;
      // 409 Conflict
      case ERROR.userAlreadyExists:
      case ERROR.emailAlreadyInUse:
      case ERROR.resourceAlreadyExists:
      case ERROR.foreignKeyConstraintFailed:
        res.status(409).json(JpdResponse.error(isDev ? err.message as ErrorMessage : ERROR.resourceAlreadyExists));
        return;
      // 422 Unprocessable Entity
      case ERROR.validationError:
      case ERROR.invalidEmailFormat:
      case ERROR.passwordTooWeak:
        res.status(422).json(JpdResponse.error(isDev ? err.message as ErrorMessage : ERROR.validationError));
        return;
      // 429 Too Many Requests
      case ERROR.tooManyRequests:
      case ERROR.rateLimitExceeded:
        res.status(429).json(JpdResponse.error(isDev ? err.message as ErrorMessage : ERROR.tooManyRequests));
        return;
      // 500 Internal Server Error
      case ERROR.internalServerError:
      case ERROR.databaseConnectionError:
      case ERROR.fileUploadError:
      case ERROR.fileDeletionError:
      case ERROR.fileReadError:
      case ERROR.fileWriteError:
        res.status(500).json(JpdResponse.error(isDev ? err.message as ErrorMessage : ERROR.internalServerError));
        return;
      // 500 Internal Server Error (default case)
      case ERROR.genericError:
      default:
        res.status(statusCode).json(JpdResponse.error(isDev ? message : ERROR.genericError));
        return;
    }
    /**
     * Case 2 : handle Axios specific errors
     */
  } else if (axios.isAxiosError(err) && err.response) {
    statusCode = err.response.status;
    message = err.response.data?.error || ERROR.genericError;
    res.status(statusCode).json(JpdResponse.error(message));
    return;
    /**
     * Case 3 : handle Prisma specific errors (`PrismaClientKnownRequestError`)
     */
  } else if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': // Violation d'unicité
        statusCode = 409;
        message = ERROR.resourceAlreadyExists;
        break;
      case 'P2025': // Ressource inexistante
        statusCode = 404;
        message = isDev ? ERROR.resourceNotFound : ERROR.genericError;
        break;
      case 'P2003': // Violation de clé étrangère
        statusCode = 409;
        message = ERROR.foreignKeyConstraintFailed;
        break;
      default:
        console.error('Unhandled Prisma Error:', err);
        message = isDev ? (err.message as ErrorMessage) : ERROR.internalServerError;
        break;
    }
    /**
     * Case 4 : handle Prisma validation errors (`PrismaClientValidationError`)
     */
  } else if (err instanceof PrismaClientValidationError) {
    statusCode = 400;
    message = ERROR.invalidDataFormat;
    /**
     * Case 5 : handle unknown errors or unexpected errors
     */
  } else if (err instanceof Error) {
    console.error('Unknown Error:', err);
    if (!isDev) {
      console.error({
        name: err.name,
        message: err.message,
        stack: err.stack,
      });
    }
    message = isDev ? (err.message as ErrorMessage) : ERROR.genericError;
  }
  /**
   * Send the formatted response
   */
  res.status(statusCode).json(JpdResponse.error(message));
};