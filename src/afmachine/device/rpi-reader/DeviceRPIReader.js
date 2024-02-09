import { Device } from "../Device.js";
import { emulateWristbandScan } from "./emulateWristbandScan.js";

class DeviceRPIReader extends Device {
  constructor(device, clientMqtt) {
    super(device);
    this.mqtt = clientMqtt;
  }
}

Object.assign(DeviceRPIReader.prototype, {
  read: emulateWristbandScan,
});

export { DeviceRPIReader };
