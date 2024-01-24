import { createEventful } from "../Eventful.js";
import { inspectProps, inspectProtoChain } from "../misc/misc.js";

function createTask(task) {
  const events = new createEventful([
    "pretask",
    "postask",
    "queued",
    "pending",
    "fulfilled",
    "rejected",
    "stateChange",
  ]);

  debug(events);
  Object.setPrototypeOf(task, events);
  inspectProps(events);
  inspectProtoChain(events);
  debug("create task");
  process.exit();
  return task;
}

export { createTask };
