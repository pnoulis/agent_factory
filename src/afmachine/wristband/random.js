import {
  WRISTBAND_COLORS,
  MAX_WRISTBAND_ID,
  MIN_WRISTBAND_ID,
  MAX_WRISTBAND_CC,
  MIN_WRISTBAND_CC,
} from "../../constants.js";
import { randomInteger } from "js_utils/misc";
import { normalize } from "./normalize.js";

function random(sources) {
  trace("random wristband");
  trace(sources, "wristband random sources");

  const target = normalize(sources);
  trace(target, "wristband normalized target");
  target.id ||= randomInteger(MIN_WRISTBAND_ID, MAX_WRISTBAND_ID);
  target.colorCode ||= target.color
    ? WRISTBAND_COLORS[target.color]
    : randomInteger(MIN_WRISTBAND_CC, MAX_WRISTBAND_CC);

  target.color ||= WRISTBAND_COLORS[target.colorCode];
  trace(target, "wristband random target");
  return target;
}

export { random };
