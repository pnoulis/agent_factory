import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { normalize as normalizeCashier } from "../cashier/normalize.js";

new Task("startSession", Command);

function Command(cashier, jwt, opts) {
  const afm = this;
  const promise = Command.createCommand(
    afm,
    {
      args: { cashier, jwt },
      opts,
    },
    (cmd) => {
      afm.runCommand(cmd);
    },
  );
  return promise;
}
Command.verb = "start session";
Command.middleware = [
  async (ctx, next) => {
    ctx.req.jwt = ctx.args.jwt;
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.startSession(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  async (ctx, next) => {
    const { cashiers } = await ctx.afm.backend.listCashiers({
      timestamp: ctx.t_start,
    });
    const thisCashier = cashiers.find(
      (cashier) => cashier.username === ctx.args.cashier.username,
    );
    if (thisCashier === undefined) {
      throw new Error(`Could not locate cashier: ${ctx.args.cashier.username}`);
    }
    ctx.res.cashier = normalizeCashier(thisCashier);
    ctx.res.jwt = ctx.args.jwt;
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to start Session";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully started Session";
  cmd.resolve(cmd.res);
};

export { Command as startSession };
