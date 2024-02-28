import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("listScoreboard", Command);

function Command(opts) {
  const afm = this || Command.afm;
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
    ctx.raw = await ctx.afm.adminScreen.listScoreboard();
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.scoreboard = {
      roomElementAssociations: ctx.raw.roomElementAssociations,
      live: ctx.raw.live,
      teamAllTime: ctx.raw.teamAllTime,
      teamMonthly: ctx.raw.teamMonthly,
      teamWeekly: ctx.raw.teamWeekly,
      teamDaily: ctx.raw.teamDaily,
      perRoom: ctx.raw.perRoom,
      perElement: ctx.raw.perElement,
    };
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to retrieve Scoreboard";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully retrieved Scoreboard";
};

export { Command as listScoreboard };
