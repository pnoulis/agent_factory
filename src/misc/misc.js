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

export { mergec, inspectProtoChain, extendProto, inspectProps };
