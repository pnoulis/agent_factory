import { Eventful } from "../Eventful.js";
import { compose } from "./compose.js";
import { isArray } from "js_utils/misc";

class Route extends Eventful {
  constructor(path, ...middleware) {
    super(["pending", "fulfilled", "rejected", "settled"]);
    this.path = path;
    this.middleware = middleware;
  }
  async run(args, ...middleware) {
    if (!args) {
      args = {};
    } else if (isArray(args)) {
      middleware = args;
      args = {};
    }
    const ctx = {
      path: this.path,
      req: args,
      res: {},
    };
    try {
      const cmd = compose(this.middleware.concat(...middleware));
      await cmd(ctx);
      this.emit("fulfilled", ctx);
      return ctx;
    } catch (err) {
      this.emit("rejected", err, ctx);
      throw err;
    } finally {
      this.emit("settled", ctx);
    }
  }
  // middleware
  before(...middleware) {
    this.middleware = middleware.concat(this.middleware);
  }
  after(...middleware) {
    this.middleware.push(...middleware);
  }
  // events
  onPending(listener) {
    this.on("pending", listener);
  }
  onFulfilled(listener) {
    this.on("fulfilled", listener);
  }
  onRejected(listener) {
    this.on("rejected", listener);
  }
  onSettled(listener) {
    this.on("settled", listener);
  }
}

export { Route };
