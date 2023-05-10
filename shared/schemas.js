const PLAYER_SCHEMA = {
  username: "",
  name: "",
  surname: "",
  email: "",
  password: "",
  wristbandMerged: false,
  wristband: {
    wristbandNumber: undefined,
    wristbandColor: undefined,
    active: false,
  },
};

export { PLAYER_SCHEMA };
