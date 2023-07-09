import { MAX_TEAM_SIZE } from "../constants.js";

function calcTeamSize(nPlayers) {
  let max = MAX_TEAM_SIZE;
  let nTeams;
  do {
    nTeams = nPlayers / max;
  } while (--max && nTeams > 0 && nTeams % 1);
  return [nTeams, max + 1];
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
  if (!color) return "";
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

export {
  calcTeamSize,
  mapWristbandColor,
  mapPackageStatus,
  mapTeam,
  mapPackage,
  mapPlayerStatus,
};
