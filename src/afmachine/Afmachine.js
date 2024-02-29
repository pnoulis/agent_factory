import { delay } from "js_utils/misc";
import { createEventful } from "../Eventful.js";
import { DEVICE_TYPES } from "../constants.js";

// Entities
import { Wristband } from "./wristband/Wristband.js";
import { WristbandCommander } from "./wristband/WristbandCommander.js";
import { Player } from "./player/Player.js";
import { PlayerCommander } from "./player/PlayerCommander.js";
import { Package } from "./package/Package.js";
import { Team } from "./team/Team.js";
import { TeamCommander } from "./team/TeamCommander.js";
import { Device } from "./device/Device.js";
import { DeviceAdminScreen } from "./device/admin-screen/DeviceAdminScreen.js";
import { DeviceRPIReader } from "./device/rpi-reader/DeviceRPIReader.js";
import { Cashier } from "./cashier/Cashier.js";
import { GrouPartyTeam } from "./grouparty/GrouPartyTeam.js";
import { GrouPartyPlayer } from "./grouparty/GrouPartyPlayer.js";
import { GrouPartyWristband } from "./grouparty/GrouPartyWristband.js";

// Test
import { test } from "./tasks/test.js";

// RPI Reader tasks
import { readWristband } from "./tasks/readWristband.js";

// Synthetic Player tasks
import { pairWristband } from "./synthetic-tasks/pairWristband.js";
import { unpairWristband } from "./synthetic-tasks/unpairWristband.js";

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
import { findTeam } from "./tasks/findTeam.js";

// Cashier tasks
import { registerCashier } from "./tasks/registerCashier.js";
import { deregisterCashier } from "./tasks/deregisterCashier.js";
import { loginCashier } from "./tasks/loginCashier.js";

// Session tasks
import { listSession } from "./tasks/listSession.js";
import { startSession } from "./tasks/startSession.js";
import { stopSession } from "./tasks/stopSession.js";
import { stopSessionForce } from "./tasks/stopSessionForce.js";

// Device tasks
import { boot } from "./tasks/boot.js";
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
  "booted",
  "precmd",
  "postcmd",
  "cmdcreate",
  "cmdqueue",
  "cmdstart",
  "cmdend",
  "idle",
]) {
  constructor(adminScreen, rpiReader) {
    super();
    this.booted = false;
    this.adminScreen = adminScreen;
    this.rpiReader = rpiReader;
    this.commandQueue = [];
    this.commands = 0;
    this.history = [];

    this.boot.afm = this;
    this.registerCashier.afm = this;
    this.loginCashier.afm = this;
    this.searchPlayer.afm = this;

    this.on("newListener", (event) => {
      if (event === "booted" && this.booted) {
        this.emit("booted", this);
      } else if (event === "idle") {
        this.emit("idle", this);
      }
    });

    this.boot.on("fulfilled", () => {
      this.booted = true;
      this.emit("booted", this);
    });
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
    await cmd.run();
  } catch (err) {
    // do nothing
  } finally {
    this.commands = this.commands - 1;
    this.onCmdEnd(cmd);
  }
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
    state: cmd.state,
    queue: this.commandQueue.length,
    commands: this.commands,
  });
  this.emit("cmdqueue", cmd);
};
Afmachine.prototype.onCmdStart = async function (cmd) {
  this.history.push({
    task: cmd.taskname,
    stage: "start",
    state: cmd.state,
  });
  await this.emit("cmdstart", cmd);
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
    this.emit("idle", this);
  }
};

Afmachine.prototype.stop = function () {
  this.adminScreen.mqtt.server.end();
  this.rpiReader.mqtt.server.end();
};

Object.assign(Afmachine.prototype, {
  // test
  test,

  // RPI Reader tasks
  readWristband,

  // Synthetic Player tasks
  pairWristband,
  unpairWristband,

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
  findTeam,

  // Session tasks
  listSession,
  startSession,
  stopSession,
  stopSessionForce,

  // Cashier tasks
  registerCashier,
  deregisterCashier,
  loginCashier,

  // Device tasks
  boot,
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
});

export { Afmachine };
