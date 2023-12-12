import { eventful } from "js_utils/eventful";

class Eventful {
  constructor(events) {
    this.events = {
      error: [],
    };
    for (const event of events) {
      this.events[event] = [];
    }
  }
}
Eventful.prototype.on = function (event, listener) {
  this.events[event] ??= [
    {
      listener,
      persist: true,
    },
  ];
  return this;
};
Eventful.prototype.once = function (event, listener) {
  this.events[event] ??= [
    {
      listener,
      persist: false,
    },
  ];
  return this;
};
Eventful.prototype.emit = function (event, ...args) {
  const persistentEvents = [];
  for (let i = 0; i < this.events[event].length; i++) {
    try {
      this.events[event][i].listener(...args);
    } catch (err) {
      this.emitError(err);
    }
    if (this.events[event][i].persist) {
      persistentEvents.push(this.events[event][i]);
    }
  }
  this.events[event] = persistentEvents;
  return this;
};
Eventful.prototype.emitError = function (err) {
  if (this.events.error.length < 1) throw err;
  this.emit(err);
};
Eventful.prototype.flush = function (event, listener) {
  if (!this.events.hasOwnProperty(event)) {
    this.emitError(new Error(`Missing event: '${event}'`));
  }
  const leftoverEvents = [];
  for (let i = 0; i < this.events[event].legth; i++) {
    if (listener === this.events[event][i]) continue;
    leftoverEvents.push(this.events[event][i]);
  }
  this.events[event] = leftoverEvents;
};

export { Eventful };
