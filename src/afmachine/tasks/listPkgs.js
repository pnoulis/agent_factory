import { compose } from "../compose.js";
import { Eventful } from "../../Eventful.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

Object.setPrototypeOf(
  task,
  new Eventful([
    "command",
    "pending",
    "fulfilled",
    "rejected",
    "settled",
    "stateChange",
  ]),
);

function task(cb) {
  return this.runCommand(task, null, cb);
}
task.taskname = "listPkgs";
task.middleware = [async (ctx, next) => {}];
task.onSuccess = function (cmd) {};
task.onFailure = function (cmd) {};
task.createContext = function (afm, args, cb) {
  return {
    afm,
    taskname: task.taskname,
    args,
    cb,
    req: {},
    res: {},
  };
};

// const listPkgs = {};
// listPkgs.taskname = "listPkgs";
// listPkgs.parseSuccessCmd = function (cmd) {};
// listPkgs.parseFailedCmd = function (cmd) {};
// listPkgs.createCommand = function () {
//   const cmd = compose([
//     async (ctx, next) => {
//       ctx.res.raw = await ctx.afm.backend.listPackages();
//       return next();
//     },
//   ]);

//   return Object.assign(cmd, {
//     taskname: listPkgs.taskname,
//     afm,
//     args,
//     cb,
//     res: {},
//   });
// };

// const events = new Eventful([
//   "command",
//   "aborted",
//   "pending",
//   "fulfilled",
//   "rejected",
//   "settled",
//   "stateChange",
// ]);

// const middleware = compose([
//   async (ctx, next) => {
//     // ctx.res.raw = await ctx.afm.backend.listPackages();
//     return Promise.reject(new Error("oetuhneu"));
//     return next();
//   },
// ]);

// async function listPkgs(cb) {
//   const afm = this;
//   const command = { args: [], afm, cb, res: {} };

//   const cmdHandlers = events.events.command;
//   events.events.command = cmdHandlers.filter((handler) => handler.persist);

//   try {
//     await compose(cmdHandlers.map((com) => com.listener))(command);
//     if (command.state === "aborted") return;
//     await middleware(command);
//     command.msg = "Successfully listed packages";
//     isFunction(cb) && cb(null, command);
//     events.emit("fulfilled", command);
//   } catch (err) {
//     command.msg = "Failed to list packages";
//     isFunction(cb) && cb(err);
//     afm.emit("error", err, command);
//     events.emit("rejected", err, command);
//   } finally {
//     events.emit("settled", command);
//   }
// }

// Object.setPrototypeOf(listPkgs, events);

// const listPkgs = {
//   taskname: "listPkgs",
// };

// function _listPkgs(cb) {}

// function _listPkgs(targetCb) {
//   const middleware = [notifyCommandStart, notifyCommandEnd];
//   const cmd = {};
// }

// const listPkgs = {
//   taskname: "listPkgs",
// };

// listPkgs.middleware = compose([
//   attachBackendRegistrationRouteInfo,
//   validateBackendRequest,
//   async (ctx, next) => {
//     ctx.command.res.data = await ctx.afm.backend.listPackages();
//     return next();
//   },
//   // validateBackendResponse,
//   // parseBackendResponse,
// ]);

// listPkgs.cb = function (err, ctx) {
//   if (err) {
//     ctx.error = err;
//     ctx.msg = "Failed to list packages!";
//   } else {
//     ctx.msg = "Successfully listed packages!";
//   }
// };

export { task as listPkgs };
