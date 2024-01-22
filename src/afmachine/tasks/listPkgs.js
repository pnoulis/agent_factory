import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

function task(opts) {
  const afm = this;
  return afm.createCommand(task, (cmd) => {
    afm.run(cmd, opts);
  });
}

task.taskname = "listPkgs";
task.middleware = [
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.listPackages();
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.packages = ctx.raw.packages;
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
  cmd.msg = "Successfully listed packages";
  cmd.emit("fulfilled", cmd);
  cmd.emit("stateChange", cmd.state, ostate, cmd);
  return cmd;
};
task.onFailure = function (err, cmd) {
  const ostate = cmd.state;
  cmd.state = "rejected";
  cmd.msg = "Failed to list pkgs";
  cmd.res = err;
  cmd.errs.push(err);
  cmd.emit("rejected", cmd);
  cmd.emit("stateChange", cmd.state, ostate, cmd);
  return cmd;
};

export { task as listPkgs };
