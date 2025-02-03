/**
 * Predefined success messages as a constant object with auto-completion
 */
export const SUCCESS = {
  resourceRetrievedSuccessfully: "Resource retrieved successfully",
  resourceUpdatedSuccessfully: "Resource updated successfully",
  resourceValidatedSuccessfully: "Resource validated successfully",
  resourceCompletedSuccessfully: "Resource completed successfully",
  operationSucceeded: "Operation succeeded",
  userLoggedInSuccessfully: "User logged in successfully",
  userLoggedOutSuccessfully: "User logged out successfully",
  userRegisteredSuccessfully: "User registered successfully",
  profileUpdatedSuccessfully: "Profile updated successfully",
  resourceCreatedSuccessfully: "Resource created successfully",
  resourceDeletedSuccessfully: "Resource deleted successfully"
} as const;

// Definition of the SuccessMessage type based on the values of SUCCESS_MESSAGES
export type SuccessMessage = typeof SUCCESS[keyof typeof SUCCESS];