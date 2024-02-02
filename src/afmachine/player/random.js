import { generateRandomName } from "js_utils/misc";
import { smallid, uuid } from "js_utils/uuid";
import { random as randomWristband } from "../wristband/random.js";

function random(sources, options = {}) {
  trace("random player");
  trace(sources, "player random sources");

  const _options = {
    longtext: options.longtext ?? false,
    password: options.password ?? false,
    depth: options.depth ?? 0,
  };
  trace(_options, "player random _options");

  const _sources = [sources]
    .flat(2)
    .filter((src) => !!src)
    .map((src) => ("tobject" in src ? src.tobject(_options.depth) : src));
  trace(_sources, "player random _sources");

  const target = Object.assign({}, ..._sources);

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

  if (_options.depth) {
    target.wristband = randomWristband(target.wristband);
  }

  trace(target, "player random target");
  return target;
}
export { random };
