import { isFunction } from "js_utils/misc";

class Eventful {
  constructor(events = []) {
    this.events = {
      error: [],
    };
    for (const event of events) {
      this.events[event] = [];
    }
  }
}
Eventful.prototype.addEvent = function (event) {
  this.events[event] ??= [];
  return this.events[event];
};

Eventful.prototype.on = function (event, options, listener) {
  if (isFunction(options)) {
    listener = options;
    options = {};
  }
  const opts = {
    persist: true,
    reverse: false,
    listener,
    ...options,
  };
  const listeners = this.addEvent(event);

  if (opts.reverse) {
    this.events[event] = [opts, ...listeners];
  } else {
    listeners.push(opts);
  }
  return this;
};
Eventful.prototype.onReverse = function (event, listener) {
  return this.on(event, { persist: true, reverse: true }, listener);
};

Eventful.prototype.once = function (event, options, listener) {
  return isFunction(options)
    ? this.on(event, { persist: false, reverse: false }, options)
    : this.on(event, { persist: false, reverse: false, ...options }, listener);
};

Eventful.prototype.onceReverse = function (event, listener) {
  return this.on(event, { persist: false, reverse: true }, listener);
};

Eventful.prototype.emit = function (event, ...args) {
  if (event === "error" && this.events.error.length < 1) throw args[0];
  const nextevents = [];
  for (let i = 0; i < this.addEvent(event).length; i++) {
    this.events[event][i].listener(...args);
    if (this.events[event][i].persist) {
      nextevents.push(this.events[event][i]);
    }
  }
  this.events[event] = nextevents;
  return this;
};
Eventful.prototype.flush = function (event, listener) {
  if (!this.events.hasOwnProperty(event)) {
    this.emitError(new Error(`Missing event: '${event}'`));
  }
  const nextevents = [];
  for (let i = 0; i < this.events[event].legth; i++) {
    if (listener === this.events[event][i]) continue;
    nextevents.push(this.events[event][i]);
  }
  this.events[event] = nextevents;
};

export { Eventful };
