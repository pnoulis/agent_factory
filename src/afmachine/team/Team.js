import { random } from "./random.js";
import { normalize } from "./normalize.js";
import { createStateful, stateful } from "../../Stateful.js";
import { Unregistered } from "./StateUnregistered.js";
import { Registered } from "./StateRegistered.js";
import { Playing } from "./StatePlaying.js";
import { Roster } from "../roster/Roster.js";

class Team extends createStateful([Unregistered, Registered, Playing]) {
  static random = random;
  static normalize = normalize;

  constructor(team, createPlayer, createWristband, createPackage) {
    super();
    team ??= {};
    this.name = team.name || "";
    this.t_created = team.t_created ?? null;
    this.points = team.points ?? null;
    this.state = this.states[team.state?.name || team.state || "unregistered"];
    this.create = {
      player: createPlayer ?? null,
      wristband: createWristband ?? null,
      package: createPackage ?? null,
    };
    this.packages = team.packages;
    this.roster = team.roster;
  }

  get roster() {
    return this._roster;
  }
  set roster(players) {
    players ??= [];
    this._roster = [];
    for (let i = 0; i < players.length; i++) {
      this.addPlayer(players[i]);
    }
  }
  get packages() {
    return this._packages;
  }
  set packages(packages) {
    packages ??= [];
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
    options ??= {};
    while (this.roster.length < options.players) {
      this.addPlayer();
    }
    while (this.packages.length < options.packages) {
      this.addPackage();
    }
    return this.normalize(Team.random([this, sources], options), options);
  }
  tobject(depth = 0) {
    const team = {
      name: this.name,
      t_created: this.t_created,
      points: this.points,
      state: this.state.name,
    };
    if (depth > 0) {
      team.roster = this.roster.map((player) => player.tobject(depth - 1));
      team.packages = this.packages.map((pkg) => pkg.tobject());
    }
    return team;
  }
}

export { Team };
