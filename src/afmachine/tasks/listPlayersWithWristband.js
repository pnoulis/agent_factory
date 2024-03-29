import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { Player } from "../player/Player.js";

new Task("listPlayersWithWristband", Command);

function Command(opts) {
  const afm = this || Command.afm;
  const promise = Command.createCommand(afm, { opts }, (cmd) =>
    afm.runCommand(cmd),
  );
  return promise;
}
Command.verb = "list players with wristband";
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
    ctx.raw = await ctx.afm.adminScreen.listPlayersWithWristband();
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.players = ctx.raw.players.map((player) =>
      Player.normalize(player, { state: "registered", stage2: false }),
    );
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.res.msg = "Failed to retrieve players with a paired wristbands";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.res.msg = "Successfully retrieved players with a paired wristband";
};

export { Command as listPlayersWithWristband };
