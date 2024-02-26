import { Task } from "../Task.js";
import { PlayerCommander } from "../player/PlayerCommander.js";
import { WristbandCommander } from "../wristband/WristbandCommander.js";

new Task("unpairWristband", Command);

function Command(player, wristband, opts) {
  const afm = this || Command.afm;
  const promise = Command.createCommand(
    afm,
    {
      args: {
        player,
        wristband,
      },
      opts,
    },
    (cmd) => afm.runCommand(cmd),
  );
  return promise;
}

Command.verb = "unpair player's wristband";

Command.middleware = [
  async (ctx, next) => {
    ctx.args.player.state.unpairWristband();
    ctx.args.wristband.state.unpair();
    await ctx.args.wristband.unpair(ctx.args.player);
    ctx.res.player = ctx.args.player.tobject(null, { depth: 1 });
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to unpair wristband from player";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully unpaired wristband from player";
};

export { Command as unpairWristband };
