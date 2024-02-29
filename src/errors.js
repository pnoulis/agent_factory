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
  EVALIDATION: 1,
  EPLAYER: 2,
  EWRISTBAND: 3,
  EWRISTBAND_SCAN_LOCK: 4,
  EPACKAGE: 5,
  ETEAM: 6,
  EGENERIC: 7,
  EWRISTBAND_UNSUB: 8,
  UNSUB: 9,
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
    const { msg: _msg, severity, errCode, ...cause } = msg;
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
    ERR_CODES,
    EWRISTBAND: (msg) =>
      _createError(msg, {
        severity: "error",
        msg: "Wristband Error",
        errCode: ERR_CODES.EWRISTBAND,
      }),
    EPLAYER: (msg) =>
      _createError(msg, {
        severity: "error",
        msg: "Player Error",
        errCode: ERR_CODES.EPLAYER,
      }),
    EPACKAGE: (msg) =>
      _createError(msg, {
        severity: "error",
        msg: "Package Error",
        errCode: ERR_CODES.EPACKAGE,
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
    UNSUB: (msg) =>
      _createError(msg, {
        severity: "info",
        msg: "Unsubscribed",
        errCode: ERR_CODES.UNSUB,
      }),
  });
globalThis.craterr = craterr;
globalThis.ERR_CODES = ERR_CODES;
