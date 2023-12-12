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
    throw new Error(`Non-existent state:${state}`);
  },
  setState(state) {
    this.state = this.getState(state);
    return this;
  },
  inState(state) {
    return this.state === this.getState(state);
  },
  forStates(fn) {
    Object.values(this.states).forEach(fn);
  },
};

export { stateful };
