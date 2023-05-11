const WRISTBAND_SCHEMA = {
  wristbandNumber: undefined,
  wristbandColor: undefined,
  active: false,
};

const PLAYER_SCHEMA = {
  username: "",
  name: "",
  surname: "",
  email: "",
  password: "",
  wristbandMerged: false,
  wristband: WRISTBAND_SCHEMA,
};

const PACKAGE_SCHEMA = {
  id: undefined,
  name: "",
  cost: undefined,
  started: undefined,
  ended: undefined,
  missions: undefined,
  missionsPlayed: undefined,
  active: false,
};

const ROSTER_SCHEMA = {
  version: undefined,
  players: [],
  packages: [],
};

const TEAM_SCHEMA = {
  name: "",
  totalPoints: undefined,
  teamState: undefined,
  currentRoster: ROSTER_SCHEMA,
};

export {
  WRISTBAND_SCHEMA,
  PLAYER_SCHEMA,
  PACKAGE_SCHEMA,
  ROSTER_SCHEMA,
  TEAM_SCHEMA,
};
