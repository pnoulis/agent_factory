import { WRISTBAND_COLORS, MAX_WRISTBAND_ID } from "../constants.js";
import { randomInteger, isArray } from "js_utils/misc";

function random(sources, options = {}) {
  if (!isArray(sources)) {
    sources = [sources];
  }

  let target = {};
  for (let i = 0; i < sources.length; i++) {
    target = {
      ...target,
      ...sources[i],
    };
  }

  target.id ??= randomInteger(1, MAX_WRISTBAND_ID);
  target.colorCode ??= randomInteger(1, WRISTBAND_COLORS.length - 1);
  target.color = WRISTBAND_COLORS[target.colorCode];
  return target;
}

export { random };
