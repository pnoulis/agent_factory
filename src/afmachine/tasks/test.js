import { Task } from "../Task.js";
import { delay } from "js_utils/misc";

new Task("test", Command);

function Command(opts) {
  const afm = this || Command.afm;
  const promise = Command.createCommand(afm, { opts }, (cmd) => {
    afm.runCommand(cmd);
  });
  return promise;
}
Command.verb = "test";
Command.middleware = [
  async (ctx, next) => {
    ctx.raw = await delay(ctx.opts.delay ?? 1000, ctx.opts.fail).catch(() => {
      throw globalThis.craterr(({ EGENERIC }) => EGENERIC("Failed"));
    });
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.res.msg = "Failed to test";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.res.msg = "Successfully tested";
};

export { Command as test };
