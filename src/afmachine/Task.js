import { Eventful } from "../Eventful.js";

function createTask(ctx, middleware) {
  const t = function () {
    const com = createCommand(this, t, middleware);
    this.emit('comnew', com);
    this.run(com);
  };
  Object.assign(
    t,
    new Eventful([
      "queued",
      "pending",
      "fulfilled",
      "rejected",
      "settled",
      "stateChange",
    ]),
  );
  return t;
}
