import { ENVIRONMENT } from "../../config.js";
import { BackendService } from "./BackendService.js";
import { getMqttClientBackend } from "../../clients/mqtt.browser.js";

const DEVICE_TYPE = "REGISTRATION_SCREEN";

async function createRegistrationService(mqttClient, options = {}) {
  options.roomName ||= ENVIRONMENT.BACKEND_MQTT_ROOM_NAME;
  options.deviceId ||= ENVIRONMENT.BACKEND_MQTT_CLIENT_ID;
  if (!mqttClient) {
    // const { getMqttClientBackend } = await import(
    //   `../../clients/mqtt.${ENVIRONMENT.RUNTIME}.js`
    // );
    mqttClient = getMqttClientBackend();
  }
  mqttClient.once("connect", function () {
    console.log(`Mqtt client connected to ${mqttClient.options.href}`);
  });
  const registrationService = new BackendService(
    mqttClient,
    options.roomName,
    DEVICE_TYPE,
    options.deviceId,
  );
  return registrationService
    .start()
    .then(() => {
      registrationService.booted = true;
      console.log(
        `Registration service ${registrationService.id} successful boot!`,
      );
      return registrationService;
    })
    .catch((err) => {
      console.log(err);
      console.log(
        `Registration service ${registrationService.id} failed boot!`,
      );
      throw err;
    });
}

export { createRegistrationService };
