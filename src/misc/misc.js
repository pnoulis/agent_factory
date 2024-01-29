import { isString } from "js_utils/misc";

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
 */
function t_stomls(seconds, reverse = false) {
  return reverse ? seconds / 1000 : seconds * 1000;
}

/*
  Seconds to Minutes
  60 seconds - 1 minute
 */
function t_stomin(seconds, reverse = false) {
  return reverse ? seconds * 60 : seconds / 60;
}

export {
  mergec,
  inspectProtoChain,
  extendProto,
  inspectProps,
  t_stomls,
  t_stomin,
};
