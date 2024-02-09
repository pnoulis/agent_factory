import { delay } from "js_utils/misc";
import { createEventful } from "../Eventful.js";
import { DEVICE_TYPES } from "../constants.js";

// Entities
import { Wristband } from "./wristband/Wristband.js";
import { Player } from "./player/Player.js";
import { Package } from "./package/Package.js";
import { Team } from "./team/Team.js";
import { Device } from "./device/Device.js";
import { DeviceAdminScreen } from "./device/admin-screen/DeviceAdminScreen.js";
import { DeviceRPIReader } from "./device/rpi-reader/DeviceRPIReader.js";
import { Cashier } from "./cashier/Cashier.js";

// Synthetic Player tasks
import { pairWristband } from "./synthetic-tasks/pairWristband.js";

// Synthetic Team tasks

// Player tasks
import { registerPlayer } from "./tasks/registerPlayer.js";
import { searchPlayer } from "./tasks/searchPlayer.js";

// Wristband tasks
import { scanWristband } from "./tasks/scanWristband.js";
import { getWristbandInfo } from "./tasks/getWristbandInfo.js";
import { registerWristband } from "./tasks/registerWristband.js";
import { deregisterWristband } from "./tasks/deregisterWristband.js";

// Team tasks
import { registerTeam } from "./tasks/registerTeam.js";
import { registerGroupTeam } from "./tasks/registerGroupTeam.js";
import { addTeamPackage } from "./tasks/addTeamPackage.js";
import { removeTeamPackage } from "./tasks/removeTeamPackage.js";
import { startTeam } from "./tasks/startTeam.js";

// Cashier tasks
import { registerCashier } from "./tasks/registerCashier.js";
import { deregisterCashier } from "./tasks/deregisterCashier.js";
import { loginCashier } from "./tasks/loginCashier.js";

// Session tasks
import { startSession } from "./tasks/startSession.js";
import { stopSession } from "./tasks/stopSession.js";

// Device tasks
import { bootDevice } from "./tasks/bootDevice.js";
import { shutdownDevice } from "./tasks/shutdownDevice.js";
import { restartDevice } from "./tasks/restartDevice.js";
import { updateScoreboardDeviceView } from "./tasks/updateScoreboardDeviceView.js";

// list tasks
import { listPackages } from "./tasks/listPackages.js";
import { listPlayers } from "./tasks/listPlayers.js";
import { listPlayersWithWristband } from "./tasks/listPlayersWithWristband.js";
import { listTeams } from "./tasks/listTeams.js";
import { listCashiers } from "./tasks/listCashiers.js";
import { listDevices } from "./tasks/listDevices.js";
import { listScoreboardDevices } from "./tasks/listScoreboardDevices.js";
import { listScoreboardViews } from "./tasks/listScoreboardViews.js";
import { listScoreboard } from "./tasks/listScoreboard.js";

class Afmachine extends createEventful([
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
    this.players = new Map();
    this.wristbands = new Map();
    this.teams = new Map();
    this.devices = new Map();
    this.cashiers = new Map();
    this.commands = 0;
    this.history = [];
  }
}
Afmachine.prototype.enqueueCommand = async function (cmd) {
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
Afmachine.prototype.runCommand = async function (cmd) {
  const { queue = true } = cmd.opts;

  if (queue && cmd.state !== "queued") {
    return this.enqueueCommand(cmd);
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
Afmachine.prototype.getCache = function (cache, key, strict = true) {
  // if (!Object.hasOwn(this, cache)) {
  //   throw createCacheErr({ cache, msg: `Unknown cache: ${cache}` });
  // }
  const value = this[cache].get(key);
  // if (strict && value === undefined) {
  //   throw createCacheErr({ cache, key });
  // }
  return value;
};
Afmachine.prototype.setCache = function (cache, key, value) {
  // if (!Object.hasOwn(this, cache)) {
  //   throw createCacheErr({ cache, msg: `Unknown cache: ${cache}` });
  // }
  return this[cache].set(key, value);
};
Afmachine.prototype.onCmdCreate = function (cmd) {
  this.history.push({
    task: cmd.taskname,
    stage: "create",
    state: cmd.state,
  });
  this.emit("cmdcreate", cmd);
};
Afmachine.prototype.onCmdQueue = function (cmd) {
  this.history.push({
    task: cmd.taskname,
    state: "queue",
    state: cmd.state,
    queue: this.commandQueue.length,
    commands: this.commands,
  });
  this.emit("cmdqueue", cmd);
};
Afmachine.prototype.onCmdStart = function (cmd) {
  this.history.push({
    task: cmd.taskname,
    stage: "start",
    state: cmd.state,
  });
  this.emit("cmdstart", cmd);
};
Afmachine.prototype.onCmdEnd = function (cmd) {
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

Object.assign(Afmachine.prototype, {
  // Synthetic Player tasks
  pairWristband,

  // Player tasks
  registerPlayer,
  searchPlayer,

  // Wristband tasks
  scanWristband,
  getWristbandInfo,
  registerWristband,
  deregisterWristband,

  // Team tasks
  registerTeam,
  registerGroupTeam,
  addTeamPackage,
  removeTeamPackage,
  startTeam,

  // Session tasks
  startSession,
  stopSession,

  // Cashier tasks
  registerCashier,
  deregisterCashier,
  loginCashier,

  // Device tasks
  bootDevice,
  shutdownDevice,
  restartDevice,
  updateScoreboardDeviceView,

  // List tasks
  listPackages,
  listPlayers,
  listPlayersWithWristband,
  listTeams,
  listCashiers,
  listDevices,
  listScoreboardDevices,
  listScoreboardViews,
  listScoreboard,

  // Creates
  createWristbandFactory(type) {
    switch (type) {
      default:
        return (wristband) => new Wristband(wristband);
    }
  },
  createPlayerFactory(type) {
    switch (type) {
      default:
        return (player, wristband) => new Player(player, wristband);
    }
  },
  createPackageFactory(type) {
    switch (type) {
      default:
        return (pkg) => new Package(pkg);
    }
  },
  createTeamFactory(type, playerType, wristbandType, pkgType) {
    switch (type) {
      default:
        return (team) =>
          new Team(
            team,
            this.createPlayerFactory(playerType),
            this.createWristbandFactory(wristbandType),
            this.createPackageFactory(pkgType),
          );
    }
  },
  createDeviceFactory(type) {
    switch (type) {
      case DEVICE_TYPES.adminScreen:
        return (device, clientMqtt) =>
          new DeviceAdminScreen(device, clientMqtt);
      case DEVICE_TYPES.rpiReader:
        return (device, clientMqtt) => new DeviceRPIReader(device, clientMqtt);
      default:
        return (device) => new Device(device);
    }
  },
  createCashierFactory() {
    return (cashier) => new Cashier(cashier);
  },
});

export { Afmachine };
