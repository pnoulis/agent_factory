import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("updateScoreboardDeviceView", Command);

function Command(device, view, opts) {
  const afm = this;
  const promise = Command.createCommand(
    afm,
    { args: { device, view }, opts },
    (cmd) => {
      afm.runCommand(cmd);
    },
  );
  return promise;
}
Command.middleware = [
  async (ctx, next) => {
    ctx.req = {
      timestamp: ctx.t_start,
      deviceId: ctx.args.device.deviceId,
      status: ctx.args.view,
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.updateScoreboardDeviceView(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.device = { ...ctx.args.device, view: ctx.args.view };
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to update Scoreboard Device view";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully updated Scoreboard Device view";
  cmd.resolve(cmd.res);
};

export { Command as updateScoreboardDeviceView };
