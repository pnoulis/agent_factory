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
};
const ROOMS = {
  administration1: "ADMINISTRATION1",
};

const MAX_WRISTBAND_ID = 999;
const FM_TIMEOUT = 5000;

export { WRISTBAND_COLORS, DEVICES, ROOMS, MAX_WRISTBAND_ID, FM_TIMEOUT };
