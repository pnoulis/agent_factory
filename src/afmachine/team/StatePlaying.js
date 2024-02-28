class Playing {
  static name = "playing";
  static order = 3;

  constructor(player) {
    this.player = player;
  }

  get order() {
    return Playing.order;
  }

  get name() {
    return Playing.name;
  }
}

Playing.prototype.register = function () {
  throw globalThis.craterr(({ ETEAM }) =>
    ETEAM("Trying to register a team in playing state"),
  );
};

Playing.prototype.registered = function (team) {
  throw globalThis.craterr(({ ETEAM }) =>
    ETEAM("Registered a team in playing state"),
  );
};

export { Playing };
