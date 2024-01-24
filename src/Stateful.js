import { isEventful } from "./Eventful.js";

const stateful = {
  getState(state) {
    if (!state) return this.state;
    if (Object.hasOwn("name", state)) state = state.name;
    for (const s of Object.keys(this.states)) {
      if (
        this.states[s].name === state ||
        this.states[s].order === state ||
        this.states[s] === state
      ) {
        return this.states[s];
      }
    }
    return null;
  },
  setState(state) {
    const nstate = this.getState(state);
    if (!nstate) {
      throw new Error(`Missing state: ${state}`);
    }
    this.state = nstate;
    return this;
  },
  inState(state) {
    return this.state === this.getState(state);
  },
  forStates(fn) {
    Object.values(this.states).forEach(fn);
    return this;
  },
  compareStates(fn) {
    return fn(this.states, this.getState());
  },
};

function isStateful(obj) {
  const _obj = obj?.prototype ?? obj;
  if (!_obj) return false;
  for (const fn of Object.keys(stateful)) {
    if (!(fn in _obj)) return false;
  }
  return true;
}

const stateventful = {
  setState(state) {
    const nstate = this.getState(state);
    if (!nstate) {
      this.emit("error", new Error(`Missincg state: ${state}`));
    }
    const ostate = this.state;
    if (nstate !== ostate) {
      this.state = nstate;
      this.emit("stateChange", nstate?.name, ostate?.name, this);
    }
    return this;
  },
};

function createStateful(Base, States) {
  if (typeof Base !== "function") {
    States = Base;
    Base = Object.prototype.constructor;
  }

  class Stateful extends Base {
    constructor(...args) {
      super(...args);
      this.states = {};
      for (const State of this.States) {
        this.states[State.name] = new State(this);
      }
    }
  }

  if (!isStateful(Base)) {
    for (const fn of Object.keys(stateful)) {
      Stateful.prototype[fn] = stateful[fn];
    }
  }

  if (isEventful(Base)) {
    for (const fn of Object.keys(stateventful)) {
      Stateful.prototype[fn] = stateventful[fn];
    }
  }

  Stateful.prototype.States = States ?? [];

  return Stateful;
}

export { createStateful, stateventful, stateful, isStateful };
