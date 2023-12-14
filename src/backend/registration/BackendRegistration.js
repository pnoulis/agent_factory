import { Backend } from "../Backend.js";
import { DEVICES } from "../../constants.js";
import { ENV } from "../../config.js";
import { registrationTopics as topics } from "../../../backend-topics.js";

class BackendRegistration extends Backend {
  constructor({ deviceId, params, routes, strict } = {}) {
    deviceId = `${DEVICES[0]}_${deviceId || ENV.DEVICE_ID}`;
    super({
      routes: [].concat(
        Array.isArray(topics) ? topics : [],
        Array.isArray(routes) ? routes : [],
      ),
      params: Object.assign({}, { deviceId }, params),
      strict: strict ?? true,
    });
  }
}

export { BackendRegistration };
