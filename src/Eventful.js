class Eventful {
  constructor(events) {
    events ??= [];
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
