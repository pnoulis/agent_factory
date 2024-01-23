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
  return chain;
}

export { mergec, inspectProtoChain };
