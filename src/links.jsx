//////////////////////////////////////////////////
// Layout Pages
//////////////////////////////////////////////////
const home = {
  path: "/",
  label: "home",
};
const liveView = {
  path: "/live-view",
  label: "live view",
};
const administration = {
  path: "/administration",
  label: "administration",
};

//////////////////////////////////////////////////
// Players
//////////////////////////////////////////////////
const players = {
  path: "/players",
  label: "players",
};

const registerPlayer = {
  path: "/players/register",
  label: "register player",
};

const pairWristband = {
  path: "/players/wristbands",
  label: "pair wristband",
};

//////////////////////////////////////////////////
// Scoreboard
//////////////////////////////////////////////////
const scoreboard = {
  path: "/scoreboard",
  label: "scoreboard",
};
const scoreboardTop10 = {
  path: "/scoreboard/top10",
  label: "top 10",
};

//////////////////////////////////////////////////
// Wristbands
//////////////////////////////////////////////////
const wristbands = {
  path: "wristbands",
  label: "wristbands",
};

//////////////////////////////////////////////////
// Teams
//////////////////////////////////////////////////
const teams = {
  path: "/live-view/teams",
  label: "teams",
};
const registerTeam = {
  path: "/team/register",
  label: "merge",
};

const team = (teamname) => ({
  path: `/team/${teamname || ":teamname"}`,
  label: "team",
});

const teamPackage = {
  path: "package",
};

const teamRoster = {
  path: "roster",
};

//////////////////////////////////////////////////
// Group Party
//////////////////////////////////////////////////
const grouparty = {
  path: "/grouparty",
  label: "group party",
};

const groupartySize = {
  path: "/grouparty/size",
  label: "group party",
};

//////////////////////////////////////////////////
// Cashiers
//////////////////////////////////////////////////
const cashiers = {
  path: "/administration/cashiers",
  label: "cashiers",
};
const loginCashier = {
  path: "/login",
  label: "login cashier",
};
const registerCashier = {
  path: "/administration/cashiers/register",
  label: "register cashier",
};
const cashoutCashier = {
  path: "/administration/cashier/cashout",
  label: "cashout cashier",
};

//////////////////////////////////////////////////
// Devices
//////////////////////////////////////////////////
const devices = {
  path: "/administration/devices",
  label: "devices",
};
const scoreboardDevices = {
  path: "/administration/devices/scoreboard",
  label: "scoreboard devices",
};

export {
  // Layout Pages
  home,
  liveView,
  administration,

  // Scoreboard
  scoreboard,
  scoreboardTop10,

  // Players
  players,
  registerPlayer,
  pairWristband,

  // Wristbands
  wristbands,

  // Teams
  teams,
  team,
  registerTeam,
  teamPackage,
  teamRoster,

  // Group Party
  grouparty,
  groupartySize,

  // Cashiers
  cashiers,
  loginCashier,
  registerCashier,
  cashoutCashier,

  // Devices
  devices,
  scoreboardDevices,
};
