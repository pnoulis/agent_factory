import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { Wristband } from "../wristband/Wristband.js";

new Task("getWristbandInfo", Command);

function Command(wristband, opts) {
  const afm = this || Command.afm;
  const promise = Command.createCommand(
    afm,
    {
      args: {
        wristband,
      },
      opts,
    },
    (cmd) => afm.runCommand(cmd),
  );
  return promise;
}

Command.verb = "get wristband info";
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
    ctx.raw = await ctx.afm.adminScreen.getWristbandInfo(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  async (ctx, next) => {
    ctx.res.wristband = Wristband.normalize(ctx.raw.wristband);
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to retrieve Wristband information";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully retrieved Wristband information";
};

export { Command as getWristbandInfo };
