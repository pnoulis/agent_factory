import { Backend } from "../Backend.js";
import { DEVICE_TYPES, DEVICE_IDS, ROOM_TYPES } from "../../constants.js";
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
    this.deviceType = DEVICE_TYPES.rpiReader;
    this.deviceId = deviceId || DEVICE_IDS.rpiReader,
    this.roomName = roomName || ROOM_TYPES.admin1;
    this.registry.setParam("deviceId", this.deviceId);
  }
}

Object.assign(BackendRPIReader.prototype, {
  read: emulateWristbandScan,
});

export { BackendRPIReader };
