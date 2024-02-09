import "./debug.js";
import "./errors.js";
import { ENV } from "./config.js";
import * as CONSTANTS from "./constants.js";
import { Afmachine } from './afmachine/Afmachine.js';
// import { DeviceAdminScreen } from "#afm/device/admin-screen/DeviceAdminScreen.js";
// import { DeviceRPIReader } from "#afm/device/rpi-reader/DeviceRPIReader.js";
// import { registrationTopics, rpiReaderTopics } from "../backend-topics.js";
// import { Mqtt } from "./Mqtt.js";

function createClientAfmachine() {
  console.log(ENV);
  console.log(CONSTANTS);
}

const client = {};
export { createClientAfmachine };
