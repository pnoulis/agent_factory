import { generateRandomName, isObject, isArray } from "js_utils/misc";
import { smallid, uuid } from "js_utils/uuid";

function random(sources, options = {}) {
  if (!isArray(sources)) {
    sources = [sources];
  }
  const opts = {
    longtext: options.longtext ?? false,
  };

  let target = {};
  for (let i = 0; i < sources.length; i++) {
    target = {
      ...target,
      ...sources[i],
    };
  }

  let surname, name, password;
  if (opts.longtext) {
    surname = name = password = uuid();
  } else {
    [surname, name, password] = `${generateRandomName()}_${smallid()}`.split(
      "_",
    );
  }

  return {
    username: target.username || `${name}_${password}`,
    name: target.name || name,
    surname: target.surname || surname,
    email: target.email || `${name}@gmail.com`,
    password: target.password || password,
  };
}
export { random };
