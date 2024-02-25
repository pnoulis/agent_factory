import { isObject, isFunction } from "js_utils/misc";
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
  EVALIDATION: 1,
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
  EUNKNOWN: 13,
  EGENERIC: 14,
  ETEAM: 15,
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

const craterr = (cb) =>
  cb({
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
    ETEAM: (msg) =>
      _createError(msg, {
        severity: "error",
        msg: "Team Error",
        errCode: ERR_CODES.ETEAM,
      }),
    EVALIDATION: (msg) =>
      _createError(msg, {
        severity: "warn",
        msg: "Validation Error",
        errCode: ERR_CODES.EVALIDATION,
      }),
    EGENERIC: (msg) =>
      _createError(msg, {
        severity: "error",
        msg: "Generic Error",
        errCode: ERR_CODES.EGENERIC,
      }),
  });
globalThis.craterr = craterr;
globalThis.ERR_CODES = ERR_CODES;
