import "../debug.js";
import { delay } from "js_utils/misc";
import { BackendRegistration } from "../backend/registration/BackendRegistration.js";
import { createCacheErr } from "../errors.js";
import { createEventful } from "../Eventful.js";
import { compose } from "./compose.js";

// player tasks
import { registerPlayer } from "./tasks/registerPlayer.js";
import { pairWristband } from "./tasks/pairWristband.js";
import { unpairWristband } from "./tasks/unpairWristband.js";

// wristband tasks
import { scanWristband } from "./tasks/scanWristband.js";
import { getWristbandInfo } from "./tasks/getWristbandInfo.js";
import { registerWristband } from "./tasks/registerWristband.js";
import { deregisterWristband } from "./tasks/deregisterWristband.js";

// list tasks
import { listPkgs } from "./tasks/listPkgs.js";

class Afm extends createEventful([
  "connected",
  "disconnected",
  "error",
  "precmd",
  "postcmd",
  "cmdcreate",
  "cmdqueue",
  "cmdstart",
  "cmdend",
  "idle",
]) {
  constructor() {
    super();
    this.commandQueue = [];
    this.backend = new BackendRegistration();
    this.players = new Map();
    this.wristbands = new Map();
    this.teams = new Map();
    this.commands = 0;
    this.history = [];
  }
}
Afm.prototype.enqueueCommand = async function (cmd) {
  this.commandQueue.push(cmd);
  cmd.queued();
  this.onCmdQueue(cmd);
  if (this.commandQueue.length > 1) return Promise.resolve();

  async function runQueue(queue, fn) {
    if (!queue[0]) return;
    await delay(0).then(() => fn(queue[0]));
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
    this.onCmdStart(cmd);

    // This registered error handler ensures
    // that an error will not result
    // in an unhandled exception.
    cmd.promise.catch(() => {});

    await cmd.run();
  } catch (err) {
    cmd.errs.push(err);
  } finally {
    this.commands = this.commands - 1;
    this.onCmdEnd(cmd);
  }
};
Afm.prototype.getCache = function (cache, key, strict = true) {
  if (!Object.hasOwn(this, cache)) {
    throw createCacheErr({ cache, msg: `Unknown cache: ${cache}` });
  }
  const value = this[cache].get(key);
  if (strict && value === undefined) {
    throw createCacheErr({ cache, key });
  }
  return value;
};
Afm.prototype.setCache = function (cache, key, value) {
  if (!Object.hasOwn(this, cache)) {
    throw createCacheErr({ cache, msg: `Unknown cache: ${cache}` });
  }
  return this[cache].set(key, value);
};
Afm.prototype.onCmdCreate = function (cmd) {
  this.history.push({
    task: cmd.taskname,
    stage: "create",
    state: cmd.state,
  });
  this.emit("cmdcreate", cmd);
};
Afm.prototype.onCmdQueue = function (cmd) {
  this.history.push({
    task: cmd.taskname,
    state: "queue",
    state: cmd.state,
    queue: this.commandQueue.length,
    commands: this.commands,
  });
  this.emit("cmdqueue", cmd);
};
Afm.prototype.onCmdStart = function (cmd) {
  this.history.push({
    task: cmd.taskname,
    stage: "start",
    state: cmd.state,
  });
  this.emit("cmdstart", cmd);
};
Afm.prototype.onCmdEnd = function (cmd) {
  this.history.push({
    task: cmd.taskname,
    stage: "end",
    state: cmd.state,
    errs: cmd.errs.map((err) => err.msg ?? err.message),
    msg: cmd.msg,
  });

  this.emit("cmdend", cmd);
  if (cmd.errs.length > 0) {
    this.emit("error", cmd);
  }

  if (this.commands <= 0) {
    this.players.clear();
    this.wristbands.clear();
    this.teams.clear();
    this.emit("idle", this);
  }
};

Object.assign(Afm.prototype, {
  // player tasks
  registerPlayer,
  pairWristband,
  unpairWristband,
  // wristband tasks
  scanWristband,
  getWristbandInfo,
  registerWristband,
  deregisterWristband,
  // list tasks
  listPkgs,
});

const afm = new Afm();

export { afm };
