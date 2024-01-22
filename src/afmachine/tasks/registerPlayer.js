import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

function task(player, opts) {
  const afm = this;
  return afm.createCommand(
    task,
    (cmd) => {
      afm.run(cmd, opts);
    },
    { player },
  );
}
task.taskname = "registerPlayer";
task.middleware = [
  attachBackendRegistrationRouteInfo,
  (ctx, next) => {
    ctx.req = {
      timestamp: Date.now(),
      ...ctx.args.player,
    };
    return next();
  },
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.registerPlayer(ctx.args.player);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
];
task.toClient = function (cmd) {
  return cmd.raw;
};
task.onQueued = function (cmd) {
  const ostate = cmd.state;
  cmd.state = "queued";
  cmd.emit("queued", cmd);
  cmd.emit("stateChange", cmd.state, ostate, cmd);
};
task.onPending = function (cmd) {
  const ostate = cmd.state;
  cmd.state = "pending";
  cmd.emit("pending", cmd);
  cmd.emit("stateChange", cmd.state, ostate, cmd);
};
task.onSuccess = function (cmd) {
  const ostate = cmd.state;
  cmd.state = "fulfilled";
  cmd.msg = "Successfully registered player";
  cmd.emit("fulfilled", cmd);
  cmd.emit("stateChange", cmd.state, ostate, cmd);
  return cmd;
};
task.onFailure = function (err, cmd) {
  const ostate = cmd.state;
  cmd.state = "rejected";
  cmd.msg = "Failed to register player";
  cmd.res = err;
  cmd.errs.push(err);
  cmd.emit("rejected", cmd);
  cmd.emit("stateChange", cmd.state, ostate, cmd);
  return cmd;
};

export { task as registerPlayer };
