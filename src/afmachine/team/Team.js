import { random } from "./random.js";
import { normalize } from "./normalize.js";
import { tobject } from "./tobject.js";
import { validate } from "./validate.js";

import { createStateful } from "../../Stateful.js";
import { Unregistered } from "./StateUnregistered.js";
import { Registered } from "./StateRegistered.js";
import { Playing } from "./StatePlaying.js";

class Team extends createStateful([Unregistered, Registered, Playing]) {
  static random = random;
  static normalize = normalize;
  static tobject = tobject;
  static validate = validate;

  constructor(team, createPlayer, createWristband, createPackage) {
    super();
    team ??= {};
    this.name = team.name || null;
    this.t_created = team.t_created || null;
    this.points = team.points ?? null;
    this.state = this.states[team.state?.name || team.state || "unregistered"];
    this.create = {
      player: createPlayer || null,
      wristband: createWristband || null,
      package: createPackage || null,
    };
    this.packages = team.packages;
    this.roster = team.roster;
  }

  get roster() {
    return this._roster;
  }
  set roster(players) {
    players ||= [];
    this._roster = [];
    for (let i = 0; i < players.length; i++) {
      this.addPlayer(players[i]);
    }
  }
  get packages() {
    return this._packages;
  }
  set packages(packages) {
    packages ||= [];
    this._packages = [];
    for (let i = 0; i < packages.length; i++) {
      this.addPackage(packages[i]);
    }
    return this;
  }

  addPlayer(player) {
    this._roster.push(
      this.create.player(player, this.create.wristband(player?.wristband)),
    );
  }
  addPackage(pkg) {
    this._packages.push(this.create.package(pkg));
  }

  normalize(sources, options) {
    const { packages, roster, state, ...team } = Team.normalize(
      [this, sources],
      options,
    );
    this.packages = packages;
    this.roster = roster;
    Object.assign(this, team);
    this.setState(state);
    return this;
  }
  fill(sources, options) {
    const { packages, roster, state, ...team } = Team.random(
      [this, sources],
      options,
    );
    this.packages = packages;
    this.roster = roster;
    Object.assign(this, team);
    this.setState(state);
    return this;
  }
  tobject(options) {
    return Team.tobject(this, options);
  }
}

export { Team };
