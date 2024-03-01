import { isFunction, isObject } from "js_utils/misc";
import { mergec } from "/src/misc/misc.js";

function __parseValue(src, value, name) {
  return value ?? (isObject(src) ? src[name] : src);
}

function DataTuple({
  src /* Data source */,
  nok /* Do not render key */,
  nov /* Do not render value */,
  name /* src[name] */,
  label /* Render label instead of name */,
  value /* Value instead of src[name] */,
  pval = __parseValue /* Parse(value || src[name]) */,
  nop /* Do not parse(value || src[name])*/,
  dval = "-" /* Default value */,
  renderKey /* Delegate rendering of key */,
  renderValue /* Delegate rendering of value */,
  children /* Turns DataTuple into a pipeline filter */,
  className,
} = {}) {
  const props = {
    name: label || name,
    value: nop ? __parseValue(src, value, name) : pval(src, value, name),
  };
  if (props.value === "" || props.value === undefined || props.value === null) {
    props.value = dval;
  }

  return isFunction(children) ? (
    children(props)
  ) : (
    <>
      {!nok &&
        (isFunction(renderKey) ? (
          renderKey(props)
        ) : (
          <span className={mergec("key", className)}>{t(props.name)}</span>
        ))}
      {!nov &&
        (isFunction(renderValue) ? (
          renderValue(props)
        ) : (
          <span className={mergec("value", className)}>{props.value}</span>
        ))}
    </>
  );
}

export { DataTuple };
