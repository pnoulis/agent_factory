class Eventful {
  constructor(events) {
    for (const event of events) {
      this.events[event] = [];
    }
  }
}
Eventful.prototype.events = {
  error: [],
};
Eventful.prototype.addEvent = function (event) {
  this.events[event] ??= [];
  return this.events[event];
};
Eventful.prototype.on = function (event, listener) {
  this.addEvent(event).push({
    listener,
    persist: true,
  });
  return this;
};
Eventful.prototype.once = function (event, listener) {
  this.addEvent(event).push({
    listener,
    persist: false,
  });
  return this;
};
Eventful.prototype.emit = function (event, ...args) {
  const nextevents = [];
  for (let i = 0; i < this.addEvent(event).length; i++) {
    try {
      this.events[event][i].listener(...args);
    } catch (err) {
      this.emitError(err);
    }
    if (this.events[event][i].persist) {
      nextevents.push(this.events[event][i]);
    }
  }
  this.events[event] = nextevents;
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
  const nextevents = [];
  for (let i = 0; i < this.events[event].legth; i++) {
    if (listener === this.events[event][i]) continue;
    nextevents.push(this.events[event][i]);
  }
  this.events[event] = nextevents;
};

export { Eventful };
