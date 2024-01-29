class Unregistered {
  static name = "unregistered";
  static order = 0;

  constructor(team) {
    this.team = team;
  }

  get name() {
    return Unregistered.name;
  }

  get order() {
    return Unregistered.order;
  }
}

export { Unregistered };
