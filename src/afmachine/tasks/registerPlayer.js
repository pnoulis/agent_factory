import { delay } from "js_utils/misc";
import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { PlayerCommander } from "../player/PlayerCommander.js";

new Task("registerPlayer", Command);

function Command(player, password, opts) {
  const afm = this;
  const playerTarget = afm.createPlayer(player, player.wristband);
  afm.setCache("players", playerTarget.username, playerTarget);
  const promise = Command.createCommand(
    afm,
    {
      args: {
        player: "tobject" in player ? player.tobject() : player,
        password,
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
  async (ctx, next) => {
    const player = ctx.afm.getCache("players", ctx.args.player.username);
    player.state.register();
    ctx.req = {
      timestamp: ctx.t_start,
      name: ctx.args.player.name,
      surname: ctx.args.player.surname,
      username: ctx.args.player.username,
      email: ctx.args.player.email,
      password: ctx.args.password,
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.registerPlayer(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    const player = ctx.afm.getCache("players", ctx.args.player.username);
    ctx.res.player = player.state.registered(ctx.raw.player).tobject();
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to register new Player";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully registered new Player";
  cmd.resolve(cmd.res);
};

export { Command as registerPlayer };
