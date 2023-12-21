import { Backend } from "../Backend.js";
import { DEVICES, ROOMS } from "../../constants.js";
import { ENV } from "../../config.js";
import { registrationTopics as staticRoutes } from "../../../backend-topics.js";
import { listPackages } from "./listPackages.js";
import { registerPlayer } from "./registerPlayer.js";
import { loginPlayer } from "./loginPlayer.js";
import {
  scanWristband,
  onWristbandScan,
  onceWristbandScan,
} from "./scanWristband.js";

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
    this.deviceType = DEVICES[0];
    this.deviceId = deviceId || ENV.DEVICE_ID;
    this.roomName = roomName || ROOMS[0];
    this.registry.setParam("deviceId", this.deviceId);
  }
}

Backend.prototype.listPackages = listPackages;
Backend.prototype.registerPlayer = registerPlayer;
Backend.prototype.loginPlayer = loginPlayer;
Backend.prototype.scanWristband = scanWristband;
Backend.prototype.onWristbandScan = onWristbandScan;
Backend.prototype.onceWristbandScan = onceWristbandScan;

export { BackendRegistration };
