import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { Device } from "#afm/device/Device.js";

new Task("listDevices", Command);

function Command(opts) {
  const afm = this;
  const promise = Command.createCommand(afm, (cmd) => {
    afm.runCommand(cmd);
  });
  return promise;
}
Command.middleware = [
  async (ctx, next) => {
    ctx.req = { timestamp: ctx.t_start };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.adminScreen.listDevices();
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.devices = ctx.raw.devices.map((device) => Device.normalize(device));
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to retrieve devices";
  cmd.reject(cmd);
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully retrieved devices";
  cmd.resolve(cmd);
};

export { Command as listDevices };
