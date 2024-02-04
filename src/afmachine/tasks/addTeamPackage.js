import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { normalize as normalizeTeam } from "../team/normalize.js";
import { normalize as normalizePackage } from "../package/normalize.js";

new Task("addTeamPackage", Command);

function Command(team, pkg, opts) {
  const afm = this;
  const promise = Command.createCommand(
    afm,
    {
      args: {
        team: "tobject" in team ? team.tobject(2) : team,
        package: "tobject" in pkg ? pkg.tobject() : pkg,
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
      name: ctx.args.package.name,
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.addTeamPackage(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.package = normalizePackage(ctx.raw.team.packages.pop(), {
      depth: 1,
    });
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to add Package to Team";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully added Package to Team";
  cmd.resolve(cmd.res);
};

export { Command as addTeamPackage };
