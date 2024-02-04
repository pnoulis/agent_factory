import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { normalize as normalizeTeam } from "../team/normalize.js";
import { normalize as normalizePackage } from "../package/normalize.js";

new Task("startTeam", Command);

function Command(team, opts) {
  const afm = this;
  const promise = Command.createCommand(
    afm,
    {
      args: {
        team: "tobject" in team ? team.tobject(2) : team,
      },
      opts,
    },
    (cmd) => {
      afm.runCommand(cmd);
    },
  );
  return promise;
}

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
    ctx.raw = await ctx.afm.backend.startTeam(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.team = normalizeTeam(ctx.raw.team);
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to activate Team";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully activated Team";
  cmd.resolve(cmd.res);
};

export { Command as startTeam };
