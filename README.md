# jpd-express-error

jpd-express-error is a library for Express.js that provides standardized error handling for microservices.

It includes:
	•	A middleware errorHandler to catch and format errors.
	•	An JpdError class to throw custom errors with HTTP status codes.
	•	A JpdResponse class to structure API responses.
	•	Built-in handling for Prisma errors (P2002, P2025, etc.).
	•	Dev/Prod distinction to return detailed messages in development and generic messages in production.


---


## Installation

```sh
npm install jpd-express-error
```


---


## Usage  

### Registering the errorHandler middleware

In your app.ts, add the errorHandler middleware after all routes: 


```ts
import express from "express";
import { errorHandler } from "jpd-express-error";
import router from "./routes";

const app = express();
app.use(express.json());

// Define routes
app.use("/api", router);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(3000, () => console.log("Server running"));
```


---


### Throwing a custom error (JpdError)

You can throw a custom business error inside a controller, service or model : 

```ts
import { JpdError, ERROR } from "jpd-express-error";

const getUser = async (req, res, next) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });

  if (!user) {
    throw new JpdError(ERROR.userNotFound, 404);
  }

  res.json({ success: true, data: user });
};
```


---


### Structuring API responses with JpdResponse

Use JpdResponse to format your API responses : 

```ts
import { JpdResponse, SUCCESS } from "jpd-express-error";

const createUser = async (req, res) => {
  const newUser = await prisma.user.create({ data: req.body });

  res.status(201).json(JpdResponse.success(SUCCESS.resourceCreatedSuccessfully, newUser));
};
```


---


### Available Messages


✅ Success Messages

```ts
import { SUCCESS } from "jpd-express-error";

SUCCESS.resourceRetrievedSuccessfully
SUCCESS.resourceUpdatedSuccessfully
SUCCESS.resourceValidatedSuccessfully
SUCCESS.resourceCompletedSuccessfully
SUCCESS.operationSucceeded
SUCCESS.userLoggedInSuccessfully successfully
SUCCESS.userLoggedOutSuccessfully successfully
SUCCESS.userRegisteredSuccessfully
SUCCESS.profileUpdatedSuccessfully
SUCCESS.resourceCreatedSuccessfully
SUCCESS.resourceDeletedSuccessfully"
```

❌ Error Messages

```ts
import { ERROR } from "jpd-express-error";

// 400 Bad Request
ERROR.errorLoggingOut:
ERROR.invalidRequest:
ERROR.missingRequiredFields:
ERROR.invalidDataFormat:
ERROR.invalidRequestFormat:
ERROR.unsupportedMediaType:
ERROR.tooManyParameters:
ERROR.invalidQueryParameters:
ERROR.cartCreationFailed:
// 401 Unauthorized
ERROR.unauthorized:
ERROR.invalidPassword:
ERROR.invalidToken:
ERROR.tokenExpired:
ERROR.missingToken:
ERROR.invalidCredentials:
// 403 Forbidden
ERROR.forbidden:
ERROR.insufficientPermissions:
ERROR.accessDenied:
// 404 Not Found
ERROR.userNotFound:
ERROR.resourceNotFound:
ERROR.cartNotFound:
ERROR.productNotFound:
// 409 Conflict
ERROR.userAlreadyExists:
ERROR.emailAlreadyInUse:
ERROR.resourceAlreadyExists:
ERROR.foreignKeyConstraintFailed:
// 422 Unprocessable Entity
ERROR.validationError:
ERROR.invalidEmailFormat:
ERROR.passwordTooWeak:
// 429 Too Many Requests
ERROR.tooManyRequests:
ERROR.rateLimitExceeded:
// 500 Internal Server Error
ERROR.internalServerError:
ERROR.databaseConnectionError:
ERROR.fileUploadError:
ERROR.fileDeletionError:
ERROR.fileReadError:
ERROR.fileWriteError:
```


---


### Customizing errors

You can add your own errors:

```ts
import { JpdError, ERROR } from "jpd-express-error";

// Adding a custom error
ERROR.customError = "Custom error message";

throw new JpdError(ERROR.customError, 400);
```


---


### Contributing

Feel free to open issues or contribute by submitting pull requests! 🚀


---


### License

This project is licensed under the ISC License.