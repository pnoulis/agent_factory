import { MAX_TEAM_SIZE } from "../constants.js";

function calcTeamSize(nPlayers) {
  let max = MAX_TEAM_SIZE;
  let nTeams;
  do {
    nTeams = nPlayers / max;
  } while (--max && nTeams > 0 && nTeams % 1);
  return [nTeams, max + 1];
}

function distributePlayers(players = 2) {
  // How many teams of 2 can be made out of players
  const teamsOf2 = Math.floor(Math.abs(players / 2));
  // // Remaining players
  let remainder = players > 2 ? Math.floor(Math.abs(players % 2)) : 0;
  const teams = new Array(teamsOf2);
  for (let i = 0; i < teams.length; i++) {
    teams[i] = new Array(2);
    teams[i][0] = null;
    teams[i][1] = null;
    if (remainder-- > 0) teams[i].push(null);
  }
  return teams;
}

function mapPlayerStatus(player = {}) {
  // client side
  if (player?.wristband?.status) {
    return player.wristband.status;
  } else if (player?.wristbandMerged) {
    return "inGame";
  } else if (player?.wristband?.active) {
    return "paired";
  } else {
    return "new";
  }
  // inGame,
  // paired
  // pairing,
  // registered
  // new
}
function mapTeam(team, to) {
  switch (to) {
    case "backend":
    case "frontend":
      return {
        ...team,
        packages: team.packages.map((pkg) => mapPackage(pkg, "frontend")),
      };
    default:
      throw new Error(`Unknown team map:${to}`);
  }
}

function mapPackage(pkg, to) {
  switch (to) {
    case "backend":
    case "frontend":
      return {
        ...pkg,
        status: mapPackageStatus("backend", pkg.active),
        type: pkg.name
          ? /.*time.*/i.test(pkg.name)
            ? "time"
            : "mission"
          : undefined,
      };
    default:
      throw new Error(`Unknown team map:${to}`);
  }
}

function mapPackageStatus(from, status) {
  switch (from) {
    case "backend":
      return !status ? "uploaded" : "active";
    case "label":
    case "code":
    default:
      throw new Error(`Unknown package status map:${from}`);
  }
}

function mapWristbandColor(from, color) {
  if ((color !== 0 && color == null) || color === "") return "";
  if (from === "color") {
    switch (color) {
      case "black":
        return 0;
      case "red":
        return 1;
      case "purple":
        return 2;
      case "green":
        return 3;
      case "yellow":
        return 4;
      case "blue":
        return 5;
      case "orange":
        return 6;
      default:
        throw new Error(`Unknown wristband color code:${color}`);
    }
  } else if (from === "colorCode") {
    switch (color) {
      case 0:
        return "black";
      case 1:
        return "red";
      case 2:
        return "purple";
      case 3:
        return "green";
      case 4:
        return "yellow";
      case 5:
        return "blue";
      case 6:
        return "orange";
      default:
        throw new Error(`Unknown wristband color code:${color}`);
    }
  } else {
    throw new Error(`Unknown wristband map:${from}`);
  }
}

/**
 * stoms
 * Seconds to MilliSeconds
 */
function t_stoms(seconds) {
  return seconds * 1000;
}

/**
 * t_mtos
 * Minutes to Seconds
 */
function t_mtos(minutes) {
  return minutes * 60;
}

/**
 * t_mstom
 * Milliseconds to minutes
 */
function t_mstom(milliseconds) {
  return (milliseconds / 1000) / 60;
}

export {
  calcTeamSize,
  distributePlayers,
  mapWristbandColor,
  mapPackageStatus,
  mapTeam,
  mapPackage,
  mapPlayerStatus,
  t_mtos,
  t_stoms,
  t_mstom,
};
