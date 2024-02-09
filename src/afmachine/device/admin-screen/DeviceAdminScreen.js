import { Device } from "../Device.js";

// Player topics
import { registerPlayer } from "./registerPlayer.js";
import { loginPlayer } from "./loginPlayer.js";
import { searchPlayer } from "./searchPlayer.js";

// Wristband topics
import { scanWristband } from "./scanWristband.js";
import { getWristbandInfo } from "./getWristbandInfo.js";
import { registerWristband } from "./registerWristband.js";
import { deregisterWristband } from "./deregisterWristband.js";

// Team topics
import { registerTeam } from "./registerTeam.js";
import { registerGroupTeam } from "./registerGroupTeam.js";
import { addTeamPackage } from "./addTeamPackage.js";
import { removeTeamPackage } from "./removeTeamPackage.js";
import { startTeam } from "./startTeam.js";

// Cashier topics
import { registerCashier } from "./registerCashier.js";
import { deregisterCashier } from "./deregisterCashier.js";
import { loginCashier } from "./loginCashier.js";

// Session topics
import { startSession } from "./startSession.js";
import { stopSession } from "./stopSession.js";

// Device topics
import { updateDevice } from "./updateDevice.js";
import { updateScoreboardDeviceView } from "./updateScoreboardDeviceView.js";

// List topics
import { listPackages } from "./listPackages.js";
import { listPlayers } from "./listPlayers.js";
import { listPlayersWithWristband } from "./listPlayersWithWristband.js";
import { listTeams } from "./listTeams.js";
import { listCashiers } from "./listCashiers.js";
import { listDevices } from "./listDevices.js";
import { listScoreboard } from "./listScoreboard.js";
import { listScoreboardDevices } from "./listScoreboardDevices.js";
import { listScoreboardViews } from "./listScoreboardViews.js";

class DeviceAdminScreen extends Device {
  constructor(device, clientMqtt) {
    super(device);
    this.mqtt = clientMqtt;
  }
}

Object.assign(DeviceAdminScreen.prototype, {
  // Player topics
  registerPlayer,
  loginPlayer,
  searchPlayer,

  // Wristband topics
  scanWristband,
  getWristbandInfo,
  registerWristband,
  deregisterWristband,

  // Team topics
  registerTeam,
  registerGroupTeam,
  addTeamPackage,
  removeTeamPackage,
  startTeam,

  // Cashier topics
  registerCashier,
  deregisterCashier,
  loginCashier,

  // Session topics
  startSession,
  stopSession,

  // Device topics
  updateDevice,
  updateScoreboardDeviceView,

  // List topics
  listPackages,
  listPlayers,
  listPlayersWithWristband,
  listTeams,
  listCashiers,
  listDevices,
  listScoreboard,
  listScoreboardDevices,
  listScoreboardViews,
});

export { DeviceAdminScreen };
