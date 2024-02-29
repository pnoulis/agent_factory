import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("restartDevice", Command, "updateDevice");

function Command(device, opts) {
  const afm = this;
  const promise = Command.createCommand(
    afm,
    {
      args: { device },
      opts,
    },
    (cmd) => {
      afm.runCommand(cmd);
    },
  );
  return promise;
}
Command.verb = "restart device";
Command.middleware = [
  async (ctx, next) => {
    ctx.req = {
      timestamp: ctx.t_start,
      deviceId: ctx.args.device?.id ?? "",
      devicesAction: ctx.args.device?.id ? "RESTART" : "RESTART_ALL",
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.adminScreen.updateDevice(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.device = ctx.args.device;
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.res.msg = `Failed to restart ${cmd.req.deviceId ? "device" : "all devices"}`;
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.res.msg = `Successfully restarted ${
    cmd.req.deviceId ? "device" : "all devices"
  }`;
};

export { Command as restartDevice };
