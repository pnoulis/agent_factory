import { ENV } from "./config.js";
import * as CONSTANTS from "./constants.js";
import { Afmachine } from "./afmachine/Afmachine.js";
import { Mqtt } from "./Mqtt.js";
import { MqttProxy } from "mqtt_proxy";
import { registrationTopics, rpiReaderTopics } from "../backend-topics.js";
import { DeviceAdminScreen } from "./afmachine/device/admin-screen/DeviceAdminScreen.js";
import { DeviceRPIReader } from "./afmachine/device/rpi-reader/DeviceRPIReader.js";

let afm;

function getafmNode() {
  if (!afm) {
    const clientMqtt = Mqtt.connect(ENV.AFADMIN_SERVER_URL);
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
    afm = new Afmachine(adminScreen, rpiReader);
    afm.on("error", (cmd) => {
      const { msg } = cmd;
      const { message, cause } = cmd.errs.at(-1);
      console.error(msg);
      console.error(message);
      if (cause?.message) {
        console.error(cause.message);
      }
    });
    globalThis.afm = afm;
    process.on("unhandledRejection", (err) => {
      console.log("UNHANDLED_REJECTION:");
      console.log(err);
      console.log(err);
    });
  }
  return afm;
}

export { getafmNode };
