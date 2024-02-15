import { isString } from "js_utils/misc";
import { random as randomPlayer } from "../afmachine/player/random.js";
import { smallid, uuid } from "js_utils/uuid";

function mergec(...classes) {
  let _class = "";
  for (let i = 0; i < classes.length; i++) {
    if (isString(classes[i])) {
      _class += classes[i] + " ";
    }
  }
  return _class.trim();
}

function inspectProtoChain(obj) {
  let proto = obj.prototype ?? Object.getPrototypeOf(obj);
  const chain = [];
  while (proto) {
    chain.push(proto.constructor.name);
    proto = Object.getPrototypeOf(proto);
  }
  console.log(chain);
  return chain;
}

function inspectProps(obj) {
  if (obj == null) return;
  for (const prop in obj) {
    console.log(prop);
  }
}

function extendProto(target, source) {
  for (const fn of Object.keys(source)) {
    target.prototype[fn] = source[fn];
  }
}

/*
  Seconds to Milliseconds
  1 second - 1000 milliseconds

  if reverse:

  Milliseconds to Seconds
  1 Millisecond - 1/1000 Seconds
 */
function t_stomls(seconds = 1, reverse = false) {
  return reverse ? seconds / 1000 : seconds * 1000;
}

/*
  Hours to Milliseconds
  1 hour - 36 000 00 ms

  if reverse:

  Milliseconds to Hours
  1 Millisecond - 1/36 000 00 ms
 */
function t_htomls(hours = 1, reverse = true) {
  return reverse ? hours / 3600000 : hours * 3600000;
}

/*
  Seconds to Minutes
  60 seconds - 1 minute

  if reverse:

  Minutes to Seconds
  1 minute - 60 seconds
 */
function t_stomin(seconds = 1, reverse = false) {
  return reverse ? seconds * 60 : seconds / 60;
}

/*
  Days to Milliseconds
  1 Day - 864 000 00 Milliseconds

  if reverse:

  Milliseconds to Days
 */
function t_daytomls(days = 1, reverse = false) {
  return reverse ? days / 86400000 : days * 86400000;
}

/*
  Timestamp to Localized date+time string

  if reverse

  Date+Time string to timestamp
 */
function t_timetolocal(timestamp = Date.now(), reverse = false) {
  return reverse
    ? new Date(timestamp).valueOf()
    : new Date(timestamp).toLocaleString();
}

function randomCashier() {
  const player = randomPlayer(null, { depth: 0 });
  return {
    username: player.username,
    email: player.email,
    password: smallid(),
    role: ["ROLE_CASHIER"],
  };
}

function removeIndex(arr, index) {
  if (!index) {
    return arr.slice(1);
  } else if (index === arr.length - 1) {
    return arr.slice(0, -1);
  } else {
    return arr.slice(0, index).concat(arr.slice(index + 1));
  }
}

function afmResponse(promise) {
  return promise
    .then((cmd) => cmd.res)
    .catch((cmd) => {
      throw cmd.errs.at(-1);
    });
}

export {
  mergec,
  inspectProtoChain,
  extendProto,
  inspectProps,
  t_stomls,
  t_stomin,
  t_htomls,
  t_daytomls,
  t_timetolocal,
  randomCashier,
  removeIndex,
  afmResponse,
};
