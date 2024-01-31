import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("restartDevice", Command, "updateDevice");

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
      devicesAction: ctx.args.deviceId ? "RESTART" : "RESTART_ALL",
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
];
Command.onFailure = function () {
  const cmd = this;
  cmd.msg = `Failed to restarted device${cmd.req.deviceId ? "" : "s"}`;
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.msg = `Successfully restarted device${cmd.req.deviceId ? "" : "s"}`;
  cmd.resolve(cmd.raw.message);
};

export { Command as restartDevice };
