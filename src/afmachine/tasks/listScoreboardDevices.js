import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("listScoreboardDevices", Command);

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
    ctx.raw = await ctx.afm.backend.listScoreboardDevices();
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.scoreboardDevices = ctx.raw.scoreboardDevices;
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.msg = "Failed to retrieve scoreboard devices";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.msg = "Successfully retrieved scoreboard devices";
  cmd.resolve(cmd.res);
};

export { Command as listScoreboardDevices };
