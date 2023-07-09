const WRISTBAND_SCHEMA = {
  wristbandNumber: null,
  wristbandColor: null,
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

const GROUP_PARTY_PLAYER_SCHEMA = {
  ...PLAYER_SCHEMA,
  groupParty: true,
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

const PACKAGE_TIME_SCHEMA = {
  id: null,
  name: "",
  cost: null,
  started: null,
  ended: null,
  duration: null,
  paused: null,
  active: null,
  status: "",
  type: "time",
};

const PACKAGE_MISSIONS_SCHEMA = {
  id: null,
  name: "",
  cost: null,
  started: null,
  ended: null,
  missions: null,
  missionsPlayed: 0,
  active: false,
  status: "",
  type: "mission",
};

const ROSTER_SCHEMA = {
  version: undefined,
  roomType: null,
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
  GROUP_PARTY_PLAYER_SCHEMA,
  PACKAGE_SCHEMA,
  PACKAGE_TIME_SCHEMA,
  PACKAGE_MISSIONS_SCHEMA,
  ROSTER_SCHEMA,
  TEAM_SCHEMA,
};
