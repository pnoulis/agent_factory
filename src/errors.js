/*
  Errors levels:

  fatal (loglevel = fatal):
  Indicates an error that should cause the application to shutdown.

  error (loglevel = error):
  Indicates an unexpected error.

  warn (loglevel = warn):
  Indicates an expected error.

  info (loglevel = informational):
  Indicates an error that is part of the application's normal flow. Such errors
  are thrown by design and are intended to be consumed by clients.

 */

const ERR_CODES = {
  EUNEXPECTED: 0,
  EINVALID: 1,
};

function createError(level, msg, code, label, cause) {
  const err = new Error(msg, { cause });
  err.code = code;
  err.label = label;
  err.level = level;
  return err;
}

function createUnexpectedErr(cause) {
  return createError(
    "error",
    "Unexpected error",
    ERR_CODES.EUNEXPECTED,
    "UNEXPECTED",
    cause,
  );
}

function createValidationErr(validationErrors, opts) {
  return createError(
    opts.level || "warn",
    opts.msg || "Validation error",
    ERR_CODES.EINVALID,
    "EINVALID",
    validationErrors,
  );
}

export { createUnexpectedErr, createValidationErr };
