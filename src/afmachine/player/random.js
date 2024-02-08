import { generateRandomName } from "js_utils/misc";
import { smallid, uuid } from "js_utils/uuid";
import { Wristband } from "../wristband/Wristband.js";
import { normalize } from "./normalize.js";

function random(sources, options = {}) {
  trace("random player");
  trace(sources, "player random sources");
  trace(options, "player random options");

  const _options = {
    depth: options.depth ?? 1,
    longtext: options.longtext || false,
  };

  const target = normalize(sources, options);
  trace(target, "player random normalized sources");

  switch (target.state) {
    case "unregistered":
      target.username = null;
      target.name = null;
      target.surname = null;
      target.email = null;
      break;
    case "inTeam":
    // fall through
    case "playing":
    // fall through
    case "registered":
      let surname, name, username;
      if (_options.longtext) {
        username = surname = name = uuid();
      } else {
        [surname, name, username] =
          `${generateRandomName()}_${smallid()}`.split("_");
      }
      target.username ||= username;
      target.name ||= name;
      target.surname ||= surname;
      target.email ||= `${username}@gmail.com`;
      break;
    default:
  }

  if (_options.depth) {
    target.wristband = Wristband.random(target.wristband, options.wristband);
  }

  trace(target, "player random target");
  return target;
}
export { random };
