import { WRISTBAND_COLORS, MAX_WRISTBAND_ID } from "../../constants.js";
import { randomInteger } from "js_utils/misc";

function random(sources) {
  trace("random wristband");
  const _sources = [sources]
    .flat(2)
    .filter((src) => !!src)
    .map((src) => ("tobject" in src ? src.tobject() : src));

  trace(_sources, "wrisband random _sources");

  const target = Object.assign({}, ..._sources);

  target.id ??= randomInteger(1, MAX_WRISTBAND_ID);
  target.colorCode ??= target.color
    ? WRISTBAND_COLORS[target.color]
    : randomInteger(WRISTBAND_COLORS.min, WRISTBAND_COLORS.max);

  target.color ||= WRISTBAND_COLORS[target.colorCode];
  trace(target, "wristband random target");
  return target;
}

export { random };
