import { DEVICE_IDS, DEVICE_TYPES, ROOM_TYPES } from "../../constants.js";
import { normalize } from "./normalize.js";
import { randomInteger } from "js_utils/misc";

function random(sources) {
  trace("random device");
  trace(sources, "device random sources");

  const target = normalize(sources);
  trace(target, "device random normalized sources");

  const devices = Object.keys(DEVICE_IDS);
  const device = devices.at(randomInteger(0, devices.length - 1));
  target.id ||= DEVICE_IDS[device];
  target.type ||= DEVICE_TYPES[device];

  const rooms = Object.keys(ROOM_TYPES);
  target.room ||= Object.values(ROOM_TYPES).at(
    randomInteger(0, rooms.length - 1),
  );

  trace(target, "device random target");
  return target;
}

export { random };
