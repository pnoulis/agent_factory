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
Command.verb = "set device view";
Command.middleware = [
  async (ctx, next) => {
    ctx.req = {
      timestamp: ctx.t_start,
      deviceId: ctx.args.device.id,
      status: ctx.args.view,
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.adminScreen.updateScoreboardDeviceView(ctx.req);
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
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully updated Scoreboard Device view";
};

export { Command as updateScoreboardDeviceView };
