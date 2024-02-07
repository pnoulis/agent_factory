import { generateRandomName } from "js_utils/misc";
import { smallid, uuid } from "js_utils/uuid";
import { Wristband } from "../wristband/Wristband.js";
import { normalize } from "./normalize.js";

function random(sources, options = {}) {
  trace("random player");
  trace(sources, "player random sources");
  trace(options, "player random options");

  const _options = (arguments.length < 2 ? sources : options) || {};
  _options.wristband ||= {};
  _options.wristband.state ||= "paired";

  const target = normalize(sources, _options);
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

  // Wristband
  debug(target.wristband);
  target.wristband = Wristband.random(target.wristband, _options.wristband);

  trace(target, "player random target");
  return target;
}
export { random };
