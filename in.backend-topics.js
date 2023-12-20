const rpiReaderTopics = {
  boot: {
    alias: "boot",
    pub: basename("booted"),
    sub: basename("booted/${deviceId}"),
  },
  readWristband: {
    alias: "read",
    pub: basename("${deviceId}/rpi/wristbandScan"),
    sub: basename("${deviceId}/rpi/wristbandScan"),
  },
};

const registrationTopics = {
  boot: {
    alias: "boot",
    pub: basename("booted"),
    sub: basename("booted/${deviceId}"),
  },
  registerPlayer: {
    alias: "player/register",
    pub: prefix("player/registration"),
    sub: prefix("player/registration/response"),
  },
  loginPlayer: {
    alias: "player/login",
    pub: prefix("player/login"),
    sub: prefix("player/login/response"),
  },
  scanWristband: {
    alias: "wristband/scan",
    pub: null,
    sub: prefix("player/wristbandScan"),
  },
  pairWristband: {
    alias: "wristband/pair",
    pub: prefix("player/registerWristband"),
    sub: prefix("player/registerWristband/response"),
  },
  unpairWristband: {
    alias: "wristband/unpair",
    pub: prefix("player/unregisterWristband"),
    sub: prefix("player/unregisterWristband/response"),
  },
  mergeTeam: {
    alias: "team/merge",
    pub: prefix("team/merge"),
    sub: prefix("team/merge/response"),
  },
  mergeGroupTeam: {
    alias: "gteam/merge",
    pub: prefix("/groupteam/merge"),
    sub: prefix("/groupteam/merge/response"),
  },
  isValidWristband: {
    alias: "wristband/validate",
    pub: prefix("player/isValid"),
    sub: prefix("player/isValid/response"),
  },
  getWristbandInfo: {
    alias: "wristband/info",
    pub: prefix("wristband/info"),
    sub: prefix("wristband/info/response"),
  },
  addTeamPkg: {
    alias: "team/pkg/add",
    pub: prefix("team/package/add"),
    sub: prefix("team/package/add/response"),
  },
  removeTeamPkg: {
    alias: "team/pkg/delete",
    pub: prefix("team/package/delete"),
    sub: prefix("team/package/delete/response"),
  },
  activateTeamPkg: {
    alias: "team/pkg/activate",
    pub: prefix("team/activate"),
    subd: prefix("team/activate/response"),
  },
  registerCashier: {
    alias: "cashier/register",
    pub: basename("signup"),
    sub: basename("signup/response"),
  },
  loginCashier: {
    alias: "cashier/login",
    pub: basename("signin"),
    sub: basename("signin/response"),
  },
  removeCashier: {
    alias: "cashier/delete",
    pub: prefix("users/cashiers/delete"),
    sub: prefix("users/cashiers/delete/response"),
  },
  startSession: {
    alias: "session/start",
    pub: basename("startSession"),
    sub: basename("startSession/response"),
  },
  stopSession: {
    alias: "session/stop",
    pub: basename("endSession"),
    sub: basename("endSession/response"),
  },
  updateDevice: {
    alias: "device/update",
    pub: prefix("devices/action"),
    sub: prefix("devices/action/response"),
  },
  updateDeviceScoreboardView: {
    alias: "/scoreboard/devices/views/update",
    pub: basename("devices/scoreboard/updateStatus"),
    sub: basename("devices/scoreboard/updateStatus/response"),
  },
  //////////////////////////////////////////////////
  // LIST
  //////////////////////////////////////////////////
  listPlayers: {
    alias: "list/players",
    pub: prefix("player/all/search"),
    sub: prefix("player/all/search/response"),
  },
  listPlayersWristbanded: {
    alias: "search/players/wristbanded",
    pub: prefix("player/available/search"),
    sub: prefix("player/available/search/response"),
  },
  listPkgs: {
    alias: "list/pkgs",
    pub: prefix("packages/all"),
    sub: prefix("packages/all/response"),
  },
  listTeams: {
    alias: "list/teams",
    pub: prefix("teams/all"),
    sub: prefix("teams/all/response"),
  },
  listCashiers: {
    alias: "list/cashiers",
    pub: prefix("users/cashiers"),
    sub: prefix("users/cashiers/response"),
  },
  listDevices: {
    alias: "list/devices",
    pub: basename("devices"),
    sub: basename("devices/response"),
  },
  listDevicesScoreboard: {
    alias: "list/devices/scoreboard",
    pub: basename("devices/scoreboard"),
    sub: basename("devices/scoreboard/response"),
  },
  listDevicesScoreboardViews: {
    alias: "/scoreboard/devices/views",
    pub: basename("devices/scoreboard/updateStatus/options"),
    sub: basename("devices/scoreboard/updateStatus/options/response"),
  },
  listScoreboard: {
    alias: "/scoreboard",
    pub: basename("scoreboard"),
    sub: basename("scoreboard/response"),
  },
  //////////////////////////////////////////////////
  // SEARCH
  //////////////////////////////////////////////////
  searchPlayers: {
    alias: "search/player",
    pub: prefix("player/search"),
    sub: prefix("player/search/response"),
  },
};

function basename(path) {
  return `IN_AFADMIN_SERVER_URL_BASENAME/${path}`;
}
function prefix(path) {
  return basename("${deviceId}/gui/" + path);
}
function addOrigin(topics) {
  return Object.entries(topics).reduce(
    (car, [k, { pub, sub, ...props } = {}]) =>
      Object.assign(car, {
        [k]: {
          ...props,
          sub: !!sub ? `IN_AFADMIN_SERVER_URL_ORIGIN${sub}` : null,
          pub: !!pub ? `IN_AFADMIN_SERVER_URL_ORIGIN${pub}` : null,
        },
      }),
    {},
  );
}
function toServer(topics) {
  return Object.entries(topics).reduce(
    (car, [k, { pub, sub, ...props } = {}]) => {
      return Object.assign(car, {
        [k]: {
          ...props,
          pub: sub || null,
          sub: pub || null,
        },
      });
    },
    {},
  );
}
function toJson(topics) {
  return JSON.stringify(topics);
}

const scriptPath = globalThis.process?.argv[1] ?? "";
if (/backend-topics\.js/.test(scriptPath)) {
  const _toJson = process.argv.includes("--to-json");
  const _toServer = process.argv.includes("--to-server");
  const _addOrigin = process.argv.includes("--add-origin");
  let _registrationTopics = registrationTopics;
  let _rpiReaderTopics = rpiReaderTopics;

  if (_addOrigin) {
    _registrationTopics = addOrigin(_registrationTopics);
    _rpiReaderTopics = addOrigin(_rpiReaderTopics);
  }
  if (_toServer) {
    _registrationTopics = toServer(_registrationTopics);
    _rpiReaderTopics = toServer(_rpiReaderTopics);
  }
  const _topics = {
    registration: _registrationTopics,
    rpiReader: _rpiReaderTopics,
  };
  console.log(_toJson ? toJson(_topics) : _topics);
}

export { registrationTopics, rpiReaderTopics, toServer, toJson, addOrigin };
