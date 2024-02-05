import { randomInteger, randomReal } from "js_utils/misc";
import { PACKAGE_TYPES, PACKAGES } from "../../constants.js";
import { t_stomls, t_stomin } from "../../misc/misc.js";
import { normalize } from './normalize.js';

function random(sources) {
  trace("random package");
  trace(sources, 'package random sources');

  const target = normalize(sources);
  target.id ??= randomInteger(1, 5000);
  target.cost ??= randomReal(1, 5000);
  target.type ||= PACKAGE_TYPES.at(randomInteger(0, 1));
  const packages = PACKAGES.filter((pkg) => pkg.type === target.type);
  Object.assign(target, packages.at(randomInteger(0, packages.length - 1)));

  const now = Date.now();
  switch (target.type) {
    case "mission":
      target.t_start = now;
      target.remainder = Math.floor(target.amount / randomInteger(1, 2));
      break;
    case "time":
      const amountMs = t_stomls(t_stomin(target.amount, true));
      target.t_start = now - amountMs / randomInteger(1, 2);
      target.remainder = Math.floor(
        Math.abs(now - (target.t_start + amountMs)),
      );
      break;
    default:
      throw TypeError(`Unrecognized package type: '${target.type}'`);
  }

  if (target.remainder === 0) {
    target.active = false;
    // Should it be inactive because it has been completed?
    target.t_end = !!randomInteger(0, 1) ? now : null;
  } else {
    target.t_end = null;
    target.active = true;
  }

  trace(target, "package random target");
  return target;
}

export { random };
