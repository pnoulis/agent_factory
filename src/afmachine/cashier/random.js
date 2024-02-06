import { randomInteger } from "js_utils/misc";
import { smallid } from "js_utils/uuid";
import { normalize } from "./normalize.js";

function random(sources) {
  trace("random cashier");
  trace(sources, "cashier random sources");

  const target = normalize(sources);
  trace(target, "cashier random normalized sources");

  target.username ||= smallid();
  target.email ||= target.username + "@gmail.com";
  target.id ||= randomInteger(1, 5000);
  target.role ||= "cashier";

  trace(target, "cashier random target");
  return target;
}

export { random };
