const WRISTBAND_SCHEMA = {
  status: "",
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
  GROUP_PARTY_PLAYER_SCHEMA,
  PACKAGE_SCHEMA,
  ROSTER_SCHEMA,
  TEAM_SCHEMA,
};
