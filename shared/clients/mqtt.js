import { ENVIRONMENT } from "../config.js";

let MQTT_CLIENT_LIB = undefined;
if (ENVIRONMENT.RUNTIME === "node") {
  MQTT_CLIENT_LIB = await import("mqtt");
} else {
  MQTT_CLIENT_LIB = await import("precompiled-mqtt");
}

/**
 * Connect to a mqtt server
 *
 * @param {string} url - mqtt server host
 * @returns {mqttClient} - callback based
 *
 * @example
 * import { mqttClient } from './mqtt.js';
 *
 * const mqttClientBackend = mqttClient(MQTT_LOGIN_BACKEND_URL);
 *
 * mqttClientBackend.once('connect', () => console.log('connected'));
 **/
function getMqttClient(url) {
  return new MQTT_CLIENT_LIB.connect(url);
}

export { getMqttClient };
