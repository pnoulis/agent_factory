/*
  Errors levels:

  error (loglevel = error):
  Indicates an error that is not part of the application's normal flow nor is it expected.

  warn (loglevel = warn):
  Indicates an error that is not part of the application's normal flow but is expected.

  info (loglevel = informational):
  Indicates an error that is part of the application's normal flow. Such errors
  are thrown by design and are intended to be consumed by the Entities.

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

function createAPIReqErr(validationErrors) {
  return createError(
    "warn",
    "Invalid API request",
    ERR_CODES.EINVALID,
    "EINVALID",
    validationErrors,
  );
}

function createAPIResErr(validationErrors) {
  return createError(
    "error",
    "Invalid API Response",
    ERR_CODES.EINVALID,
    "EINVALID",
    validationErrors,
  );
}

export { createUnexpectedErr, createAPIReqErr, createAPIResErr };
