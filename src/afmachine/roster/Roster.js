import { normalize } from "./normalize.js";
import { random } from "./random.js";

class Roster {
  static random = random;
  static normalize = normalize;

  constructor(players, { Wristband, Player } = {}) {
    this.roster = [];
    this.Wristband = Wristband;
    this.Player = Player;
    this.normalize(players);
  }

  get length() {
    return this.roster.length;
  }

  normalize(sources, options = {}) {
    Roster.normalize([...this.roster, sources], {
      depth: 1,
      ...options,
    }).forEach((player, i) => {
      this.roster[i] = new this.Player(
        null,
        new this.Wristband(null, { normalize: false }),
        { normalize: false },
      );
      Object.assign(this.roster[i].wristband, player.wristband);
      this.roster[i].wristband.setState(player.wristband.state);
      delete player.wristband;
      Object.assign(this.roster[i], player);
    });
    return this;
  }
  fill(sources, options = {}) {
    Roster.random([...this.roster, sources], {
      depth: 1,
      ...options,
    }).forEach((player, i) => {
      if (this.roster[i] == null) {
        this.roster[i] = new this.Player(
          player,
          new this.Wristband(player.wristband),
        );
      } else {
        Object.assign(this.roster[i].wrisband, player.wristband);
        delete player.wristband;
        Object.assign(this.roster[i], player);
      }
    });
    return this;
  }
  tobject(options = {}) {
    return Roster.normalize(this.roster, options);
  }

  add() {}
  remove() {}
  has() {}
  find(clauseCb) {}
}

export { Roster };
