import { Eventful } from "../Eventful.js";

function createTask(task) {
  const events = new Eventful([
    "precmd",
    "postcmd",
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
