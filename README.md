# jpd-express-error

**jpd-express-error** is a lightweight utility package designed to standardize error handling in Express microservices.  
It ensures consistent error responses, typed messages, and structured error propagation across your services.


---


## Features
- **Typed Messages** → Success and error messages are strongly typed for better maintainability.
- **Standardized API Responses** → Ensures uniform response structures across all services.
- **Custom Error Handling** → Provides a centralized `AppError` class for better error propagation.
- **Express & Microservices-Friendly** → Built to simplify error management in Express applications.


---


## Installation

```sh
npm install jpd-express-error
```


---


## Usage  

### Handling success responses or throw an error

Use `ApiResponse.success()` to return a standardized success response. 
Use `handleError();` to return a standardized error response.   


```ts
/*
  Controller
*/

import { Request, Response } from 'express';
import { handleError, ApiResponse, AppError } from 'jpd-express-error';
import { createUserService } from '@/services/userService';

import { Request, Response } from 'express';
import { handleError, ApiResponse, AppError } from 'jpd-express-error';
import { createUserService } from '@/services/userService';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new AppError('Missing required fields', 400);
    }

    const userData = { name, email, password };
    const user = await createUserService(userData);

    // Send a standardized success response
    res.status(201).json(ApiResponse.success('User created successfully', user));
  } catch (error: any) {
    handleError(error, res);
  }
};

```


### Throwing Errors from Database Models  

When an error occurs in the database, use `AppError` to propagate it to the service or controller.  
The controller will catch the error and format it correctly using `handleError()`.  

#### Example: Throwing an error in a database model  
```ts
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError } from 'jpd-express-error';

export const store = async (data: Omit<User, "id">): Promise<User> => {
  try {
    // 1️⃣ Create the resource in the database
    const response = await prisma.user.create(data);
    return response;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new AppError('Resource already exists');
      }
    }
    throw error;
  }
};
```


---


Available Messages


✅ Success Messages
	•	Resource retrieved successfully
	•	Resource updated successfully
	•	Resource validated successfully
	•	Resource completed successfully
	•	Operation succeeded
	•	User logged in successfully
	•	User logged out successfully
	•	User registered successfully
	•	Profile updated successfully
	•	Resource created successfully
	•	Resource deleted successfully


❌ Error Messages
	•	Error logging out
	•	Invalid request
	•	Missing required fields
	•	Invalid data format
	•	Invalid request format
	•	Unsupported media type
	•	Too many parameters
	•	Invalid query parameters
	•	Cart creation failed
	•	Unauthorized
	•	Invalid password
	•	Invalid token
	•	Token expired
	•	Missing token
	•	Invalid credentials
	•	Forbidden
	•	Insufficient permissions
	•	Access denied
	•	Resource not found
	•	User not found
	•	Cart not found
	•	Product not found
	•	User already exists
	•	Email already in use
	•	Resource already exists
	•	Foreign key constraint failed
	•	Validation error
	•	Invalid email format
	•	Password too weak
	•	Too many requests
	•	Rate limit exceeded
	•	Internal server error
	•	Database connection error
	•	File upload error
	•	File deletion error
	•	File read error
	•	File write error
	•	An error occurred while processing your request


---


Prisma-Specific Errors

When working with Prisma, you might encounter specific error codes.
These errors can be caught and handled using AppError for proper error propagation.

	•	P2002 → Unique constraint failed (e.g., trying to insert a duplicate email).
	•	P2003 → Foreign key constraint failed (e.g., trying to delete a referenced record).
	•	P2025 → Record not found (e.g., trying to update or delete a record that does not exist).
	•	P2014 → Nested delete or disconnect is not allowed if parent record is required.
	•	P2016 → Query interpretation error (e.g., invalid field or relation used in query).
	•	P2017 → Related record not found (e.g., relation inconsistency).
	•	P2018 → Required connected records not found.
	•	P2022 → Database constraint violation (e.g., check constraint failed).
	•	P2023 → Invalid database input (e.g., sending incorrect values).
	•	P2024 → Database connection timeout or issues with the database server.


---


Contributing

Feel free to open issues or contribute by submitting pull requests! 🚀


---


License

This project is licensed under the ISC License.