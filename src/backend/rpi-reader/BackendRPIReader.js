import { Backend } from "../Backend.js";
import { DEVICES } from "../../constants.js";
import { ENV } from "../../config.js";
import { rpiReaderTopics as topics } from "../../../in.backend-topics.js";

class BackendRPIReader extends Backend {
  constructor({ deviceId, params, routes, strict } = {}) {
    deviceId = `${DEVICES[1]}_${deviceId || ENV.DEVICE_ID}`;
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

export { BackendRPIReader };
