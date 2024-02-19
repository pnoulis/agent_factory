import { removeIndex } from "./misc/misc.js";
import { ENV } from "./config.js";
import * as CONSTANTS from "./constants.js";

let afm;
let listeners = {};

function registerListener(event, name, listener) {
  const registered = listeners[event]?.find((l) => l.name === name);
  if (registered) {
    trace(`'${name}' listener is already registered`);
    return;
  }
  listeners[event] ??= [];
  listeners[event].push({ name, listener });
  trace(`Registering listener: '${name}'`);
  globalThis.afm.on(event, listener);
}

function deregisterListener(event, name) {
  if (arguments.length < 2) {
    trace("Deregistering all listeners");
    for (const [k, v] of Object.entries(listeners)) {
      for (let i = 0; i < v.length; i++) {
        trace(`Deregistering listener: '${v[i].name}'`);
        globalThis.afm.removeListener(k, v[i].listener);
      }
      listeners[k] = [];
    }
  } else {
    const listener = listeners[event]?.findIndex((l) => l.name === name);
    if (listener < 0) {
      throw new Error(`Could not find listener: '${name}'`);
    }
    trace(`Deregistering listener: '${name}'`);
    globalThis.afm.removeListener(event, listener);
    listeners[event] = removeIndex(listeners[event], listener);
  }
}

async function getafm(waitBoot = true) {
  if (!afm) {
    const { Afmachine } = await import("#afm/Afmachine.js");
    const { Mqtt } = await import("./Mqtt.js");
    const { MqttProxy } = await import("mqtt_proxy");
    const { registrationTopics, rpiReaderTopics } = await import(
      "../backend-topics.js"
    );
    const { DeviceAdminScreen } = await import(
      "#afm/device/admin-screen/DeviceAdminScreen.js"
    );
    const { DeviceRPIReader } = await import(
      "#afm/device/rpi-reader/DeviceRPIReader.js"
    );

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
    afm = new Afmachine(adminScreen, rpiReader);
    afm.registerListener = registerListener;
    afm.deregisterListener = deregisterListener;

    afm.on("error", (cmd) => {
      const { msg } = cmd;
      const { message, cause } = cmd.errs.at(-1);
      console.error(msg);
      console.error(message);
      if (cause.message) {
        console.error(cause.message);
      }
    });
    globalThis.afm = afm;
  }

  return afm.booted || !waitBoot
    ? Promise.resolve(afm)
    : new Promise((resolve) =>
        getafm(false).then(() => afm.on("booted", (afm) => resolve(afm))),
      );
}

export { getafm };
