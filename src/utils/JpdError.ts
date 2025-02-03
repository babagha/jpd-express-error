import { ERROR, ErrorMessage } from '../types/errorMessage';

export class JpdError extends Error {
  public readonly statusCode: number;
  public readonly errorMessage: ErrorMessage;

  /**
   * Creates an instance of JpdError.
   *
   * @param {ErrorMessage} errorMessage - The predefined error message.
   * @param {number} [statusCode] - Optional HTTP status code. If not provided, a default value is determined based on the error message.
   */
  constructor(errorMessage: ErrorMessage, statusCode?: number) {
    super(errorMessage);
    this.errorMessage = errorMessage;
    this.statusCode = statusCode || JpdError.getDefaultStatusCode(errorMessage);
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
      case ERROR.errorLoggingOut:
      case ERROR.invalidRequest:
      case ERROR.missingRequiredFields:
      case ERROR.invalidDataFormat:
      case ERROR.invalidRequestFormat:
      case ERROR.unsupportedMediaType:
      case ERROR.tooManyParameters:
      case ERROR.invalidQueryParameters:
      case ERROR.cartCreationFailed:
        return 400;

      // 401 Unauthorized
      case ERROR.unauthorized:
      case ERROR.invalidPassword:
      case ERROR.invalidToken:
      case ERROR.tokenExpired:
      case ERROR.missingToken:
      case ERROR.invalidCredentials:
        return 401;

      // 403 Forbidden
      case ERROR.forbidden:
      case ERROR.insufficientPermissions:
      case ERROR.accessDenied:
        return 403;

      // 404 Not Found
      case ERROR.userNotFound:
      case ERROR.resourceNotFound:
      case ERROR.cartNotFound:
      case ERROR.productNotFound:
        return 404;

      // 409 Conflict
      case ERROR.userAlreadyExists:
      case ERROR.emailAlreadyInUse:
      case ERROR.resourceAlreadyExists:
      case ERROR.foreignKeyConstraintFailed:
        return 409;

      // 422 Unprocessable Entity
      case ERROR.validationError:
      case ERROR.invalidEmailFormat:
      case ERROR.passwordTooWeak:
        return 422;

      // 429 Too Many Requests
      case ERROR.tooManyRequests:
      case ERROR.rateLimitExceeded:
        return 429;

      // 500 Internal Server Error
      case ERROR.internalServerError:
      case ERROR.databaseConnectionError:
      case ERROR.fileUploadError:
      case ERROR.fileDeletionError:
      case ERROR.fileReadError:
      case ERROR.fileWriteError:
      case ERROR.genericError:
      default:
        return 500;
    }
  }
}