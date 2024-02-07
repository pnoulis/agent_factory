import { PACKAGE_TYPES } from "../../constants.js";
import { t_stomls } from "../../misc/misc.js";

// pkg = AFM FORM
function tobject(
  pkg,
  { defaultState = "unregistered", backendForm = false } = {},
) {
  pkg ||= {};

  const afmPkg = {
    id: pkg.id || null,
    name: pkg.name || null,
    cost: pkg.cost || null,
    type: pkg.type || null,
    t_start: pkg.t_start || null,
    t_end: pkg.t_end || null,
    amount: pkg.amount || null,
    remainder: pkg.remainder || null,
    state: pkg.state?.name || pkg.state || defaultState,
  };

  if (!backendForm) return afmPkg;

  const backendPkg = {
    id: afmPkg.id,
    name: afmPkg.name,
    cost: null,
    started: afmPkg.t_start,
    ended: afmPkg.t_end,
  };

  switch (afmPkg.state) {
    case "paused":
      // A missions package should never be in this
      // state; at least as of this moment in the project's
      // lifecycle.
      backendPkg.paused = true;
    // fall through
    case "playing":
      backendPkg.active = true;
      break;
    default:
      backendPkg.active = false;
  }

  switch (afmPkg.type) {
    case PACKAGE_TYPES.missions:
      return {
        ...backendPkg,
        missions: afmPkg.amount,
        missionsPlayed: afmPkg.remainder,
      };
    case PACKAGE_TYPES.time:
      return {
        ...backendPkg,
        paused: backendPkg.paused || false,
        duration: t_stomls(afmPkg.amount, true),
      };
    default:
      throw new Error(`Unrecognized package type: '${afmPkg.type}' `);
  }
}

export { tobject };
