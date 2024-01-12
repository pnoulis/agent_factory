function createValidationError(msg, validationErrors) {
  const err = new Error(msg || "Invalid API request");
  err.validationsErrors = validationErrors;
  err.statusCode = 400;
  err.statusLabel = "Bad request";
  return err;
}

function createBackendError(msg, validationErrors) {
  const err = new Error(msg || "Invalid backend API response");
  err.validationsErrors = validationErrors;
  err.statusCode = 500;
  err.statusLabel = "Internal server error";
  return err;
}

export { createValidationError, createBackendError };
