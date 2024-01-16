import { Eventful } from "../Eventful.js";
import { createTask } from "./createTask.js";
import { createCommand } from "./createCommand.js";
import { runCommands } from "./runCommands.js";
import { listPkgs } from "./tasks/listPkgs.js";
import { BackendRegistration } from "../backend/registration/BackendRegistration.js";

class Afm extends Eventful {
  constructor() {
    super([
      "connected",
      "disconnected",
      "error",
      "command",
      "commandStarted",
      "commandFinished",
    ]);
    this.commandQueue = [];
    this.tasks = {};
    this.backend = new BackendRegistration();
    createTask(this, listPkgs);
  }
}

Afm.prototype.runTask = async function (task, args, cb) {
  return new Promise((resolve, reject) =>
    setImmediate(() => {
      const command = createCommand(afm, task, args, resolve, reject, cb);
      this.commandQueue.push(command);
      this.emit("command", command);
      task.emit("command", command);
      if (this.commandQueue.length > 1) return;
      runCommands(afm, afm.commandQueue.at(0));
    }),
  );
};

const afm = new Afm();
afm.backend.boot();

export { afm };
