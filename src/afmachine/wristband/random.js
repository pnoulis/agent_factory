import { WRISTBAND_COLORS, MAX_WRISTBAND_ID } from "../constants.js";
import { randomInteger } from "js_utils/misc";

function random(sources) {
  const _sources = [sources].flat(2).filter((src) => !!src);

  const target = Object.assign({}, ..._sources);

  target.id ??= randomInteger(1, MAX_WRISTBAND_ID);
  target.colorCode ??= randomInteger(
    WRISTBAND_COLORS.min,
    WRISTBAND_COLORS.max,
  );
  target.color = WRISTBAND_COLORS[target.colorCode];
  return target;
}

export { random };
