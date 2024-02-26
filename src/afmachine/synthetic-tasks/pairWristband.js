import { Task } from "../Task.js";
import { PlayerCommander } from "../player/PlayerCommander.js";
import { WristbandCommander } from "../wristband/WristbandCommander.js";

new Task("pairWristband", Command);

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

Command.verb = "pair player's wristband";

Command.middleware = [
  async (ctx, next) => {
    ctx.args.player.state.pairWristband();
    ctx.args.wristband.state.pair();
    await ctx.args.wristband.pair(ctx.args.player);
    debug("after wrisband pair");
    ctx.res.player = ctx.args.player.tobject(null, { depth: 1 });
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to pair Wristband to Player";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully paired Wristband to Player";
};

export { Command as pairWristband };
