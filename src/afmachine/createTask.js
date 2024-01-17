import { Eventful } from "../Eventful.js";
import { runTask } from "./runTask.js";

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

}

export { createTask };
