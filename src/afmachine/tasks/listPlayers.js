import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { Player } from "../player/Player.js";

new Task("listPlayers", Command);

function Command(opts) {
  const afm = this;
  const promise = Command.createCommand(afm, { opts }, (cmd) => {
    afm.runCommand(cmd);
  });
  return promise;
}
Command.verb = "list players";
Command.middleware = [
  async (ctx, next) => {
    ctx.req = {
      timestamp: ctx.t_start,
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.adminScreen.listPlayers();
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.players = ctx.raw.players.map((player) =>
      Player.normalize(player, { defaultState: "registered", stage2: false }),
    );
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to retrieve players";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully retrieved players";
};

export { Command as listPlayers };
