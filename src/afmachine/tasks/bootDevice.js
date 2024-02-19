import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("bootDevice", Command, "updateDevice");

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
Command.verb = "boot device";
Command.middleware = [
  async (ctx, next) => {
    ctx.req = {
      timestamp: ctx.t_start,
      deviceId: ctx.args.device?.id ?? "",
      devicesAction: ctx.args.device?.id ? "WAKE_UP" : "WAKEUP_ALL",
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
    ctx.res.device = null;
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = `Failed to boot ${cmd.req.deviceId ? "device" : "all devices"}`;
  cmd.reject(cmd);
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = `Successfully booted ${
    cmd.req.deviceId ? "device" : "all devices"
  }`;
  cmd.resolve(cmd);
};

export { Command as bootDevice };
