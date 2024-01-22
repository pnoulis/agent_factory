import { Eventful } from "../Eventful.js";

function createTask(task) {
  const events = new Eventful([
    "pretask",
    "postask",
    "queued",
    "pending",
    "fulfilled",
    "rejected",
    "stateChange",
  ]);

  Object.setPrototypeOf(task, events);
  return task;
}

export { createTask };
