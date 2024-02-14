import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

import { ENV } from "../../config.js";
import * as CONSTANTS from "../../constants.js";
const { Mqtt } = await import("../../Mqtt.js");
const { MqttProxy } = await import("mqtt_proxy");
import {
  registrationTopics,
  rpiReaderTopics,
} from "../../../backend-topics.js";
import { DeviceAdminScreen } from "../device/admin-screen/DeviceAdminScreen.js";
import { DeviceRPIReader } from "../device/rpi-reader/DeviceRPIReader.js";

new Task("boot", Command);

function Command(opts) {
  const afm = this || Command.afm;
  const promise = Command.createCommand(
    afm,
    {
      opts,
    },
    (cmd) => afm.runCommand(cmd),
  );
  return promise;
}

Command.middleware = [
  async (ctx, next) => {

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

    ctx.afm.adminScreen = adminScreen;
    ctx.afm.rpiReader = rpiReader;
    ctx.args.device = ctx.afm.adminScreen;
    ctx.req = {
      timestamp: ctx.t_start,
      deviceId: ctx.args.device.id,
      deviceType: ctx.args.device.type,
      roomName: ctx.args.device.room,
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.adminScreen.boot(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = `Failed to start Agent Factory`;
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = `Successfully started Agent Factory`;
  cmd.resolve(cmd.res);
};

export { Command as boot };
