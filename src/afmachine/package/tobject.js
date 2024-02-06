import { PACKAGE_TYPES } from "../../constants.js";
/*
  {
    timestamp: 1706640606387,
    result: 'OK',
    packages: [
      { name: 'Per Mission 5', amount: 5, type: 'mission', cost: 50 },
      {
        name: 'Per Mission 10',
        amount: 10,
        type: 'mission',
        cost: 100
      },
      {
        name: 'Per Mission 15',
        amount: 15,
        type: 'mission',
        cost: 150
      },
      {
        name: 'Per Mission 20',
        amount: 20,
        type: 'mission',
        cost: 200
      },
      { name: 'Per Time 30', amount: 30, type: 'time', cost: 50 },
      { name: 'Per Time 60', amount: 60, type: 'time', cost: 100 },
      { name: 'Per Time 90', amount: 90, type: 'time', cost: 150 },
      { name: 'Per Time 120', amount: 120, type: 'time', cost: 200 }

          {
            // missions registered
            id: 1,
            name: "Per Mission 5",
            cost: null,
            started: null,
            ended: null,
            missions: 5,
            missionsPlayed: 0,
            active: false,
          },

          {
            // time registered
            id: 8,
            name: "Per Time 30",
            cost: null,
            started: null,
            ended: null,
            duration: 1800,
            paused: false,
            active: false,
          },

 */

function tobject(pkg, { backendForm = false } = {}) {
  pkg ||= {};

  if (!PACKAGE_TYPES[pkg.type]) {
    throw new Error(`Unrecognized package type: '${pkg.type}'`);
  }

  const _tobject = {
    id: pkg.id || null,
    name: pkg.name || null,
    cost: pkg.cost || null,
  };

  if (!backendForm) {
    return {
      ..._tobject,
      type: pkg.type,
      t_start: pkg.t_start || null,
      t_end: pkg.t_end || null,
      amount: pkg.amount || null,
      remainder: pkg.remainder || null,
      state: pkg.state?.name || pkg.state || null,
    }
  }

  if (
    pkg.state === "unregistered" ||
    pkg.state === "registered" ||
    pkg.state == null
  ) {
    _tobject.active = false;
  } else {
    _tobject.active = true;
  }

  return Object.assign(_tobject, pkg.type === "mission" ? {} : {});

  if (pkg.type === "mission") {
    return;
  }
  switch (pkg.type) {
    case "mission":
      return;
      Object.assign(
        _tobject,
        backendForm
          ? {
              started: pkg.t_start || null,
              ended: pkg.t_end || null,
              missions: pkg.amount || null,
              missionsPlayed: pkg.remainder || null,
            }
          : {
              t_start: pkg.t_start || null,
              t_end: pkg.t_end || null,
              amount: pkg.amount || null,
              remainder: pkg.remainder || null,
              state: pkg.state?.name || pkg.state || null,
            },
      );
    case "time":
      Object.assign(_tobject, backendForm ? {} : {});
    default:
      throw new Error(`Unrecognized package type: '${pkg.type}'`);
  }
}

export { tobject };
