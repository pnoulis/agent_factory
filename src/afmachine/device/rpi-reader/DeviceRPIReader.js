import { Device } from "../Device.js";
import { readWristband } from "./readWristband.js";

class DeviceRPIReader extends Device {
  constructor(device, clientMqtt) {
    super(device);
    this.mqtt = clientMqtt;
  }
}

DeviceRPIReader.prototype.readWristband = readWristband;

export { DeviceRPIReader };
