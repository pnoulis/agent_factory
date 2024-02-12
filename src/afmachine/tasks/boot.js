import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("boot", Command);

function Command(device, opts) {
  const afm = this;
  const promise = Command.createCommand(
    afm,
    {
      args: { device },
      opts,
    },
    (cmd) => afm.runCommand(cmd),
  );
  return promise;
}

Command.middleware = [
  async (ctx, next) => {
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
  cmd.msg = `Failed to boot Device`;
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = `Successfully booted Device`;
  cmd.resolve(cmd.res);
};

export { Command as boot };
