const topics = [
  {
    alias: "boot",
    pub: prefix("booted"),
    sub: prefix("booted/${deviceId}"),
  },
  {
    alias: "player/register",
    pub: prefix("player/registration"),
    sub: prefix("player/registration/response"),
  },
  {
    alias: "player/login",
    pub: prefix("player/login"),
    sub: prefix("player/login/response"),
  },
  {
    alias: "wristband/scan",
    pub: null,
    sub: prefix("player/wristbandScan"),
  },
  {
    alias: "wristband/pair",
    pub: prefix("player/registerWristband"),
    sub: prefix("player/registerWristband/response"),
  },
  {
    alias: "wristband/unpair",
    pub: prefix("player/unregisterWristband"),
    sub: prefix("player/unregisterWristband/response"),
  },
  {
    alias: "team/merge",
    pub: prefix("team/merge"),
    sub: prefix("team/merge/response"),
  },
  {
    alias: "gteam/merge",
    pub: prefix("/groupteam/merge"),
    sub: prefix("/groupteam/merge/response"),
  },
  {
    alias: "wristband/validate",
    pub: prefix("player/isValid"),
    sub: prefix("player/isValid/response"),
  },
  {
    alias: "wristband/info",
    pub: prefix("wristband/info"),
    sub: prefix("wristband/info/response"),
  },
  {
    alias: "team/pkg/add",
    pub: prefix("team/package/add"),
    sub: prefix("team/package/add/response"),
  },
  {
    alias: "team/pkg/delete",
    pub: prefix("team/package/delete"),
    sub: prefix("team/package/delete/response"),
  },
  {
    alias: "team/pkg/activate",
    pub: prefix("team/activate"),
    subd: prefix("team/activate/response"),
  },
  {
    alias: "cashier/register",
    pub: basename("signup"),
    sub: basename("signup/response"),
  },
  {
    alias: "cashier/login",
    pub: basename("signin"),
    sub: basename("signin/response"),
  },
  {
    alias: "cashier/delete",
    pub: prefix("users/cashiers/delete"),
    sub: prefix("users/cashiers/delete/response"),
  },
  {
    alias: "session/start",
    pub: basename("startSession"),
    sub: basename("startSession/response"),
  },
  {
    alias: "session/stop",
    pub: basename("endSession"),
    sub: basename("endSession/response"),
  },
  {
    alias: "/scoreboard",
    pub: basename("scoreboard"),
    sub: basename("scoreboard/response"),
  },
  {
    alias: "/scoreboard/devices/views",
    pub: basename("devices/scoreboard/updateStatus/options"),
    sub: basename("devices/scoreboard/updateStatus/options/response"),
  },
  {
    alias: "/scoreboard/devices/views/update",
    pub: basename("devices/scoreboard/updateStatus"),
    sub: basename("devices/scoreboard/updateStatus/response"),
  },
  {
    alias: "/scoreboard/devices",
    pub: basename("devices/scoreboard"),
    sub: basename("devices/scoreboard/response"),
  },
  {
    alias: "device/update",
    pub: prefix("devices/action"),
    sub: prefix("devices/action/response"),
  },

  //////////////////////////////////////////////////
  // LIST
  //////////////////////////////////////////////////
  {
    alias: "list/teams",
    pub: prefix("teams/all"),
    sub: prefix("teams/all/response"),
  },
  {
    alias: "list/players",
    pub: prefix("player/all/search"),
    sub: prefix("player/all/search/response"),
  },
  {
    alias: "list/pkgs",
    pub: prefix("packages/all"),
    sub: prefix("packages/all/response"),
  },
  {
    alias: "list/cashiers",
    pub: prefix("users/cashiers"),
    sub: prefix("users/cashiers/response"),
  },
  {
    alias: "list/devices",
    pub: basename("devices"),
    sub: basename("devices/response"),
  },
  //////////////////////////////////////////////////
  // SEARCH
  //////////////////////////////////////////////////
  {
    alias: "search/player",
    pub: prefix("player/search"),
    sub: prefix("player/search/response"),
  },
  {
    alias: "search/player_with_wristbands",
    pub: prefix("player/available/search"),
    sub: prefix("player/available/search/response"),
  },
];

function basename(path) {
  return `IN_AFADMIN_SERVER_URL_BASENAME/${path}`;
}
function prefix(path) {
  return basename("${deviceId}/gui/" + path);
}
function addOrigin(topics) {
  return topics.map(({ alias, pub, sub }) => ({
    alias,
    sub: !!sub ? `IN_AFADMIN_SERVER_URL_ORIGIN${sub}` : null,
    pub: !!pub ? `IN_AFADMIN_SERVER_URL_ORIGIN${pub}` : null,
  }));
}
function toServer(topics) {
  return topics.map(({ alias, pub, sub }) => ({
    alias,
    sub: pub || null,
    pub: sub || null,
  }));
}
function toJson(topics) {
  return JSON.stringify(topics);
}

const scriptPath = process?.argv[1] ?? "";
if (/backend-topics\.js/.test(scriptPath)) {
  const _toJson = process.argv.includes("--to-json");
  const _toServer = process.argv.includes("--to-server");
  const withOrigin = process.argv.includes("--with-origin");
  let _topics = topics;
  if (withOrigin) {
    _topics = addOrigin(topics);
  }
  if (_toServer) {
    _topics = toServer(_topics);
  }
  console.log(_toJson ? toJson(_topics) : _topics);
}

export default topics;
export { topics, toServer, toJson, addOrigin };
