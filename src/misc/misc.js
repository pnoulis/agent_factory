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

export { mergec };
