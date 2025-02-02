import { SuccessMessage } from "../types/successMessage";
import { ErrorMessage } from "../types/errorMessage";

export class ApiResponse<T = any> {
  public success: boolean;
  public message: SuccessMessage | ErrorMessage;
  public data: T | null;

  constructor(success: boolean, message: SuccessMessage | ErrorMessage, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data ?? null;
  }

  /**
   * Creates a success response.
   *
   * @param {SuccessMessage} message - A message describing the success (typed as SuccessMessage).
   * @param {T} [data] - An optional payload with additional data.
   * @returns {ApiResponse<T>} An ApiResponse object indicating success.
   */
  static success<T>(message: SuccessMessage, data?: T): ApiResponse<T> {
    return new ApiResponse<T>(true, message, data);
  }

  /**
   * Creates an error response.
   *
   * @param {ErrorMessage} message - A message describing the error (typed as ErrorMessage).
   * @param {T} [data] - An optional payload with additional information about the error.
   * @returns {ApiResponse<T>} An ApiResponse object indicating an error.
   */
  static error<T>(message: ErrorMessage, data?: T): ApiResponse<T> {
    return new ApiResponse<T>(false, message, data);
  }
}