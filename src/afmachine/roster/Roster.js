import { normalize } from "./normalize.js";
import { random } from "./random.js";

class Roster {
  static random = random;
  static normalize = normalize;

  constructor(players, Player, Wristband) {
    this.Wristband = Wristband;
    this.Player = Player;
    this.players = players;
  }

  get length() {
    return this._players.length;
  }

  get players() {
    return this._players;
  }

  set players(players) {
    players ??= [];
    this._players = [];
    for (let i = 0; i < players.length; i++) {
      this._players.push(
        new this.Player(players[i], new this.Wristband(players[i].wristband)),
      );
    }
    return this;
  }

  normalize(sources, { depth = 1, wristband, ...rosterOpts } = {}) {
    const players = rosterOpts.normalized
      ? sources
      : Roster.normalize([this, sources], { depth, wristband, ...rosterOpts });
    this.players = players;
    return this;
  }

  fill(sources, options = {}) {
    const players = Roster.random([this.players, sources], {
      ...options,
      Player: this.Player,
      Wristband: this.Wristband,
    });
    this.normalize(players, options);
    if (options.password) {
      for (let i = 0; i < this.length; i++) {
        this.players[i].password = players[i].password;
      }
    }
    return this;
  }
  tobject(depth = 0) {
    return this.players.map((player) => player.tobject(depth));
  }

  add() {}
  remove() {}
  has() {}
  find(clauseCb) {}
}

export { Roster };
