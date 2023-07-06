import { ENVIRONMENT } from "../config.js";

let MQTT_CLIENT_LIB = undefined;
if (ENVIRONMENT.RUNTIME === "node") {
  MQTT_CLIENT_LIB = await import("mqtt");
} else {
  MQTT_CLIENT_LIB = await import("precompiled-mqtt");
}

function mqttClient(url) {
  return new MQTT_CLIENT_LIB.connect(url);
}

export { mqttClient };
