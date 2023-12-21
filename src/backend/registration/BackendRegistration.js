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
    this.deviceType = DEVICES.registrationScreen;
    this.deviceId = deviceId || ENV.DEVICE_ID;
    this.roomName = roomName || ROOMS.administration1;
    this.registry.setParam("deviceId", this.deviceId);
  }
}

Object.assign(BackendRegistration.prototype, {
  listPackages: listPackages,
  registerPlayer: registerPlayer,
  loginPlayer: loginPlayer,
  scanWristband: scanWristband,
  onWristbandScan: onWristbandScan,
  onceWristbandScan: onceWristbandScan,
});

export { BackendRegistration };
