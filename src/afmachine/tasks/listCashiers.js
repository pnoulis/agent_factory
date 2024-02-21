import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { Cashier } from "../cashier/Cashier.js";

new Task("listCashiers", Command);

function Command(opts) {
  const afm = this;
  const promise = Command.createCommand(afm, { opts }, (cmd) => {
    afm.runCommand(cmd);
  });
  return promise;
}
Command.verb = "list cashiers";
Command.middleware = [
  async (ctx, next) => {
    ctx.req = { timestamp: ctx.t_start };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.adminScreen.listCashiers();
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.cashiers = ctx.raw.cashiers.map((cashier) =>
      Cashier.normalize([{ role: "cashier" }, cashier]),
    );
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to retrieve Cashiers";
  cmd.reject(cmd);
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully retrieved Cashiers";
  cmd.resolve(cmd);
};

export { Command as listCashiers };
