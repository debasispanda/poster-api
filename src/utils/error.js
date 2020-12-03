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

module.exports = AppError;
