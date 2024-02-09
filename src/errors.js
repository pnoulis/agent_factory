import { isObject } from "js_utils/misc";
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
  EPACKAGE_STATE: 12,
};

function _createError(msg, defaults) {
  msg ||= {};
  defaults ||= {};
  const err = new Error();

  err.code = defaults.errCode;
  err.label = Object.entries(ERR_CODES)
    .find(([k, v]) => v === defaults.errCode)
    ?.at(0);

  if (!err.label) {
    throw new Error("Goodness gracious, you couldn't even get that right", {
      cause: defaults,
    });
  } else if (typeof msg === "string") {
    err.message = msg;
  } else if (isObject(msg)) {
    const { msg: _msg, severity, ...cause } = msg;
    err.message = _msg;
    err.severity = severity;
    err.cause = cause;
  }

  err.message ||= defaults.msg;
  err.severity ||= defaults.severity;

  return err;
}

const createError = (cb) =>
  cb(
    (() => ({
      EWRISTBAND: (msg) =>
        _createError(msg, {
          severity: "error",
          msg: "Wristband Error",
          errCode: ERR_CODES.EWRISTBAND_STATE,
        }),
      EPLAYER: (msg) =>
        _createError(msg, {
          severity: "error",
          msg: "Player Error",
          errCode: ERR_CODES.EPLAYER_STATE,
        }),
      EPACKAGE: (msg) =>
        _createError(msg, {
          severity: "error",
          msg: "Package Error",
          errCode: ERR_CODES.EPLAYER_STATE,
        }),
    }))(),
  );

globalThis.createError = createError;

// function createUnexpectedErr({ ...props } = {}) {
//   return createError(
//     props.severity || "error",
//     props.msg || "Unexpected error",
//     props.errCode ?? ERR_CODES.EUNEXPECTED,
//     { ...props },
//   );
// }

// function createValidationErr({ validationErrors, ...props } = {}) {
//   return createError(
//     props.severity || "warn",
//     props.msg || "Validation error",
//     props.errCode ?? ERR_CODES.EINVALID,
//     { validationErrors, ...props },
//   );
// }

// function createCacheErr({ cache, key, ...props } = {}) {
//   return createError(
//     props.severity || "error",
//     props.msg || `Missing key: '${key}' from cache: '${cache}'`,
//     props.errCode ?? ERR_CODES.ECACHE,
//     { cache, key, ...props },
//   );
// }

// function createStateErr({ state, ...props } = {}) {
//   return createError(
//     props.severity || "warn",
//     props.msg || "State error",
//     props.errCode ?? ERR_CODES.ESTATE,
//     { state, ...props },
//   );
// }

export {
  // createError,
  // createUnexpectedErr,
  // createValidationErr,
  // createStateErr,
  // createCacheErr,
  // ERR_CODES,
  createError,
};
