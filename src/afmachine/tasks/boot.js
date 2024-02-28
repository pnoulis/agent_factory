import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("boot", Command);

function Command(opts) {
  const afm = this || Command.afm;
  const promise = Command.createCommand(
    afm,
    {
      opts,
    },
    (cmd) => afm.runCommand(cmd),
  );
  return promise;
}

Command.verb = "boot agent factory";
Command.middleware = [
  async (ctx, next) => {
    ctx.args.device = ctx.opts.rpiReader
      ? ctx.afm.rpiReader
      : ctx.afm.adminScreen;
    ctx.req = {
      timestamp: ctx.t_start,
      deviceId: ctx.args.device.id,
      deviceType: ctx.args.device.type,
      roomName: ctx.args.device.room,
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.adminScreen.boot(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = `Failed to start Agent Factory`;
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = `Successfully started Agent Factory`;
};

export { Command as boot };
