import { generateRandomName } from "js_utils/misc";
import { smallid, uuid } from "js_utils/uuid";
import { random as randomWristband } from "../wristband/random.js";
import { normalize } from "./normalize.js";

function random(sources, options = {}) {
  trace("random player");
  trace(sources, "player random sources");
  trace(options, "player random options");

  const _options = {
    longtext: options.longtext || false,
    password: options.password || false,
    depth: options.depth ?? 1,
  };
  trace(_options, "player random _options");

  const target = normalize(sources, _options);
  trace(target, "playre normalized target");

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

  if (_options.password) {
    target.password = target.username;
  }

  if (_options.depth > 0) {
    target.wristband = randomWristband(target.wristband);
  }

  trace(target, "player random target");
  return target;
}
export { random };
