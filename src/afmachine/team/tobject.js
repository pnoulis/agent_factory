import { Player } from "../player/Player.js";
import { Package } from "../package/Package.js";
import { PACKAGE_TYPES, TEAM_STATES } from "../../constants.js";
import { t_daytomls } from "../../misc/misc.js";

function tobject(team, options) {
  team ||= {};
  options ||= {};

  const _options = {
    backendForm: options.backendForm || false,
    defaultState: options.defaultState || "unregistered",
    depth: options.depth ?? 2, // Player + Wristband
  };
  trace(_options, "team.tobject() _options");

  const afmTeam = {
    name: team.name || null,
    t_created: team.t_created || null,
    points: team.points || null,
    isTemporary: !!team.isTemporary,
    state: team.state?.name || team.state || _options.defaultState,
    roster: _options.depth
      ? [team.roster].flat().map((player) =>
          Player.tobject(player, {
            ...options.player,
            wristband: options.wristband,
            depth: _options.depth - 1,
          }),
        )
      : team.roster || [],
    packages: _options.depth
      ? [team.packages]
          .flat()
          .map((pkg) => Package.tobject(pkg, options.package))
      : team.packages || [],
  };

  if (!_options.backendForm) return afmTeam;

  const backendTeam = {
    name: afmTeam.name,
    created: afmTeam.t_created,
    points: afmTeam.points,
    roomType: null,
    lastRegisterAttempt: null,
    currentRoster: {
      version: 1,
      players: afmTeam.roster.map((player) => ({
        username: player.username,
        wristbandNumber: player.wristband.id,
        wristbandColor: player.wristband.colorCode,
      })),
    },
    packages: afmTeam.packages.map((pkg) =>
      Package.tobject(pkg, { backendForm: true }),
    ),
  };

  if (new Date(afmTeam.t_created).getDay() < new Date().getDay()) {
    backendTeam.teamState = TEAM_STATES.finished;
  } else if (afmTeam.state === "playing") {
    backendTeam.teamState = TEAM_STATES.playing;
  } else if (afmTeam.packages.length >= 1) {
    backendTeam.teamState = TEAM_STATES.loaded;
  } else {
    backendTeam.teamState = TEAM_STATES.pending;
  }

  return backendTeam;
}

export { tobject };
