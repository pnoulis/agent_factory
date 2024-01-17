import { Eventful } from "../Eventful.js";
import { listPkgs } from "./tasks/listPkgs.js";
import { BackendRegistration } from "../backend/registration/BackendRegistration.js";
import { createTask } from "./createTask.js";

class Afm extends Eventful {
  constructor() {
    super([
      "connected",
      "disconnected",
      "error",
      "command",
      "commandStarted",
      "commandFinished",
      "commandAborted",
    ]);
    this.commandQueue = [];
    this.backend = new BackendRegistration();
  }
}

Afm.prototype[listPkgs.taskname] = listPkgs;
Afm.prototype.runCommand = async function (task, args, cb) {
  const precmd = task.events;
  task.events.command = precmd.filter((handler) => handler.persist);
  const cmd = task.events.middleware;
  const ctx = task.createContext(afm, args, cb);
  try {
    await compose(
      []
        .concat(
          precmd.map((handler) => handler.listener),
          cmd,
        )
        .filter((middleware) => !!middleware),
    )(ctx);
    task.onSuccess(ctx);
  } catch (err) {
    task.onFailure(ctx);
  } finally {
  }
  // setImmediate(async () => {
  //   const precmd = task.events.command;
  //   task.events.command = precmd.filter((handler) => handler.persist);
  //   const cmd = task.createCommand();
  // });
};

const afm = new Afm();

// Afm.prototype.runTask = async function (task, args, cb) {
//   return new Promise((resolve, reject) =>
//     setImmediate(() => {
//       const command = createCommand(afm, task, args, resolve, reject, cb);
//       this.commandQueue.push(command);
//       this.emit("command", command);
//       task.emit("command", command);
//       if (this.commandQueue.length > 1) return;
//       runCommands(afm, afm.commandQueue.at(0));
//     }),
//   );
// };

export { afm };
