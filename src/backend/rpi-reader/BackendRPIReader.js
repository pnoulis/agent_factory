import { Backend } from "../Backend.js";
import { DEVICES, ROOMS } from "../../constants.js";
import { ENV } from "../../config.js";
import { rpiReaderTopics as staticRoutes } from "../../../backend-topics.js";
import { emulateWristbandScan } from "./emulateWristbandScan.js";

class BackendRPIReader extends Backend {
  constructor({ deviceId, roomName, params, routes, strict } = {}) {
    super({
      routes: [].concat(
        Object.values(staticRoutes),
        Array.isArray(routes) ? routes : [],
      ),
      params,
      strict: strict ?? true,
    });
    this.deviceType = DEVICES.rpiReader;
    this.deviceId = "ADMINISTRATION1Reader";
    this.roomName = roomName || ROOMS.administration1;
    this.registry.setParam("deviceId", this.deviceId);
  }
}

Object.assign(BackendRPIReader.prototype, {
  read: emulateWristbandScan,
});

export { BackendRPIReader };
