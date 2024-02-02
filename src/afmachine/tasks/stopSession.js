import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { normalize as normalizeCashier } from "../cashier/normalize.js";

new Task("stopSession", Command);

function Command(cashier, jwt, comment, opts) {
  const afm = this;
  const promise = Command.createCommand(
    afm,
    {
      args: { cashier, comment: comment ?? "", jwt },
      opts,
    },
    (cmd) => {
      afm.runCommand(cmd);
    },
  );
  return promise;
}
Command.middleware = [
  async (ctx, next) => {
    ctx.req = {
      jwt: ctx.args.jwt,
      comment: ctx.args.comment,
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.stopSession(ctx.req);
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
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Failed to stop Session";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully stopped Session";
  cmd.resolve(cmd.res);
};

export { Command as stopSession };
