import { ENVIRONMENT } from "../../config.js";
import { BackendService } from "./BackendService.js";
import { randomInteger } from "js_utils/misc";
import { WRISTBAND_COLORS } from "../../constants.js";

const DEVICE_TYPE = "RPI_READER";

function scanWristband(id, color) {
  id ||= randomInteger(1, 999);
  color ||= randomInteger(1, WRISTBAND_COLORS.length - 1);
  return this.publish(`/themaze/${this.id}/rpi/wristbandScan`, {
    timestamp: Date.now(),
    wristbandNumber: id,
    wristbandColor: color,
  }).then(() => ({ id, color }));
}

async function createRPIReaderService(mqttClient, options = {}) {
  options.roomName ||= ENVIRONMENT.BACKEND_MQTT_ROOM_NAME;
  options.deviceId ||= `${ENVIRONMENT.BACKEND_MQTT_ROOM_NAME}Reader`;
  if (!mqttClient) {
    const { getMqttClientBackend } = await import(
      `../../clients/mqtt.${ENVIRONMENT.RUNTIME}.js`
    );
    mqttClient = getMqttClientBackend();
  }
  mqttClient.once("connect", function () {
    console.log(`Mqtt client connected to ${mqttClient.options.href}`);
  });
  const rpiReaderService = new BackendService(
    mqttClient,
    options.roomName,
    DEVICE_TYPE,
    options.deviceId,
  );
  rpiReaderService.proxy.registry.strict = false;
  rpiReaderService.scanWristband = scanWristband.bind(rpiReaderService);
  return rpiReaderService
    .start()
    .then(() => {
      rpiReaderService.booted = true;
      console.log(`RPI reader service ${rpiReaderService.id} successful boot!`);
      return rpiReaderService;
    })
    .catch((err) => {
      console.log(err);
      console.log(`RPI reader service ${rpiReaderService.id} failed boot!`);
      throw err;
    });
}

export { createRPIReaderService };
