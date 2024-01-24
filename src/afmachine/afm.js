import "../debug.js";
import { createEventful } from "../Eventful.js";
import { compose } from "./compose.js";
import { enqueue } from "./enqueue.js";
// import { listPkgs } from "./tasks/listPkgs.js";
import { registerPlayer } from "./tasks/registerPlayer.js";
// import { scanWristband } from "./tasks/scanWristband.js";
import { BackendRegistration } from "../backend/registration/BackendRegistration.js";

class Afm extends createEventful([
  "connected",
  "disconnected",
  "error",
  "precmd",
  "postcmd",
  "cmdqueued",
  "cmdstart",
  "cmdend",
]) {
  constructor() {
    super();
    this.commandQueue = [];
    this.backend = new BackendRegistration();
    this.players = new Map();
    this.wristbands = new Map();
    this.teams = new Map();
    this.commands = 0;
  }
}

Afm.prototype[registerPlayer.taskname] = registerPlayer;
// Afm.prototype.listPkgs = createTask(listPkgs);
// Afm.prototype.registerPlayer = createTask(registerPlayer);
// Afm.prototype.scanWristband = createTask(scanWristband);

Afm.prototype.enqueueCommand = async function (cmd) {
  this.commandQueue.push(cmd);
  cmd.queued();
  this.emit("cmdqueued", cmd);
  if (this.commandQueue.length > 1) return Promise.resolve();

  async function runQueue(queue, fn) {
    if (!queue[0]) return;
    await fn(queue[0]);
    queue.shift();
    runQueue(queue, fn);
  }
  return runQueue(this.commandQueue, this.runCommand.bind(this));
};

Afm.prototype.runCommand = async function (cmd) {
  const { queue = true } = cmd.opts;

  if (queue) {
    if (cmd.state !== "queued") {
      this.commands = this.commands + 1;
      return this.enqueueCommand(cmd);
    }
  } else {
    this.commands = this.commands + 1;
  }

  try {
    this.emit("cmdstart", cmd);

    // This registered error handler ensures
    // that an error will not result
    // in an unhandled exception.
    cmd.promise.catch(() => {});

    await cmd.run();
  } catch (err) {
    cmd.errs.push(err);
  } finally {
    this.commands = this.commands - 1;
    if (this.commands <= 0) {
      this.players.clear();
      this.wristbands.clear();
      this.teams.clear();
    }
    this.emit("cmdend", cmd);
    if (cmd.errs.length > 0) {
      this.emit("error", cmd);
    }
  }
};

const afm = new Afm();

export { afm };
