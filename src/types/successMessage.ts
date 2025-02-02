export type SuccessMessage =
  // 200 OK
  | 'Resource retrieved successfully'
  | 'Resource updated successfully'
  | 'Resource validated successfully'
  | 'Resource completed successfully'
  | 'Operation succeeded'
  | 'User logged in successfully'
  | 'User logged out successfully'
  | 'User registered successfully'
  | 'Profile updated successfully'

  // 201 Created
  | 'Resource created successfully'

  // 204 No Content
  | 'Resource deleted successfully';



/**
 * Predefined success messages as a constant object with auto-completion
 */
export const SUCCESS_MESSAGES: Record<SuccessMessage, string> = {
  "Resource retrieved successfully": "Resource retrieved successfully.",
  "Resource updated successfully": "Resource updated successfully.",
  "Resource validated successfully": "Resource validated successfully.",
  "Resource completed successfully": "Resource completed successfully.",
  "Operation succeeded": "The operation was successful.",
  "User logged in successfully": "User logged in successfully.",
  "User logged out successfully": "User logged out successfully.",
  "User registered successfully": "User registered successfully.",
  "Profile updated successfully": "Profile updated successfully.",
  "Resource created successfully": "Resource created successfully.",
  "Resource deleted successfully": "Resource deleted successfully."
};