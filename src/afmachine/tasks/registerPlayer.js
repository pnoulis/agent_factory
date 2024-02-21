import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { Player } from "../player/Player.js";

new Task("registerPlayer", Command);

function Command(player, password, { synthetic = false, queued = false } = {}) {
  const afm = this || Command.afm;
  const promise = Command.createCommand(
    afm,
    {
      args: {
        player,
        password,
      },
      opts: {
        synthetic,
        queued,
      },
    },
    (cmd) => afm.runCommand(cmd),
  );
  return promise;
}

Command.verb = "register player";

Command.middleware = [
  async (ctx, next) => {
    if (ctx.opts.synthetic) {
      ctx.args.player.state.register();
    }
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
    ctx.raw = await ctx.afm.adminScreen.registerPlayer(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.player = Player.normalize(ctx.raw.player, { state: "registered" });
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to register new Player";
  cmd.reject(cmd);
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully registered new Player";
  cmd.resolve(cmd);
};

export { Command as registerPlayer };
