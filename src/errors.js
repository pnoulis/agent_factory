/*
  Errors severity:

  fatal (log level = fatal):
  Indicates an error that should cause the application to shutdown.

  error (log level = error):
  Indicates an unexpected error.

  warn (log level = warn):
  Indicates an expected error.

  info (log level = informational):
  Indicates an error that is part of the application's normal flow. Such errors
  are thrown by design and are intended to be consumed by clients.

 */

const ERR_CODES = {
  EUNEXPECTED: 0,
  EINVALID: 1,
  ESTATE: 2,
  ECACHE: 3,
  ESTATEPAST: 4,
  EWRISTBAND_STATE: 5,
  EWRISTBAND_STATE_CANCELS_OUT: 6,
  EWRISTBAND_STATE_IMPOSSIBLE: 7,
  EWRISTBAND_SCAN_LOCK: 8,
  EPLAYER_STATE: 9,
  EPLAYER_STATE_CANCELS_OUT: 10,
  EPLAYER_STATE_IMPOSSIBLE: 11,
};

function createError(severity, msg, errCode, cause) {
  const errLabel = Object.keys(ERR_CODES).find((label, i) => i === errCode);

  if (errLabel === undefined) {
    const err = new Error(`Missing ERR_CODE: '${errCode}'`, {
      severity,
      msg,
      errCode,
      cause,
    });
    err.code = ERR_CODES.EUNEXPECTED;
    err.label = "UNEXPECTED";
    err.severity = "fatal";
    throw err;
  }

  const err = new Error(msg, { cause });
  err.code = errCode;
  err.label = errLabel;
  err.severity = severity;
  return err;
}

function createUnexpectedErr({ ...props } = {}) {
  return createError(
    props.severity || "error",
    props.msg || "Unexpected error",
    props.errCode ?? ERR_CODES.EUNEXPECTED,
    { ...props },
  );
}

function createValidationErr({ validationErrors, ...props } = {}) {
  return createError(
    props.severity || "warn",
    props.msg || "Validation error",
    props.errCode ?? ERR_CODES.EINVALID,
    { validationErrors, ...props },
  );
}

function createCacheErr({ cache, key, ...props } = {}) {
  return createError(
    props.severity || "error",
    props.msg || `Missing key: '${key}' from cache: '${cache}'`,
    props.errCode ?? ERR_CODES.ECACHE,
    { cache, key, ...props },
  );
}

function createStateErr({ state, ...props } = {}) {
  return createError(
    props.severity || "warn",
    props.msg || "State error",
    props.errCode ?? ERR_CODES.ESTATE,
    { state, ...props },
  );
}

export {
  createError,
  createUnexpectedErr,
  createValidationErr,
  createStateErr,
  createCacheErr,
  ERR_CODES,
};
