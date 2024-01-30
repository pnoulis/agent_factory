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

  constructor(team, { Player, Wristband, Package } = {}) {
    super();
    team ??= {};
    this.name = team.name || "";
    this.t_created = team.t_created ?? null;
    this.points = team.points ?? 0;
    this.roster = new Roster(team.roster, Player, Wristband);
    this.Package = Package;
    this.packages = team.packages;
  }

  get packages() {
    return this._packages;
  }

  set packages(packages) {
    packages ??= [];
    this._packages = [];
    for (let i = 0; i < packages.length; i++) {
      this._packages.push(new this.Package(packages[i]));
    }
    return this;
  }

  normalize(sources, { depth = 2, roster, pkgs, ...teamOpts } = {}) {
    const {
      packages,
      roster: rosterSrc,
      ...team
    } = teamOpts.normalized
      ? sources
      : Team.normalize([this, sources], { depth, roster, pkgs, ...teamOpts });

    // Roster
    this.roster.normalize(
      rosterSrc,
      depth > 0 ? { ...roster, normalized: true } : roster,
    );

    // Packages
    if (depth > 0) {
      this.packages = packages;
    } else {
      this.packages = packages.map((pkg) => this.Package.normalize(pkg, pkgs));
    }

    // Team
    Object.assign(this, team);
    return stateful.setState.call(this, this.state);
  }
  fill(sources, options) {
    return this.normalize(
      Team.random([this, sources], {
        ...options,
        Wristband: this.roster.Wristband,
        Player: this.roster.Player,
      }),
    );
  }
  tobject(depth = 0) {
    const team = Team.normalize(this, { depth: 0 });
    if (depth > 0) {
      team.roster = this.roster.tobject(depth - 1);
      team.packages = this.packages.map((pkg) => pkg.tobject());
    } else {
      team.roster = [];
      team.packages = [];
    }
    return team;
  }
}

export { Team };
