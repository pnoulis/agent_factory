import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { Wristband } from "../wristband/Wristband.js";

new Task("scanWristband", Command);

let SCAN_WRISTBAND_LOCK = false;

function Command(unsubcb, opts) {
  const afm = this || Command.afm;
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

Command.verb = "scan wristband";

Command.middleware = [
  async (ctx, next) => {
    if (SCAN_WRISTBAND_LOCK !== ctx.args.scanLock) {
      throw globalThis.craterr(({ ERR_CODES, EWRISTBAND }) =>
        EWRISTBAND({
          msg: "Wristband scan is busy",
          errCode: ERR_CODES.EWRISTBAND_SCAN_LOCK,
        }),
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
    ctx.raw = await ctx.afm.adminScreen.scanWristband(ctx.args.unsubcb);
    if (ctx.raw.unsubed) {
      throw craterr(({ ERR_CODES, EWRISTBAND }) =>
        EWRISTBAND({
          msg: "Unsubscribed",
          errCode: ERR_CODES.UNSUB,
        }),
      );
    }
    ctx.raw = ctx.raw.wristband;
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  async (ctx, next) => {
    ctx.res.wristband = Wristband.normalize(ctx.raw);
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.res.msg = "Failed to scan Wristband";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.res.msg = "Successfully scanned Wristband";
};

export { Command as scanWristband };
