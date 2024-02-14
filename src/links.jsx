//////////////////////////////////////////////////
// Layout Pages
//////////////////////////////////////////////////
const home = {
  path: "/",
  label: "home",
  module: "/src/pages/home/PageHome.jsx",
};
const liveview = {
  path: "/liveview",
  label: "live view",
};
const scoreboard = {
  path: "/scoreboard",
  label: "scoreboard",
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
  path: "/teams",
  label: "merge",
};
const registerTeam = {
  path: "register",
  label: "merge",
};

//////////////////////////////////////////////////
// Group Party
//////////////////////////////////////////////////
const grouparty = {
  path: "/grouparty",
  label: "group party",
};
const registerGroupParty = {
  path: "register",
  label: "register group party",
};

//////////////////////////////////////////////////
// Cashiers
//////////////////////////////////////////////////
const cashiers = {
  path: "/cashiers",
  label: "cashier",
};
const loginCashier = {
  path: "login",
  label: "login cashier",
  module: "/src/pages/cashiers/PageLogin.jsx",
};
const registerCashier = {
  path: "register",
  label: "register cashier",
  module: "/src/pages/cashiers/PageRegister.jsx",
};

//////////////////////////////////////////////////
// Devices
//////////////////////////////////////////////////
const devices = {
  ptah: "/devices",
  label: "devices",
};

export {
  // Layout Pages
  home,
  liveview,
  scoreboard,
  administration,

  // Players
  players,
  registerPlayer,
  pairWristband,

  // Wristbands
  wristbands,

  // Teams
  teams,
  registerTeam,

  // Group Party
  grouparty,
  registerGroupParty,

  // Cashiers
  cashiers,
  loginCashier,
  registerCashier,

  // Devices
  devices,
};
