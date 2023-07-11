import { detectRuntime, detectMode, getEnvar } from "js_utils/environment";

const RUNTIME = detectRuntime();


if (typeof __STATIC_ENV__ !== "undefined") {
  // Means application is running within a browser and __STATIC_ENV__ has been
  // statically defined by a macro preprocessor.
  globalThis.__ENV__ = __STATIC_ENV__;
} else if (RUNTIME === "node") {
  const { loadenv } = await import("js_utils/node/loadenv");
  globalThis.__ENV__ = {};
  loadenv(null, globalThis.__ENV__);
} else {
  throw new Error("config.js failed to load __ENV__");
}

const ENVIRONMENT = {
  RUNTIME,
  MODE: detectMode(),
  BACKEND_MQTT_CLIENT_ID: getEnvar("BACKEND_MQTT_CLIENT_ID", true),
  BACKEND_MQTT_TOPIC_PREFIX: getEnvar("BACKEND_MQTT_TOPIC_PREFIX", true),
  BACKEND_MQTT_DEVICE_TYPE: getEnvar("BACKEND_MQTT_DEVICE_TYPE", true),
  BACKEND_MQTT_ROOM_NAME: getEnvar("BACKEND_MQTT_ROOM_NAME", true),
  MQTT_LOGIN_BACKEND_URL: getEnvar("MQTT_LOGIN_BACKEND_URL", true),
  MYSQLDB_LOGIN_BACKEND_URL: getEnvar("MYSQLDB_LOGIN_BACKEND_URL", true),
};

export { ENVIRONMENT };
