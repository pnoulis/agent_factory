import "./debug.js";
import "./errors.js";
import { parsecmd } from "#afm/parsecmd.js";

globalThis.parsecmd = parsecmd;

globalThis.getMsg = (err, type) => {
  const messages =
    "message" in err
      ? {
          cmd: err.res?.msg || "",
          err: err.message || "",
          cause: err.cause?.message || "",
        }
      : {
          cmd: err.res?.msg || "",
          err: err.errs.at(-1)?.message,
          cause: err.errs.at(-1)?.cause?.message || "",
        };

  return messages[type] || messages.cause || messages.err || messages.cmd;
};
