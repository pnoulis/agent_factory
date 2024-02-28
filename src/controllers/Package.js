import dayjs from "dayjs";

const Package = {
  isTodaysTeam: (team) => team.t_created > dayjs().startOf("day"),
  registerPackage(team, __pkg) {
    team ||= {};
    __pkg ||= {};
    if (!Package.isTodaysTeam(team)) {
      throw globalThis.craterr(({ ETEAM }) => ETEAM("Inactive team"));
    } else if (!__pkg.name) {
      throw globalThis.craterr(({ ETEAM }) => ETEAM("No package selected"));
    } else if (__pkg.state === "registered" || __pkg.inState?.("registered")) {
      throw globalThis.craterr(({ ETEAM }) =>
        ETEAM("Package is already registered"),
      );
    } else if (
      team.packages.find(
        (pkg) => pkg.state === "playing" || pkg.inState?.("playing"),
      )
    ) {
      throw globalThis.craterr(({ ETEAM }) =>
        ETEAM("Cannot register a package while playing"),
      );
    } else if (
      team.packages.filter(
        (pkg) => pkg.state === "registered" || pkg.inState?.("registered"),
      ).length >= 1
    ) {
      throw globalThis.craterr(({ ETEAM }) =>
        ETEAM("Cannot register more than 1 package"),
      );
    } else if (
      team.roster.filter(
        (player) =>
          player.wristband.inState?.("paired") ||
          player.wristband.state === "paired",
      ).length !== team.roster.length
    ) {
      throw globalThis.craterr(({ ETEAM }) =>
        ETEAM("Team players missing wristbands"),
      );
    }
    return __pkg;
  },
  activatePackage(team) {
    team ||= {};
    if (!Package.isTodaysTeam(team)) {
      throw globalThis.craterr(({ ETEAM }) => ETEAM("Inactive team"));
    } else if (
      !team.packages.find((pkg) => pkg.state === "registered")
    ) {
      throw globalThis.craterr(({ ETEAM }) =>
        ETEAM("Missing registered package"),
      );
    }
    return team;
  },
  deregisterPackage(team, __pkg) {
    __pkg ||= {};
    if (!Package.isTodaysTeam(team)) {
      throw globalThis.craterr(({ ETEAM }) => ETEAM("Inactive team"));
    } else if (!__pkg.name) {
      throw globalThis.craterr(({ ETEAM }) => ETEAM("No package selected"));
    } else if (__pkg.state !== "registered") {
      throw globalThis.craterr(({ ETEAM }) =>
        ETEAM(`Cannot remove a ${__pkg.state?.name || __pkg.state} package`),
      );
    }
    return __pkg;
  },
  addPackage(team, __pkg) {
    if (!Package.isTodaysTeam(team)) {
      throw globalThis.craterr(({ ETEAM }) => ETEAM("Inactive team"));
    }
    return __pkg;
  },
};

export { Package };
