import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { normalize as normalizeWristband } from "../wristband/normalize.js";

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
    if (SCAN_WRISTBAND_LOCK !== ctx.args.scanLock) {
      throw globalThis.createError(({ EWRISTBAND }) =>
        EWRISTBAND("Wristband scan is busy"),
      );
    }
    try {
      await next();
    } finally {
      SCAN_WRISTBAND_LOCK = false;
    }
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.scanWristband(ctx.args.unsubcb);
    // Mqtt Wrapper library added property
    ctx.res.unsubed = ctx.raw.unsubed;
    ctx.raw = ctx.raw.wristband;
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  async (ctx, next) => {
    ctx.res.wristband = normalizeWristband(ctx.raw);
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to scan Wristband";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully scanned Wristband";
  cmd.resolve(cmd.res);
};

export { Command as scanWristband };
