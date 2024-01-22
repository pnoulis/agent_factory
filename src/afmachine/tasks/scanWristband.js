import { Wristband } from "../../wristband/Wristband.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

function task(unsubcb, opts) {
  const afm = this;
  return afm.createCommand(
    task,
    (cmd) => {
      afm.run(cmd, opts);
    },
    { unsubcb },
  );
}
task.taskname = "scanWristband";
task.middleware = [
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.scanWristband(ctx.args.unsubcb);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  // backend - frontend translation
  async (ctx, next) => {
    ctx.res.wristband = Wristband.normalize(ctx.raw.wristband);
    ctx.res.unsubed = ctx.raw.unsubed;
    return next();
  },
];
task.toClient = function (cmd) {
  return cmd.res;
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
  cmd.msg = "Successfully scanned wristband";
  cmd.emit("fulfilled", cmd);
  cmd.emit("stateChange", cmd.state, ostate, cmd);
  return cmd;
};
task.onFailure = function (err, cmd) {
  const ostate = cmd.state;
  cmd.state = "rejected";
  cmd.msg = "Failed to scan wristband";
  cmd.res = err;
  cmd.errs.push(err);
  cmd.emit("rejected", cmd);
  cmd.emit("stateChange", cmd.state, ostate, cmd);
  return cmd;
};

export { task as scanWristband };
