import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { normalize as normalizeTeam } from "../team/normalize.js";

new Task("registerGroupTeam", Command);

function Command(team, opts) {
  const afm = this;
  const promise = Command.createCommand(
    afm,
    {
      args: {
        team: team.tobject(),
        players: team.roster.map((player) => player.tobject(1)),
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
      groupPlayers: ctx.args.players.map((p) => ({
        username: p.username,
        wristbandNumber: p.wristband.id,
      })),
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.registerGroupTeam(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.team = normalizeTeam(
      { ...ctx.args.team, roster: ctx.args.players },
      { depth: 3, state: "registered", player: { state: "inTeam" } },
    );
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to register Group Team";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully registered Group Team";
  cmd.resolve(cmd.res);
};

export { Command as registerGroupTeam };
