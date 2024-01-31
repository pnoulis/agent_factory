import { Backend } from "../Backend.js";
import { DEVICES, ROOMS } from "../../constants.js";
import { ENV } from "../../config.js";
import { registrationTopics as staticRoutes } from "../../../backend-topics.js";

// player topics
import { registerPlayer } from "./registerPlayer.js";
import { loginPlayer } from "./loginPlayer.js";

// wristband topics
import { scanWristband } from "./scanWristband.js";
import { getWristbandInfo } from "./getWristbandInfo.js";
import { registerWristband } from "./registerWristband.js";
import { deregisterWristband } from "./deregisterWristband.js";

// Device topics
import { updateDevice } from "./updateDevice.js";

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

class BackendRegistration extends Backend {
  constructor({ deviceId, roomName, params, routes, strict } = {}) {
    super({
      routes: [].concat(
        Object.values(staticRoutes),
        Array.isArray(routes) ? routes : [],
      ),
      params,
      strict: strict ?? true,
    });
    this.deviceType = DEVICES.registrationScreen;
    this.deviceId = deviceId || ENV.DEVICE_ID;
    this.roomName = roomName || ROOMS.administration1;
    this.registry.setParam("deviceId", this.deviceId);
  }
}

Object.assign(BackendRegistration.prototype, {
  // player topics
  registerPlayer,
  loginPlayer,
  // wristband topics
  scanWristband,
  getWristbandInfo,
  registerWristband,
  deregisterWristband,

  // Device topics
  updateDevice,

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

export { BackendRegistration };
