class InTeam {

  static name = "inteam";
  static order = 2;

  constructor(player) {
    this.player = player;
  }

  get order() {
    return InTeam.order;
  }

  get name() {
    return InTeam.name;
  }
}

export { InTeam };
