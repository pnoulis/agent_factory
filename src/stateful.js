const stateful = {
  getState(state) {
    for (const key of Object.keys(this.states)) {
      if (
        this.states[key].name === state ||
        this.states[key].order === state ||
        this.states[key] === state
      ) {
        return this.states[key];
      }
    }
    return null;
  },
  setState(state) {
    const nstate = this.getState(state);
    if (!nstate) {
      throw new Error(`Non-existent state:${state}`);
    }
    this.state = nstate;
    return this;
  },
  inState(state) {
    return this.state === this.getState(state);
  },
  forStates(fn) {
    Object.values(this.states).forEach(fn);
  },
};

const stateventful = {
  ...stateful,
  setState(state) {
    const nstate = this.getState(state);
    if (!nstate) {
      // throws if no there are no listeners
      this.emit("error", new Error(`Non-existent state:${state}`));
    }
    const ostate = this.state;
    this.state = nstate;
    this.emit("stateChange", nstate?.name, ostate?.name, this);
    return this;
  },
};

function createStateful(Baseclass, Stateclasses) {
  class Stateful extends Baseclass {
    constructor(...args) {
      super(...args);
      this.states = {};
      for (const State of Object.values(this.constructor.prototype.states)) {
        this.states[State.name] = new State(this);
      }
    }
  }
  let i = Baseclass;
  while (true) {
    i = Object.getPrototypeOf(i);
    if (!i.prototype) {
      Object.assign(Stateful.prototype, stateful);
      break;
    } else if ("states" in i.prototype) {
      break;
    }
  }
  Stateful.prototype.states = Object.assign({}, i.prototype?.states);
  for (i = 0; i < Stateclasses.length; i++) {
    Stateful.prototype.states[Stateclasses[i].name] = Stateclasses[i];
  }
  return Stateful;
}

export { stateful, stateventful, createStateful };
