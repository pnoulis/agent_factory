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

InTeam.prototype.pairWristband = function (cb) {
  this.player.notify(
    new Error(
      `Trying to pair ${this.username} player's wristband in inTeam state`,
    ),
    cb,
  );
};

InTeam.prototype.unpairWristband = function (cb) {
  this.player.notify(
    new Error(
      `Trying to unpair ${this.username} player's wristband in inTeam state`,
    ),
    cb,
  );
};

InTeam.prototype.register = function () {
  throw new Error("Trying to register a player in inTeam state");
};
InTeam.prototype.registered = function (player) {
  throw new Error("Trying to register a player in inTeam state");
};

export { InTeam };
