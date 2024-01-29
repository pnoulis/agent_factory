class Merged {
  static name = "merged";
  static order = 1;

  constructor(team) {
    this.team = team;
  }

  get name() {
    return Merged.name;
  }

  get order() {
    return Merged.order;
  }
}

export { Merged };
