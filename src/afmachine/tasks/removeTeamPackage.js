import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { Team } from "../team/Team.js";

new Task("removeTeamPackage", Command);

function Command(team, pkg, opts) {
  const afm = this || Command.afm;
  const promise = Command.createCommand(
    afm,
    {
      args: {
        team,
        pkg,
      },
      opts,
    },
    (cmd) => {
      afm.runCommand(cmd);
    },
  );
  return promise;
}

Command.verb = "remove team package";

Command.middleware = [
  (ctx, next) => {
    ctx.req = {
      timestamp: ctx.t_start,
      teamName: ctx.args.team.name,
      packageId: ctx.args.pkg.id,
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.adminScreen.removeTeamPackage(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.team = Team.normalize(ctx.raw.team, {
      state: "registered",
      package: { defaultState: "registered" },
      player: { defaultState: "inTeam" },
    });
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to remove Package from Team";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully removed Package from Team";
};

export { Command as removeTeamPackage };
