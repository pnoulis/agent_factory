class Registered {
  static name = "registered";
  static order = 1;

  constructor(team) {
    this.team = team;
  }

  get name() {
    return Registered.name;
  }

  get order() {
    return Registered.order;
  }
}

export { Registered };
