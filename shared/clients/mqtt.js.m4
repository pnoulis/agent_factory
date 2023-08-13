import { ENVIRONMENT } from "../config.js";
dnl/*
ifelse(RUNTIME, `browser`,
     import MQTT_CLIENT_LIB from "precompiled-mqtt",
     import MQTT_CLIENT_LIB from "mqtt"
     )
dnl*/

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
function getMqttClient(url, options = {}) {
return new MQTT_CLIENT_LIB.connect(url, options);
}

const getMqttClientBackend = getMqttClient.bind(
null,
ENVIRONMENT.MQTT_LOGIN_BACKEND_URL,
);

export { getMqttClient, getMqttClientBackend };
