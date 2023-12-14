import { Mqtt } from "../Mqtt.js";
import { MqttProxy } from "mqtt_proxy";
import { ENV } from "../config.js";

class Backend extends MqttProxy {
  constructor({ routes, params, strict } = {}) {
    super({
      server: new Mqtt.connect(ENV.AFADMIN_SERVER_URL),
      registry: {
        routes: routes ?? [],
        params: params ?? {},
        strict: strict ?? false,
      },
    });
  }
}

export { Backend };
