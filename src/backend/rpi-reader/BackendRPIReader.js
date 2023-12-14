import { Backend } from "../Backend.js";
import { DEVICES } from "../../constants.js";
import { ENV } from "../../config.js";
import { rpiReaderTopics as topics } from "../../../in.backend-topics.js";

class BackendRPIReader extends Backend {
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

export { BackendRPIReader };
