import { random } from "./random.js";
import { normalize } from "./normalize.js";
import { tobject } from "./tobject.js";
import { validate } from "./validate.js";

class Device {
  static random = random;
  static normalize = normalize;
  static tobject = tobject;
  static validate = validate;

  constructor(device) {
    device ??= {};
    this.id = device.id || null;
    this.type = device.type || null;
    this.room = device.room || null;
    this.mqtt = mqttClient || null;
  }
  normalize(sources, options) {
    const device = Device.normalize([this, sources], options);
    Object.assign(this, device);
    return this;
  }
  fill(sources, options) {
    const device = Device.random([this, sources], options);
    Object.assign(this, device);
    return this;
  }
  tobject(options) {
    return Device.tobject(this, options);
  }
}

// import { Mqtt } from "../Mqtt.js";
// import { MqttProxy } from "mqtt_proxy";
// import { ENV } from "../config.js";
// class Backend extends MqttProxy {
//   constructor({ routes, params, strict } = {}) {
//     super({
//       server: new Mqtt.connect(ENV.AFADMIN_SERVER_URL),
//       registry: {
//         routes: routes ?? [],
//         params: params ?? {},
//         strict: strict ?? false,
//       },
//     });

//     this.server.on("connect", () => {
//       console.log(`Backend connected -> ${ENV.AFADMIN_SERVER_URL}`);
//     });
//     this.server.on("end", () => {
//       console.log(`Backend disconnected -> ${ENV.AFADMIN_SERVER_URL}`);
//     });
//   }
//   start() {
//     return this.boot();
//   }
//   stop() {
//     this.server.end();
//   }
// }

// Object.assign(Backend.prototype, {
//   boot,
// });

export { Device };
