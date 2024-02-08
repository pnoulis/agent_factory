import { randomInteger, randomReal } from "js_utils/misc";
import { PACKAGE_TYPES, PACKAGES } from "../../constants.js";
import { t_stomls, t_stomin, t_htomls } from "../../misc/misc.js";
import { normalize } from "./normalize.js";

function random(sources, options) {
  trace("random package");
  trace(sources, "package random sources");
  trace(options, "package random options");

  const target = normalize(sources, options);
  trace(target, "package random normalized sources");

  // package type (missions || time)
  const types = Object.values(PACKAGE_TYPES);
  target.type ||= types.at(randomInteger(0, types.length - 1));

  // id and cost
  target.id ||= randomInteger(1, 5000);
  target.cost ||= randomReal(1, 500);

  // amount and name
  const pkgs = PACKAGES.filter((pkg) => pkg.type === target.type);
  const { amount, name } = pkgs.at(randomInteger(0, pkgs.length - 1));
  target.amount ||= amount;
  target.name ||= name;

  // remainder props are dependent on _options.targetState and type of package:
  // amount, t_start, t_end, remainder
  switch (target.type) {
    case PACKAGE_TYPES.missions:
      switch (target.state) {
        case "unregistered":
        // fall through
        case "registered":
          target.t_start = null;
          target.t_end = null;
          target.remainder = target.amount;
          break;
        case "playing":
          target.t_start =
            Date.now() - Math.floor(t_htomls(1) / randomInteger(1, 4));
          target.t_end = null;
          target.remainder = Math.floor(target.amount / randomInteger(1, 4));
          break;
        case "completed":
          target.t_start =
            Date.now() - Math.floor(t_htomls(1) / randomInteger(1, 4));
          target.t_end = target.t_start + t_htomls() / 2;
          target.remainder = 0;
          break;
        default:
          throw new Error(
            `Unrecognized package target state: '${target.state}'`,
          );
      }
      break;
    case PACKAGE_TYPES.time:
      const now = Date.now();
      switch (target.state) {
        case "unregistered":
        // fall through
        case "registered":
          target.t_start = null;
          target.t_end = null;
          // min to ms
          target.amount = t_stomls(t_stomin(target.amount, true));
          target.remainder = target.amount;
          break;
        case "playing":
          target.amount = t_stomls(t_stomin(target.amount, true));
          target.t_start =
            now - Math.floor(target.amount / randomInteger(2, 4));
          target.t_end = null;
          target.remainder = Math.floor(
            Math.abs(now - (target.t_start + target.amount)),
          );
          break;
        case "completed":
          target.amount = t_stomls(t_stomin(target.amount, true));
          target.t_start =
            now - Math.floor(target.amount / randomInteger(1, 4));
          target.t_end = target.t_start + target.amount;
          target.remainder = 0;
          break;
        default:
          throw new Error(
            `Unrecognized package target state: '${target.state}'`,
          );
      }
      break;
    default:
      throw new Error(`Unrecognized package target type: '${target.type}'`);
  }

  trace(target, "package random target");
  return target;
}

export { random };
