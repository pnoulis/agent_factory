import { generateRandomName } from "js_utils/misc";
import { smallid, uuid } from "js_utils/uuid";
import { Wristband } from "../wristband/Wristband.js";
import { normalize } from "./normalize.js";

function random(sources, options) {
  trace("random player");
  trace(sources, "player random sources");
  trace(options, "player random options");

  options ||= {};
  const _options = {
    longtext: options.longtext || false,
  };

  const target = normalize(sources, options);
  trace(target, "player random normalized sources");

  let surname, name, username;
  if (_options.longtext) {
    username = surname = name = uuid();
  } else {
    [surname, name, username] = `${generateRandomName()}_${smallid()}`.split(
      "_",
    );
  }
  target.username ||= username;
  target.name ||= name;
  target.surname ||= surname;
  target.email ||= `${username}@gmail.com`;

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
      target.wristband = Wristband.random(target.wristband, {
        state: "paired",
      });
      break;
    case "registered":
      target.wristband = Wristband.random(target.wristband, options.wristband);
      break;
    default:
      throw new Error(`Unrecognized player target state: '${target.state}'`);
  }

  trace(target, "player random target");
  return target;
}
export { random };
