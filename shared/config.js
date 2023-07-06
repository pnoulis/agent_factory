import { detectRuntime, detectMode, getEnvar } from "js_utils/environment";

// configure import.meta
const RUNTIME = detectRuntime();
if (RUNTIME === "node" && !Object.hasOwn(import.meta, "env")) {
  Object.defineProperty(import.meta, "env", {
    enumerable: true,
    value: {},
  });
}

const ENVIRONMENT = {
  RUNTIME,
  MODE: detectMode(),
  BACKEND_MQTT_CLIENT_ID: getEnvar(
    "BACKEND_MQTT_CLIENT_ID",
    true,
    import.meta.env.BACKEND_MQTT_CLIENT_ID
  ),
  BACKEND_MQTT_TOPIC_PREFIX: getEnvar(
    "BACKEND_MQTT_TOPIC_PREFIX",
    true,
    import.meta.env.BACKEND_MQTT_TOPIC_PREFIX
  ),
  BACKEND_MQTT_DEVICE_TYPE: getEnvar(
    "BACKEND_MQTT_DEVICE_TYPE",
    true,
    import.meta.env.BACKEND_MQTT_DEVICE_TYPE
  ),
  BACKEND_MQTT_ROOM_NAME: getEnvar(
    "BACKEND_MQTT_ROOM_NAME",
    true,
    import.meta.env.BACKEND_MQTT_ROOM_NAME
  ),
  MQTT_LOGIN_BACKEND_URL: getEnvar(
    "MQTT_LOGIN_BACKEND_URL",
    true,
    import.meta.env.MQTT_LOGIN_BACKEND_URL
  ),
  MYSQLDB_LOGIN_BACKEND_URL: getEnvar(
    "MYSQLDB_LOGIN_BACKEND_URL",
    true,
    import.meta.env.MYSQLDB_LOGIN_BACKEND_URL
  ),
};

export { ENVIRONMENT };
