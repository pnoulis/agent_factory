import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { Team } from "../team/Team.js";

new Task("registerGroupTeam", Command);

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
    (cmd) => afm.runCommand(cmd),
  );
  return promise;
}

Command.verb = "register group team";

Command.middleware = [
  (ctx, next) => {
    ctx.req = {
      timestamp: ctx.t_start,
      teamName: ctx.args.team.name,
      groupPlayers: ctx.args.team.roster.map((p) => ({
        username: p.username,
        wristbandNumber: p.wristband.id,
      })),
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.adminScreen.registerGroupTeam(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.team = Team.normalize(ctx.args.team, {
      state: "registered",
      player: { state: "inTeam" },
    });
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to register Group Team";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully registered Group Team";
};

export { Command as registerGroupTeam };
