import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { Team } from "../team/Team.js";

new Task("startTeam", Command);

function Command(team, opts) {
  const afm = this || Command.afm;
  const promise = Command.createCommand(
    afm,
    {
      args: {
        team,
      },
      opts,
    },
    (cmd) => {
      afm.runCommand(cmd);
    },
  );
  return promise;
}

Command.verb = "start team";

Command.middleware = [
  (ctx, next) => {
    ctx.req = {
      timestamp: ctx.t_start,
      teamName: ctx.args.team.name,
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.adminScreen.startTeam(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.team = Team.normalize(ctx.raw.team);
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to activate Team";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully activated Team";
};

export { Command as startTeam };
