class InTeam {
  static name = "inTeam";
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

InTeam.prototype.register = function () {
  this.player.throwStateErr("register");
};
InTeam.prototype.registered = function (player) {
  this.player.throwStateErr("registered", true, player);
};
InTeam.prototype.pairWristband = function () {
  this.player.throwStateErr("pair a wristband to");
};
InTeam.prototype.unpairWristband = function () {
  this.player.throwStateErr("unpair a wristband from");
};

export { InTeam };
