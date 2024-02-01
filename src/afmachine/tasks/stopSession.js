import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("stopSession", Command);

function Command(cashier, comment, opts) {
  const afm = this;
  const promise = Command.createCommand(
    afm,
    {
      args: { cashier, comment: comment ?? "" },
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
      jwt: ctx.args.cashier.jwt,
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
    ctx.res.cashier = ctx.args.cashier;
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.msg = "Failed to stop Session";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.msg = "Successfully stopped Session";
  cmd.resolve(cmd.res);
};

export { Command as stopSession };
