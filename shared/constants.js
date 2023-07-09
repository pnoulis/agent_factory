import { PACKAGE_MISSIONS_SCHEMA, PACKAGE_TIME_SCHEMA } from "./schemas.js";
const MAX_TEAM_SIZE = 6;

const WRISTBAND_COLORS = [
  "black",
  "red",
  "purple",
  "green",
  "yellow",
  "blue",
  "orange",
];

const AF_PACKAGES = [
  {
    ...PACKAGE_MISSIONS_SCHEMA,
    name: "Per Mission 15",
  },
  {
    ...PACKAGE_MISSIONS_SCHEMA,
    name: "Per Mission 10",
  },
  {
    ...PACKAGE_MISSIONS_SCHEMA,
    name: "Per Mission 15",
  },
  {
    ...PACKAGE_MISSIONS_SCHEMA,
    name: "Per Mission 20",
  },
  {
    ...PACKAGE_TIME_SCHEMA,
    name: "Per Time 30",
  },
  {
    ...PACKAGE_TIME_SCHEMA,
    name: "Per Time 60",
  },
  {
    ...PACKAGE_TIME_SCHEMA,
    name: "Per Time 90",
  },
  {
    ...PACKAGE_TIME_SCHEMA,
    name: "Per Time 120",
  },
];

export { MAX_TEAM_SIZE, WRISTBAND_COLORS, AF_PACKAGES };
