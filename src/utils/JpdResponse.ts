import { SuccessMessage } from "../types/successMessage";
import { ErrorMessage } from "../types/errorMessage";

export class JpdResponse<T = any> {
  public success: boolean;
  public message: SuccessMessage | ErrorMessage;
  public data: T | null;



  /**
   * Constructor for the JpdResponse class.
   *
   * @param {boolean} success - Indicates if the operation was successful.
   * @param {SuccessMessage | ErrorMessage} message - A message describing the operation.
   * @param {T} [data] - Optional data to be included in the response.
   */

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
   * @returns {JpdResponse<T>} A JpdResponse object indicating success.
   */
  static success<T>(message: SuccessMessage, data?: T): JpdResponse<T> {
    return new JpdResponse<T>(true, message, data);
  }



  /**
   * Creates an error response.
   *
   * @param {ErrorMessage} message - A message describing the error (typed as ErrorMessage).
   * @param {T} [data] - An optional payload with additional information about the error.
   * @returns {JpdResponse<T>} A JpdResponse object indicating an error.
   */
  static error<T>(message: ErrorMessage, data?: T): JpdResponse<T> {
    return new JpdResponse<T>(false, message, data);
  }
}