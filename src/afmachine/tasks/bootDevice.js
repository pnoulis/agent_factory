import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("bootDevice", Command, "updateDevice");

function Command(deviceId, opts) {
  const afm = this;
  const promise = Command.createCommand(
    afm,
    {
      args: { deviceId },
      opts,
    },
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
      deviceId: ctx.args.deviceId ?? "",
      devicesAction: ctx.args.deviceId ? "WAKE_UP" : "WAKEUP_ALL",
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.updateDevice(ctx.req);
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
  cmd.msg = `Failed to boot device${cmd.req.deviceId ? "" : "s"}`;
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = `Successfully booted device${cmd.req.deviceId ? "" : "s"}`;
  cmd.resolve(cmd.res);
};

export { Command as bootDevice };
