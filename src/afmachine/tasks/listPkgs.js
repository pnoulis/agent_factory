import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { isFunction } from "js_utils/misc";

function task(cb) {
  const afm = this;
  return afm.createCommand(task, cb);
}

task.taskname = "listPkgs";
task.middleware = [
  async (ctx, next) => {
    ctx.res.raw = await ctx.afm.backend.listPackages();
    return next();
  },
];
task.onSuccess = function (cmd) {};
task.onFailure = function (err, cmd, cb) {
  cmd.error = err;
  if (err.code === 12) {
    return Promise.resolve(cb(err, cmd));
  }
  return Promise.resolve(cmd);
};

export { task as listPkgs };
