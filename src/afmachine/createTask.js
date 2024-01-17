import { Eventful } from "../Eventful.js";
import { runTask } from "./runTask.js";
import { isFunction } from "js_utils/misc";

function createTask(task) {
  const events = new Eventful([
    "command",
    "pending",
    "fulfilled",
    "rejected",
    "settled",
    "stateChange",
  ]);

  Object.setPrototypeOf(task, events);
  return task;
}

export { createTask };
