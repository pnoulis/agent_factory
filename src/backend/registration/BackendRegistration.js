import { Backend } from "../Backend.js";
import { DEVICES, ROOMS } from "../../constants.js";
import { ENV } from "../../config.js";
import { registrationTopics as topics } from "../../../backend-topics.js";

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

  boot() {
    return this.publish("boot", {
      timestamp: Date.now(),
      deviceId: this.deviceId,
      deviceType: this.deviceType,
      roomName: this.roomName,
    }).then((res) => {
      console.log(`Device ${this.deviceType} booted -> ${this.deviceId}`);
      return res;
    });
  }
}

export { BackendRegistration };
