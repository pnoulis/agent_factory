import { generateRandomName, randomInteger } from "js_utils/misc";
import { smallid, uuid } from "js_utils/uuid";
import { normalize } from "./normalize.js";

function random(sources, options = {}) {
  trace("random cashier");
  trace(sources, "cashier random sources");
  trace(options, "cashier random options");

  const _options = {
    password: options.password ?? false,
  };
  trace(_options, "cashier random _options");

  const target = normalize(sources);
  target.username ||= smallid();
  target.email ||= target.username + "@gmail.com";
  target.id ??= randomInteger(1, 5000);
  target.role ||= "cashier";
  if (_options.password) {
    target.password = target.username;
  }
  trace(target, "cashier random target");
  return target;
}

export { random };
