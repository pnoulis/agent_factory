import { randomInteger } from "js_utils/misc";
import { smallid } from "js_utils/uuid";
import { normalize } from "./normalize.js";
import { PRIVILEGE_TYPES } from "../../constants.js";

function random(sources) {
  trace("random cashier");
  trace(sources, "cashier random sources");

  const target = normalize(sources);
  trace(target, "cashier random normalized sources");

  target.username ||= smallid();
  target.email ||= target.username + "@gmail.com";
  target.id ||= randomInteger(1, 5000);

  const roles = Object.keys(PRIVILEGE_TYPES);
  target.role ||= roles.at(randomInteger(0, roles.length - 1));

  trace(target, "cashier random target");
  return target;
}

export { random };
