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
  this.player.throwStateErr(this.player.errCodes.EPLAYER_STATE)(
    "Trying to register a player in inTeam state",
  );
};
InTeam.prototype.registered = function (player) {
  this.player.throwStateErr(this.player.errCodes.EPLAYER_STATE_IMPOSSIBLE)(
    "Registered a player in inTeam state",
    player,
  );
};
InTeam.prototype.pairWristband = function () {
  this.player.throwStateErr(this.player.errCodes.EPLAYER_STATE)(
    "Trying to pair a player's wristband in inTeam state",
  );
};
InTeam.prototype.unpairWristband = function () {
  this.player.throwStateErr(this.player.errCodes.EPLAYER_STATE)(
    "Trying to unpair a player's wristband in inTeam state",
  );
};

export { InTeam };
