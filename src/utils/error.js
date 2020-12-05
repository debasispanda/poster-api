class AppError extends Error {
  constructor(error = "Internal Server Error", statusCode) {
    if (error instanceof Error) {
      error = AppError.formatError(error);
    }

    super(error);

    this.statusCode = statusCode;
  }

  static formatError(error) {
    const { message } = error || { message: "Internal Server Error" };
    return message;
  }
}

class BadRequestError extends AppError {
  constructor(message = "Bad Request!") {
    super(message, 400);
  }
}

class AuthError extends AppError {
  constructor(message = "Authentication Failed!") {
    super(message, 401);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Not Found!") {
    super(message, 404);
  }
}

class ServerError extends AppError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}

module.exports = { BadRequestError, AuthError, NotFoundError, ServerError };
