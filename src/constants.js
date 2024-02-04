const WRISTBAND_COLORS = {
  min: 1,
  max: 6,
  red: 1,
  purple: 2,
  green: 3,
  yellow: 4,
  blue: 5,
  orange: 6,
  1: "red",
  2: "purple",
  3: "green",
  4: "yellow",
  5: "blue",
  6: "orange",
};

const DEVICES = {
  registrationScreen: "REGISTRATION_SCREEN",
  rpiReader: "RPI_READER",
  scoreboardScreen: "SCOREBOARD_SCREEN",
  outsideRoomScreen: "OUTSIDE_ROOM_SCREEN",
  insideRoomScreen: "INSIDE_ROOM_SCREEN",
  rpiGameplay: "RPI_GAMEPLAY",
};
const ROOMS = {
  administration1: "ADMINISTRATION1",
};

const SCOREBOARD_VIEWS = [
  "ROTATING",
  "ALL_TIME",
  "MONTHLY",
  "WEEKLY",
  "DAILY",
  "ELEMENTS",
  "ROOMS",
];

const MAX_WRISTBAND_ID = 500;
const FM_TIMEOUT = 5000;

const PACKAGE_TYPES = ["mission", "time"];
const PACKAGES = [
  { name: "Per Mission 5", amount: 5, missions: 5, cost: 50 },
  { name: "Per Mission 10", amount: 10, type: "mission", cost: 100 },
  { name: "Per Mission 15", amount: 15, type: "mission", cost: 150 },
  { name: "Per Mission 20", amount: 20, type: "mission", cost: 200 },
  { name: "Per Time 30", amount: 30, type: "time", cost: 50 },
  { name: "Per Time 60", amount: 60, type: "time", cost: 100 },
  { name: "Per Time 90", amount: 90, type: "time", cost: 150 },
  { name: "Per Time 120", amount: 120, type: "time", cost: 200 },
];

const DEFAULT_CASHIER = {
  id: 1,
  username: "DEFAULT_CASHIER",
  email: "default_cashier@gmail.com",
  password: "mindtr@p",
  role: ["ROLE_CASHIER"],
};

export {
  WRISTBAND_COLORS,
  DEVICES,
  ROOMS,
  MAX_WRISTBAND_ID,
  FM_TIMEOUT,
  PACKAGE_TYPES,
  PACKAGES,
  DEFAULT_CASHIER,
  SCOREBOARD_VIEWS,
};
