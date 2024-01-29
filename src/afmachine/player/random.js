import { generateRandomName } from "js_utils/misc";
import { smallid, uuid } from "js_utils/uuid";

function random(sources, options = {}) {
  //debug("random player");

  const _options = {
    longtext: options.longtext ?? false,
  };
  //debug(options);

  const _sources = [sources]
    .flat(2)
    .filter((src) => !!src)
    .map((src) => ("tobject" in src ? src.tobject() : src));
  //debug(_sources);

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
  target.email ||= `${name}@gmail.com`;

  //debug(target);
  return target;
}
export { random };
