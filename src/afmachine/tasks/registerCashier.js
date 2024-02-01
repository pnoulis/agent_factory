import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("registerCashier", Command);

function Command(cashier, opts) {
  const afm = this;
  const promise = Command.createCommand(
    afm,
    {
      args: { cashier },
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
      username: ctx.args.cashier.username,
      email: ctx.args.cashier.email,
      password: ctx.args.cashier.password,
      role: ctx.args.cashier.role,
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.registerCashier(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  async (ctx, next) => {
    const { cashiers } = await ctx.afm.backend.listCashiers({
      timestamp: ctx.t_start,
    });
    ctx.res.cashier = ctx.req;
    ctx.res.cashier.id = cashiers.find(
      (cashier) => cashier.username === ctx.req.username,
    )?.id;
    ctx.res.cashier.role = ctx.req.role.at(0).split("_").at(1);
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to register Cashier";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully registered Cashier";
  cmd.resolve(cmd.res);
};

export { Command as registerCashier };
