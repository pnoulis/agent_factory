import { PACKAGE_MISSIONS_SCHEMA, PACKAGE_TIME_SCHEMA } from "./schemas.js";
import { t_mtos } from "./utils/misc.js";
const MAX_TEAM_SIZE = 6;
const MIN_TEAM_SIZE = 2;
const CLIENT_STORAGE_GLOBAL_SESSION_ID = "session";

const CASHIER_ROLES = ["CASHIER", "MANAGER", "ADMIN"];

const WRISTBAND_COLORS = [
  "1based",
  "red",
  "purple",
  "green",
  "yellow",
  "blue",
  "orange",
];

const MAX_WRISTBAND_ID = 900;

const AF_PACKAGES = [
  {
    ...PACKAGE_MISSIONS_SCHEMA,
    name: "Per Mission 5",
    amount: 5,
    missions: 5,
    cost: 50,
  },
  {
    ...PACKAGE_MISSIONS_SCHEMA,
    name: "Per Mission 10",
    amount: 10,
    missions: 10,
    cost: 100,
  },
  {
    ...PACKAGE_MISSIONS_SCHEMA,
    name: "Per Mission 15",
    amount: 15,
    missions: 15,
    cost: 150,
  },
  {
    ...PACKAGE_MISSIONS_SCHEMA,
    name: "Per Mission 20",
    amount: 20,
    missions: 20,
    cost: 200,
  },
  {
    ...PACKAGE_TIME_SCHEMA,
    name: "Per Time 30",
    amount: 30,
    duration: t_mtos(30),
    cost: 50,
  },
  {
    ...PACKAGE_TIME_SCHEMA,
    name: "Per Time 60",
    amount: 60,
    duration: t_mtos(60),
    cost: 100,
  },
  {
    ...PACKAGE_TIME_SCHEMA,
    name: "Per Time 90",
    amount: 90,
    duration: t_mtos(90),
    cost: 150,
  },
  {
    ...PACKAGE_TIME_SCHEMA,
    name: "Per Time 120",
    amount: 120,
    duration: t_mtos(120),
    cost: 200,
  },
];

const AF_PACKAGES_MAP = AF_PACKAGES.reduce(function (car, cdr) {
  car[cdr.name] = cdr;
  return car;
}, {});

export {
  MAX_TEAM_SIZE,
  MIN_TEAM_SIZE,
  MAX_WRISTBAND_ID,
  WRISTBAND_COLORS,
  AF_PACKAGES,
  AF_PACKAGES_MAP,
  CLIENT_STORAGE_GLOBAL_SESSION_ID,
  CASHIER_ROLES,
};
