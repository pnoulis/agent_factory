import "./debug.js";
import "./errors.js";
import { ENV } from "./config.js";
import * as CONSTANTS from "./constants.js";
import { Mqtt } from "./Mqtt.js";
import { Afmachine } from "./afmachine/Afmachine.js";
import { MqttProxy } from "mqtt_proxy";
import { registrationTopics, rpiReaderTopics } from "../backend-topics.js";
import { DeviceAdminScreen } from "#afm/device/admin-screen/DeviceAdminScreen.js";
import { DeviceRPIReader } from "#afm/device/rpi-reader/DeviceRPIReader.js";

async function createClientAfmachine() {
  try {
    const clientMqtt = await Mqtt.connectAsync(ENV.AFADMIN_SERVER_URL);

    const adminScreen = new DeviceAdminScreen(
      {
        id: CONSTANTS.DEVICE_IDS.adminScreen,
        type: CONSTANTS.DEVICE_TYPES.adminScreen,
        room: CONSTANTS.ROOM_TYPES.admin1,
      },
      new MqttProxy({
        server: clientMqtt,
        registry: {
          routes: Object.values(registrationTopics),
          strict: true,
          params: {
            deviceId: CONSTANTS.DEVICE_IDS.adminScreen,
          },
        },
      }),
    );

    const rpiReader = new DeviceRPIReader(
      {
        id: CONSTANTS.DEVICE_IDS.rpiReader,
        type: CONSTANTS.DEVICE_TYPES.rpiReader,
        room: CONSTANTS.ROOM_TYPES.admin1,
      },
      new MqttProxy({
        server: clientMqtt,
        registry: {
          routes: Object.values(rpiReaderTopics),
          strict: true,
          params: {
            deviceId: CONSTANTS.DEVICE_IDS.rpiReader,
          },
        },
      }),
    );

    const afm = new Afmachine(adminScreen, rpiReader);
    return afm;
  } catch (err) {
    debug(err);
  }
}

export { createClientAfmachine };
