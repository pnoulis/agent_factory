import {
  WRISTBAND_COLORS,
  MAX_WRISTBAND_ID,
  MIN_WRISTBAND_ID,
  MAX_WRISTBAND_CC,
  MIN_WRISTBAND_CC,
} from "../../constants.js";
import { randomInteger } from "js_utils/misc";
import { normalize } from "./normalize.js";

/*
  debug(Wristband.random())
  debug(Wristband.random(null, { state: "unpaired" }));
  debug(Wristband.random(null, { state: "pairing" }));
  debug(Wristband.random(null, { state: "unpairing" }));
  debug(Wristband.random(null, { state: "paired" }));
 */
function random(sources, options) {
  trace("random wristband");
  trace(sources, "wristband random sources");

  const target = normalize(sources, options);
  trace(target, "wristband random normalized target");

  switch (target.state) {
    case "unpaired":
    // fall through
    case "pairing":
      target.id = null;
      target.colorCode = null;
      target.color = null;
      break;
    case "unpairing":
    // fall through
    case "paired":
      target.id ||= randomInteger(MIN_WRISTBAND_ID, MAX_WRISTBAND_ID);
      target.colorCode ||= target.color
        ? WRISTBAND_COLORS[target.color]
        : randomInteger(MIN_WRISTBAND_CC, MAX_WRISTBAND_CC);
      target.color ||= WRISTBAND_COLORS[target.colorCode];
      break;
    default:
      throw new Error(`Unrecognized wristband target state: '${target.state}'`);
  }

  trace(target, "wristband random target");
  return target;
}

export { random };
