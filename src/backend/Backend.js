import { Mqtt } from "../Mqtt.js";
import { MqttProxy } from "mqtt_proxy";
import { ENV } from "../config.js";
import { boot } from "./boot.js";

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

    this.server.on("connect", () => {
      console.log(`Backend connected -> ${ENV.AFADMIN_SERVER_URL}`);
    });
    this.server.on("end", () => {
      console.log(`Backend disconnected -> ${ENV.AFADMIN_SERVER_URL}`);
    });
  }
  start() {
    return this.boot();
  }
  stop() {
    this.server.end();
  }
}

Object.assign(Backend.prototype, {
  boot,
});

export { Backend };
