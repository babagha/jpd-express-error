import { NextFunction, Request, Response } from 'express';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { ERROR, ErrorMessage } from '../types/errorMessage';
import { JpdError } from '../utils/JpdError';
import { JpdResponse } from '../utils/JpdResponse';
import axios from 'axios';
import { ZodError } from "zod";

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
   * Axios specific errors
   */
  if (axios.isAxiosError(err) && err.response) {
    statusCode = err.response.status;
    message = err.response.data?.error || ERROR.genericError;
    res.status(statusCode).json(JpdResponse.error(message));
    return;
  }



  /**
   * SyntaxError (e.g., JSON parsing errors)
   */
  if (err instanceof SyntaxError) {
    statusCode = 400;
    message = ERROR.invalidRequest;
    res.status(statusCode).json(JpdResponse.error(message));
    return;
  }



  /**
   * TypeError (e.g., accessing undefined properties)
   */
  if (err instanceof TypeError) {
    statusCode = 400;
    message = ERROR.invalidRequest;
    res.status(statusCode).json(JpdResponse.error(message));
    return;
  }



  /**
   * Prisma specific errors (`PrismaClientKnownRequestError`)
   */
  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': // Unique constraint failed
        statusCode = 409;
        message = ERROR.resourceAlreadyExists;
        break;
      case 'P2016': // Record does not exist
        statusCode = 404;
        message = ERROR.resourceNotFound;
        break;
      case 'P2025': // Record not found
        statusCode = 404;
        message = ERROR.resourceNotFound;
        break;
      case 'P2003': // Foreign key constraint failed
        statusCode = 409;
        message = ERROR.foreignKeyConstraintFailed;
        break;
      case 'P2014': // Cascade delete constraint failed
        statusCode = 409;
        message = ERROR.cascadeDeleteConstraintFailed;
        break;
      case 'P2019': // Input error (ex: type incorrect en entrée)
        statusCode = 400;
        message = ERROR.invalidDataFormat;
        break;
      case 'P2000': // Value too long for a field
        statusCode = 400;
        message = ERROR.valueTooLong;
        break;
      case 'P2015': // Relation constraint failure
        statusCode = 400;
        message = ERROR.invalidRelationConstraint;
        break;
      case 'P2020': // Value out of range
        statusCode = 400;
        message = ERROR.valueOutOfRange;
        break;
      case 'P2034': // Constraint violation on delete
        statusCode = 409;
        message = ERROR.constraintViolation;
        break;
      default:
        console.error('Unhandled Prisma Error:', err);
        message = isDev ? (err.message as ErrorMessage) : ERROR.internalServerError;
        break;
    }
    res.status(statusCode).json(JpdResponse.error(message));
    return;
  }



  /**
   * Zod validation errors
   */
  if (err instanceof ZodError) {
    res.status(400).json(JpdResponse.error(isDev ? ERROR.invalidDataFormat : ERROR.genericError));
    return;
  }



  /**
   * Custom `JpdError`
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
      case ERROR.fileAlreadyExists:
      case ERROR.foreignKeyConstraintFailed:
        res.status(409).json(JpdResponse.error(isDev ? err.message as ErrorMessage : ERROR.resourceAlreadyExists));
        return;

      // 413 Payload Too Large
      case ERROR.fileTooLarge:
        res.status(413).json(JpdResponse.error(isDev ? err.message as ErrorMessage : ERROR.fileTooLarge));
        return;

      // 422 Unprocessable Entity
      case ERROR.validationError:
      case ERROR.invalidEmailFormat:
      case ERROR.passwordMismatch:
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
  }

  /**
   * Check if the error already has a `statusCode` before using 500
   */
  if (typeof err === 'object' && err !== null && 'statusCode' in err) {
    statusCode = (err as any).statusCode || 500;
  }

  /**
   * Send the formatted response
   */
  res.status(statusCode).json(JpdResponse.error(message));
};