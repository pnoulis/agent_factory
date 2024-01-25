import { isFunction } from "js_utils/misc";

const eventful = {
  addEvent(event) {
    this.events[event] ??= [];
    return this.events[event];
  },
  on(event, options, listener) {
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
  },
  onReverse(event, listener) {
    return this.on(event, { persist: true, reverse: true }, listener);
  },
  once(event, options, listener) {
    return isFunction(options)
      ? this.on(event, { persist: false, reverse: false }, options)
      : this.on(
          event,
          { persist: false, reverse: false, ...options },
          listener,
        );
  },
  onceReverse(event, listener) {
    return this.on(event, { persist: false, reverse: true }, listener);
  },
  emit(event, ...args) {
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
  },
  removeListener(event, listener) {
    if (!this.events.hasOwnProperty(event)) {
      this.emitError(new Error(`Missing event: '${event}'`));
    }
    const nextevents = [];
    for (let i = 0; i < this.events[event].legth; i++) {
      if (listener === this.events[event][i]) continue;
      nextevents.push(this.events[event][i]);
    }
    this.events[event] = nextevents;
  },
};

function isEventful(obj) {
  const _obj = obj?.prototype ?? obj;
  if (!_obj) return false;
  for (const fn of Object.keys(eventful)) {
    if (!(fn in _obj)) return false;
  }
  return true;
}

function createEventful(Base, events) {
  if (typeof Base !== "function") {
    events = Base;
    Base = Object.prototype.constructor;
  }
  events ??= [];

  class Eventful extends Base {
    constructor(...args) {
      super(...args);
      this.events = { error: [] };
      for (const e of events) {
        this.addEvent(e);
      }
    }
  }

  if (!isEventful(Base)) {
    for (const fn of Object.keys(eventful)) {
      Eventful.prototype[fn] = eventful[fn];
    }
  }

  // if (this) return new Eventful();
  return Eventful;
}

export { createEventful, eventful, isEventful };
