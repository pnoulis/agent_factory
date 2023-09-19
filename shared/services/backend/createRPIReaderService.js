import { ENVIRONMENT } from "../../config.js";
import { BackendService } from "./BackendService.js";
import { getMqttClientBackend } from "../../clients/mqtt.js";
import { randomInteger } from "js_utils/misc";
import { smallid } from "js_utils/uuid";
import { WRISTBAND_COLORS } from "../../constants.js";

// mqtt backend client
const backendMqttClient = getMqttClientBackend();
backendMqttClient.once("connect", () => {
  console.log(`Mqtt client connected to ${backendMqttClient.options.href}`);
});

const deviceId = `${ENVIRONMENT.BACKEND_MQTT_ROOM_NAME}Reader`;
const deviceType = "RPI_READER";
const rpiReaderService = new BackendService(
  backendMqttClient,
  ENVIRONMENT.BACKEND_MQTT_ROOM_NAME,
  deviceType,
  deviceId,
);
console.log(rpiReaderService);

rpiReaderService.proxy.registry.strict = false;

rpiReaderService.scanWristband = function (id, color) {
  // 0 or null or undefined trigger random
  id ||= randomInteger(1, 5000);
  color ||= randomInteger(1, WRISTBAND_COLORS.length - 1);
  return rpiReaderService
    .publish(`/themaze/${deviceId}/rpi/wristbandScan`, {
      timestamp: Date.now(),
      wristbandNumber: id,
      wristbandColor: color,
    })
    .then(() => ({ id, color }));
};

function createRPIReaderService() {
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
