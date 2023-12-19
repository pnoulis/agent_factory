import { Backend } from "../Backend.js";
import { DEVICES, ROOMS } from "../../constants.js";
import { ENV } from "../../config.js";
import { registrationTopics as topics } from "../../../backend-topics.js";
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
        Array.isArray(topics) ? topics : [],
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

Object.assign(Backend.prototype, {
  listPackages,
  registerPlayer,
  loginPlayer,
  scanWristband,
  onWristbandScan,
  onceWristbandScan,
});

export { BackendRegistration };
