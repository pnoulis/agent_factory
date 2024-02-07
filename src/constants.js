import { ENV } from "./config.js";
//////////////////////////////////////////////////
// WRISTBANDS
//////////////////////////////////////////////////
const MAX_WRISTBAND_CC = 6; // max wristband colorCode
const MIN_WRISTBAND_CC = 1; // minimum wristband colorCode
const MAX_WRISTBAND_ID = 500;
const MIN_WRISTBAND_ID = 1;
const WRISTBAND_COLORS = Object.freeze({
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
});
export {
  MAX_WRISTBAND_CC,
  MIN_WRISTBAND_CC,
  MAX_WRISTBAND_ID,
  MIN_WRISTBAND_ID,
  WRISTBAND_COLORS,
};

//////////////////////////////////////////////////
// DEVICES
//////////////////////////////////////////////////
const DEVICE_TYPES = Object.freeze({
  adminScreen: "REGISTRATION_SCREEN",
  registrationScreen: "REGISTRATION_SCREEN",
  rpiReader: "RPI_READER",
  scoreboardScreen: "SCOREBOARD_SCREEN",
  outsideRoomScreen: "OUTSIDE_ROOM_SCREEN",
  insideRoomScreen: "INSIDE_ROOM_SCREEN",
  rpiGameplay: "RPI_GAMEPLAY",
});
const DEVICE_IDS = Object.freeze({
  adminScreen: ENV.DEVICE_ADMIN_SCREEN_ID,
  rpiReader: ENV.DEVICE_RPI_READER_ID,
});
const DEVICE_SCOREBOARD_VIEWS = Object.freeze([
  "ROTATING",
  "ALL_TIME",
  "MONTHLY",
  "WEEKLY",
  "DAILY",
  "ELEMENTS",
  "ROOMS",
]);
export { DEVICE_TYPES, DEVICE_IDS, DEVICE_SCOREBOARD_VIEWS };

//////////////////////////////////////////////////
// ROOMS
//////////////////////////////////////////////////
const ROOM_TYPES = Object.freeze({
  admin1: "ADMINISTRATION1",
});
export { ROOM_TYPES };

//////////////////////////////////////////////////
// PACKAGES
//////////////////////////////////////////////////
const PACKAGE_TYPES = Object.freeze({
  missions: "mission",
  time: "time",
});
const PACKAGES = Object.freeze([
  { name: "Per Mission 5", amount: 5, missions: 5, cost: 50 },
  { name: "Per Mission 10", amount: 10, type: "mission", cost: 100 },
  { name: "Per Mission 15", amount: 15, type: "mission", cost: 150 },
  { name: "Per Mission 20", amount: 20, type: "mission", cost: 200 },
  { name: "Per Time 30", amount: 30, type: "time", cost: 50 },
  { name: "Per Time 60", amount: 60, type: "time", cost: 100 },
  { name: "Per Time 90", amount: 90, type: "time", cost: 150 },
  { name: "Per Time 120", amount: 120, type: "time", cost: 200 },
]);
export { PACKAGE_TYPES, PACKAGES };

//////////////////////////////////////////////////
// CASHIERS
//////////////////////////////////////////////////
const PRIVILEGE_TYPES = Object.freeze({
  cashier: "ROLE_CASHIER",
  manager: "ROLE_MANAGER",
  admin: "ROLE_ADMIN",
});
const DEFAULT_CASHIER = Object.freeze({
  id: 1,
  username: "DEFAULT_CASHIER",
  email: "default_cashier@gmail.com",
  password: "mindtr@p",
  role: ["ROLE_CASHIER"],
});
export { PRIVILEGE_TYPES, DEFAULT_CASHIER };

//////////////////////////////////////////////////
// FLASH MESSAGES
//////////////////////////////////////////////////
const FM_TIMEOUT = 5000;
export { FM_TIMEOUT };
