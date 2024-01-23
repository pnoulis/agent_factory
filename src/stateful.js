import { unique } from "js_utils/misc";

/*
  TODO: maybe check for the existence of the
  State.name and State.order getters. If not they should
  be defined dynamically or throw an Error.
 */

const stateful = {
  getState(state) {
    if (!state) return this.state;
    for (const state of Object.keys(this.states)) {
      if (
        this.states[state].name === state ||
        this.states[state].order === state ||
        this.states[state] === state
      ) {
        return this.states[state];
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
  function Stateful() {
    this.state = null;
    this.states = {};
    for (const State of this.States) {
      this.states[State.name] = new State(this);
    }
  }
  if (typeof Base === "function") {
    Object.setPrototypeOf(Stateful.prototype, Base.prototype);
  } else {
    States = Base;
  }

  let proto = Object.getPrototypeOf(Stateful.prototype);
  let protoEventful = false;
  const protoStates = [];

  while (proto) {
    // If it walks like a duck and it quacks like a duck, then it
    // must be a duck.
    // https://en.wikipedia.org/wiki/Duck_typing

    // Uncomment to inherit Base class States.
    // The problem with inheriting Base class States is that the logical order
    // of the States statically defined through the getter State.order may get
    // broken. (almost certainly).
    // if (Object.hasOwn(proto, "States")) {
    //   protoStates.push(...proto.States);
    // }

    if (Object.hasOwn(proto, "emit")) {
      protoEventful = true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  Object.assign(Stateful.prototype, stateful, protoEventful && stateventful);
  Stateful.prototype.States = unique(
    [].concat(States, protoStates).filter((State) => !!State),
  );

  return Stateful;
}

export { createStateful };
