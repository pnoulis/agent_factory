import "./debug.js";
import "./errors.js";
import { parsecmd } from "./afmachine/parsecmd.js";
import { isArray } from "js_utils/misc";

globalThis.parsecmd = parsecmd;

globalThis.getErr = (cmd) => {
  /*
    cmd could be either:

    1. A command object
    { errs: [err, err] }

    2. An Error
    { message:, cause: { message: }}

   */
  return isArray(cmd.errs) ? cmd.errs.at(-1) : cmd;
};

globalThis.getMsg = (cmd, type, whole) => {
  /*
    cmd could be any of the 3 objects

    1. A Command object
    {  res: { msg, ok, ...res }, errs: [err, err] }

    2. A Command.parse() object
    { msg, ok, ...res }

    3. Ar Error object
    { message, cause: { message } }
   */

  let msg;
  if (typeof cmd === "string") {
    return cmd;
  } else if ("message" in cmd) {
    // Error
    msg = {
      cmd: "",
      err: cmd.message || "",
      cause: cmd.cause?.message || "",
    };
  } else if (isArray(cmd.errs)) {
    // Command
    msg = {
      cmd: cmd.res.msg,
      err: cmd.errs.at(-1)?.message,
      cause: cmd.errs.at(-1)?.cause?.message,
    };
  } else {
    // Command.parse()
    msg = {
      cmd: cmd.msg,
      err: "",
      cause: "",
    };
  }

  type ||= "cmd";
  return whole ? msg : msg[type] || msg.cause || msg.err || msg.cmd;
};
