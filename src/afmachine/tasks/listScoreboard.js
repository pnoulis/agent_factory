import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("listScoreboard", Command);

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
    ctx.raw = await ctx.afm.backend.listScoreboard();
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
];
Command.onFailure = function () {
  const cmd = this;
  cmd.msg = "Failed to retrieve Scoreboard";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.msg = "Successfully retrieved Scoreboard";
  cmd.resolve(cmd.raw);
};

export { Command as listScoreboard };
