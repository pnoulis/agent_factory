import { ENVIRONMENT } from "../../config.js";
import { BackendService } from "./BackendService.js";
import { getMqttClient } from "../../clients/mqtt.js";

// mqtt backend client
const backendMqttClient = getMqttClient(ENVIRONMENT.MQTT_LOGIN_BACKEND_URL);
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

defaultInstance
  .boot()
  .then((res) => {
    console.log(`Backend service ${defaultInstance.id} successful booted!`);
  })
  .catch(function (err) {
    console.log(err);
    console.log(`Backend service ${defaultInstance.id} failed boot!`);
    throw err;
  });

function CreateBackendService(id, roomName, deviceType) {
  if (this === undefined) {
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
