import { Eventful } from "../Eventful.js";
import { createStateful } from "../stateful.js";
import { random } from "./random.js";
import { normalize } from "./normalize.js";
import { Unregistered } from "./states/StateUnregistered.js";
import { Registered } from "./states/StateRegistered.js";
import { InTeam } from "./states/StateInTeam.js";
import { Playing } from "./states/StatePlaying.js";

class Player extends createStateful(Eventful, [
  Unregistered,
  Registered,
  InTeam,
  Playing,
]) {
  static random = random;
  static normalize = normalize;

  constructor(afm, player, wristband) {
    super(["stateChange"]);
    this.setState("unregistered");
    this.normalize(player);
    this.constructor.prototype.afm = afm;
    this.wristband = wristband;
  }

  normalize(sources, options) {
    const player = Player.normalize(sources, options);
    Object.assign(this, player);
  }
  fill(sources = [], options) {
    return Object.assign(this, Player.random([this, ...sources], options));
  }
  toObject() {
    return {
      name: this.name,
      username: this.username,
      surname: this.surname,
      email: this.email,
      password: this.password,
    };
  }

  notify(err, cb) {
    cb(err, this);
    if (err) {
      this.emit("error", err, this);
    }
  }

  toggleWristband(cb) {
    if (this.wristband.inState("paired")) {
      return this.state.unpairWristband(cb);
    }
    return this.state.pairWristband(cb);
  }
}

export { Player };
