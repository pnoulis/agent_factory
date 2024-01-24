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
  const p = new PlayerTarget(player, player?.wristband);
  afm.players.set(p.username, p);
  const promise = Command.createCommand(
    afm,
    {
      args: { player: p.tobject() },
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
    try {
      const player = ctx.afm.players.get(ctx.args.player.username);
      if (!player) {
        throw new Error(`Missing ${ctx.args.player.username} from cache`);
      }
      player.register();
      await next();
      player.registered(player);
      ctx.res = player.tobject();
    } catch (err) {
      throw err;
    }
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
