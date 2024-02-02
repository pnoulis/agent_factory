import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { normalize as normalizeWristband } from "../wristband/normalize.js";

new Task("getWristbandInfo", Command);

function Command(wristband, opts) {
  const afm = this;
  const promise = Command.createCommand(
    afm,
    {
      args: {
        wristband: "tobject" in wristband ? wristband.tobject() : wristband,
      },
      opts,
    },
    (cmd) => {
      afm.runCommand(cmd);
    },
  );
  return promise;
}

Command.middleware = [
  attachBackendRegistrationRouteInfo,
  async (ctx, next) => {
    ctx.req = {
      timestamp: ctx.t_start,
      wristbandNumber: ctx.args.wristband.id,
    };
    return next();
  },
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.getWristbandInfo(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  async (ctx, next) => {
    ctx.res.wristband = normalizeWristband(
      ctx.args.wristband,
      ctx.raw.wristband,
    );
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to retrieve Wristband information";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully retrieved Wristband information";
  cmd.resolve(cmd.res);
};

export { Command as getWristbandInfo };
