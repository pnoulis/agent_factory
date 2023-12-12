const stateful = {
  states: {},
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
  initializeStates(initialState) {
    for (const State of Object.values(this.states)) {
      this.states[State.name] = new State(this);
    }
    return this.setState(initialState);
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

function createStateful(BaseClass, StateClasses) {
  let i = BaseClass;
  do {
    if ("states" in i) {
      Object.assign(i.states, StateClasses);
      return BaseClass;
    }
  } while ((i = i.prototype));
  class Stateful extends BaseClass {
    constructor(...args) {
      super(...args);
      this.states = {};
      for (const State of Object.values(this.states)) {
        this.states[State.name] = new State(this);
      }
    }
  }
  Object.assign(Stateful.prototype, stateful);
  for (let i = 0; i < StateClasses.length; i++) {
    Stateful.prototype.states[StateClasses[i].name] = StateClasses[i];
  }
  return Stateful;
}

export { stateful, stateventful, createStateful };
