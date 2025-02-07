/**
 * Predefined error messages as a constant object with auto-completion
 */
export const ERROR = {
  errorLoggingOut: "Error logging out",
  invalidRequest: "Invalid request",
  missingRequiredFields: "Missing required fields",
  invalidDataFormat: "Invalid data format",
  invalidRequestFormat: "Invalid request format",
  unsupportedMediaType: "Unsupported media type",
  tooManyParameters: "Too many parameters",
  invalidQueryParameters: "Invalid query parameters",
  cartCreationFailed: "Cart creation failed",
  unauthorized: "Unauthorized",
  invalidPassword: "Invalid password",
  invalidToken: "Invalid token",
  tokenExpired: "Token expired",
  missingToken: "Missing token",
  invalidCredentials: "Invalid credentials",
  forbidden: "Forbidden",
  insufficientPermissions: "Insufficient permissions",
  accessDenied: "Access denied",
  resourceNotFound: "Resource not found",
  userNotFound: "User not found",
  cartNotFound: "Cart not found",
  productNotFound: "Product not found",
  userAlreadyExists: "User already exists",
  emailAlreadyInUse: "Email already in use",
  resourceAlreadyExists: "Resource already exists",
  foreignKeyConstraintFailed: "Foreign key constraint failed",
  validationError: "Validation error",
  passwordMismatch: "Password mismatch",
  invalidEmailFormat: "Invalid email format",
  passwordTooWeak: "Password too weak",
  tooManyRequests: "Too many requests",
  rateLimitExceeded: "Rate limit exceeded",
  internalServerError: "Internal server error",
  databaseConnectionError: "Database connection error",
  fileUploadError: "File upload error",
  fileDeletionError: "File deletion error",
  fileReadError: "File read error",
  fileWriteError: "File write error",
  genericError: "An error occurred while processing your request"
} as const;

/**
 * Definition of the ErrorMessage type based on the values of ERROR
 */
export type ErrorMessage = typeof ERROR[keyof typeof ERROR];