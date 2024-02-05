import { WRISTBAND_COLORS, MAX_WRISTBAND_ID } from "../../constants.js";
import { randomInteger } from "js_utils/misc";
import { normalize } from "./normalize.js";

function random(sources) {
  trace("random wristband");
  trace(sources, 'wristband random sources');

  const target = normalize(sources);
  trace(target, 'wristband normalized target');
  target.id ??= randomInteger(1, MAX_WRISTBAND_ID);
  target.colorCode ??= target.color
    ? WRISTBAND_COLORS[target.color]
    : randomInteger(WRISTBAND_COLORS.min, WRISTBAND_COLORS.max);

  target.color ||= WRISTBAND_COLORS[target.colorCode];
  trace(target, "wristband random target");
  return target;
}

export { random };
