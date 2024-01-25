import { delay } from "js_utils/misc";
import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { PlayerTarget } from "../../player/thin/PlayerTarget.js";

const registerPlayer = new Task("registerPlayer", Command);

function Command(player, opts) {
  const afm = this;
  const target = new PlayerTarget(player, player?.wristband);
  afm.setCache("players", target.username, target);
  const promise = Command.createCommand(
    afm,
    {
      args: { player: player.tobject() },
      opts,
    },
    (cmd) => {
      afm.runCommand(cmd);
    },
  );
  return promise;
}

Command.middleware = [
  async (ctx, next) => {
    const player = ctx.afm.getCache("players", ctx.args.player.username);
    player.register();
    return next();
  },
  attachBackendRegistrationRouteInfo,
  (ctx, next) => {
    ctx.req = { timestamp: ctx.t_start, ...ctx.args.player };
    return next();
  },
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.registerPlayer(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    const player = ctx.afm.getCache("players", ctx.args.player.username);
    ctx.res = player.registered().tobject();
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.msg = "Failed to register new player";
  cmd.reject(cmd);
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.msg = "Successfully registered new player";
  cmd.resolve(cmd.res);
};

export { Command as registerPlayer };
