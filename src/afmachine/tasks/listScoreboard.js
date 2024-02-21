import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("listScoreboard", Command);

function Command(opts) {
  const afm = this;
  const promise = Command.createCommand(afm, { opts }, (cmd) => {
    afm.runCommand(cmd);
  });
  return promise;
}
Command.verb = "list scoreboard";
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
  (ctx, next) => {
    ctx.res.roomElementAssociations = ctx.raw.roomElementAssociations;
    ctx.res.live = ctx.raw.live;
    ctx.res.teamAllTime = ctx.raw.teamAllTime;
    ctx.res.teamMonthly = ctx.raw.teamMonthly;
    ctx.res.teamWeekly = ctx.raw.teamWeekly;
    ctx.res.teamDaily = ctx.raw.teamDaily;
    ctx.res.perRoom = ctx.raw.perRoom;
    ctx.res.perElement = ctx.raw.perElement;
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to retrieve Scoreboard";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully retrieved Scoreboard";
  cmd.resolve(cmd.res);
};

export { Command as listScoreboard };
