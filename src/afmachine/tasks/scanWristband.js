import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { Wristband } from "../wristband/Wristband.js";
import { createError, ERR_CODES } from "../../errors.js";

new Task("scanWristband", Command);

let SCAN_WRISTBAND_LOCK = false;

function Command(unsubcb, opts) {
  const afm = this;
  const promise = Command.createCommand(
    afm,
    { args: { unsubcb, scanLock: !SCAN_WRISTBAND_LOCK }, opts },
    (cmd) => {
      afm.runCommand(cmd);
    },
  );
  SCAN_WRISTBAND_LOCK = true;
  return promise;
}

Command.middleware = [
  async (ctx, next) => {
    if (!ctx.args.scanLock) {
      throw createError(
        "warn",
        "Wristband scan is busy",
        ERR_CODES.EWRISTBAND_SCAN_LOCK,
        { SCAN_WRISTBAND_LOCK },
      );
    }
    try {
      await next();
    } finally {
      if (ctx.args.scanLock) {
        SCAN_WRISTBAND_LOCK = false;
      }
    }
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.scanWristband(ctx.args.unsubcb);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  async (ctx, next) => {
    ctx.res.wristband = Wristband.normalize(ctx.raw.wristband);
    ctx.res.unsubed = ctx.raw.unsubed;
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.msg = "Failed to scan wristband";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.msg = "Successfully scanned wristband";
  cmd.resolve(cmd.res);
};

export { Command as scanWristband };
