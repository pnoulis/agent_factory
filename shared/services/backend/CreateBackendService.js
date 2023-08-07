import { ENVIRONMENT } from "../../config.js";
import { BackendService } from "./BackendService.js";
import { getMqttClientBackend } from "../../clients/mqtt.js";

// mqtt backend client
const backendMqttClient = getMqttClientBackend();
backendMqttClient.once("connect", () => {
  console.log("Mqtt client connected!");
});

let instances = 1;
const defaultInstance = new BackendService(
  backendMqttClient,
  ENVIRONMENT.BACKEND_MQTT_ROOM_NAME,
  ENVIRONMENT.BACKEND_MQTT_DEVICE_TYPE,
  ENVIRONMENT.BACKEND_MQTT_CLIENT_ID,
);

// Creating a default instance might be toggled off in production MODE.
defaultInstance
  .start()
  .then(() => {
    defaultInstance.booted = true;
    console.log(`Backend service ${defaultInstance.id} successful boot!`);
  })
  .catch((err) => {
    console.log(err);
    console.log(`Backend service ${defaultInstance.id} failed boot!`);
    throw err;
  });

function CreateBackendService(id, roomName, deviceType) {
  if (!this && typeof this !== CreateBackendService) {
    return defaultInstance;
  } else {
    ++instances;
    if (!id) {
      id = instances.toString().padStart(3, "0");
    }
    return new BackendService(
      backendMqttClient,
      roomName || ENVIRONMENT.BACKEND_MQTT_ROOM_NAME,
      deviceType || ENVIRONMENT.BACKEND_MQTT_DEVICE_TYPE,
      id,
    );
  }
}

export { CreateBackendService };
