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
  | 'Resource deleted successfully'