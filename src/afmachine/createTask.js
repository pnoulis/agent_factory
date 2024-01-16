import { Eventful } from "../Eventful.js";

function createTask(afm, { taskname, middleware, cb } = {}) {
  const events = new Eventful([
    "command",
    "pending",
    "fulfilled",
    "rejected",
    "settled",
    "stateChange",
  ]);

  const task = (...args) => afm.runTask(task, args, cb);
  Object.setPrototypeOf(task, events);
  task.taskname = taskname;
  task.middleware = middleware;
  afm.tasks[taskname] = task;
}

export { createTask };
