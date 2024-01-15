import { compose } from "../compose.js";
import { Eventful } from "../../Eventful.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

const taskname = "listPkgs";
const listeners = new Eventful([
  "queued",
  "pending",
  "fulfilled",
  "rejected",
  "settled",
  "stateChange",
]);
const middleware = compose([
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.res.data = await ctx.afm.backend.listPackages();
    return next();
  },
  validateBackendResponse,
  parseBackendResponse,
]);

export default function (Afm) {
  const task = function (...args) {
    return this.createCommand({
      taskname,
      listeners,
      middleware,
      args,
    });
  };
  task.listen = listeners;
  Afm.prototype[taskname] = task;
}
